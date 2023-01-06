class AvatarActor {
    setup() {
        this._cardData.animationClipIndex = -1;

        this.say("animationStateChanged");
        this.listen("poseAvatarRequest", "poseAvatar");
        this.listen("setAvatarData", "resetPose");
    }

    poseAvatar(data) {
        this.lastPose = data;
        this.say("avatarPosed", data);
    }

    resetPose() {
        this.lastPose = {type: "move", coordinates: [0, 1, -100], pointing: false};
        this.say("avatarPosed", this.lastPose);
    }
}

class AvatarPawn {
    setup() {
        this.animationsPromise = this.animationsPromise || this.loadAnimations();

        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        this.listen("avatarPosed", "avatarPosed");

        if (this.avatarModel) {
            this.modelLoaded();
        }

        this.clock = new Microverse.THREE.Clock();

        if (!this.isMyPlayerPawn) {return;}

        this.addFirstResponder("pointerTap", {ctrlKey: true, altKey: true}, this);
        this.addEventListener("pointerTap", this.pointerTap);

        this.addFirstResponder("pointerDown", {ctrlKey: true, altKey: true}, this);
        this.addLastResponder("pointerDown", {}, this);
        this.addEventListener("pointerDown", this.pointerDown);

        this.addFirstResponder("pointerMove", {ctrlKey: true, altKey: true}, this);
        this.addLastResponder("pointerMove", {}, this);
        this.addEventListener("pointerMove", this.pointerMove);

        this.addLastResponder("pointerUp", {ctrlKey: true, altKey: true}, this);
        this.addEventListener("pointerUp", this.pointerUp);

        this.addLastResponder("pointerWheel", {ctrlKey: true, altKey: true}, this);
        this.addEventListener("pointerWheel", this.pointerWheel);

        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.addFirstResponder("pointerDoubleDown", {shiftKey: true}, this);
        this.addEventListener("pointerDoubleDown", this.addSticky);

        this.addLastResponder("keyDown", {ctrlKey: true}, this);
        this.addEventListener("keyDown", this.keyDown);

        this.addLastResponder("keyUp", {ctrlKey: true}, this);
        this.addEventListener("keyUp", this.keyUp);
        this.addUpdateRequest(["FullBodyAvatarEventHandler$AvatarPawn", "maybeMove"]);
    }

    loadAnimations() {
        const assetManager = this.service('AssetManager').assetManager;

        function getAssetsPath(path) {
            if (window.location.hostname === 'localhost') {
                return path;
            }

            return `/croquet-orange-demo${path}`;
        }

        const paths = [
            getAssetsPath('/assets/animations/idle.glb'),
            getAssetsPath('/assets/animations/walking.glb'),
            getAssetsPath('/assets/animations/running.glb'),
        ];

        return Promise
            .all(
                paths.map((path) => this.getBuffer(path)
                    .then((buffer) => {
                        assetManager.setCache(path, buffer, this.id);
                        return assetManager.load(buffer, 'glb', Microverse.THREE);
                    })
                )
            )
            .then((animatedObjects) => {
                return animatedObjects.reduce((animations, obj) => {
                    return [...animations, ...obj._croquetAnimation.animations];
                }, []);
            });
    }

    handlingEvent(type, target, event) {
        if (type.startsWith("pointer")) {
            const render = this.service("ThreeRenderManager");
            let rc;
            if (type === "pointerDown") {
                rc = this.pointerRaycast(event.xy, render.threeLayerUnion('pointer', "walk"));
            } else {
                rc = this.pointerRaycast(event.xy, render.threeLayerUnion("walk"));
            }

            let p3e = this.pointerEvent(rc, event);
            this.move(type, p3e.xyz);
        }
    }

    modelLoaded() {
        this.avatarModel = this.shape.children[0];

        if (this.actor.lastPose) {
            this.avatarPosed(this.actor.lastPose);
        }

        this.animationsPromise.then((animations) => this.animate(animations));
    }

    move(type, xyz) {
        if (!xyz) {return;}
        this.say("poseAvatarRequest", {type, coordinates: xyz, pointing: true}, 30);
    }

    avatarPosed(data) {
        // if (!this.bones) {return;}
        //
        // let {pointing} = data;
        //
        // let pointingChanged = this.isPointing !== pointing;
        // if (pointingChanged) {
        //     this.isPointing = pointing;
        // }
    }

    animate(animations) {
        const mixer = new Microverse.THREE.AnimationMixer(this.avatarModel);

        this.avatarModel.animations = animations;

        const [
            idle,
            walking,
            running,
        ] = this.avatarModel.animations;

        this.animatedActions = {
            idle: mixer.clipAction(idle),
            walking: mixer.clipAction(walking),
            running: mixer.clipAction(running),
        }

        Object.values(this.animatedActions).forEach((action) => action.play());

        const calcSpeed = (() => {
            const positions = [];

            return () => {
                if (positions.length >= 8) {
                    positions.shift();
                }

                positions.push({
                    vector: new Microverse.THREE.Vector3(...this.translation),
                    time: this.clock.getElapsedTime(),
                });

                const from = positions.at(0);
                const to = positions.at(-1);
                const preTo = positions.at(-2) || from;

                const fullDistance = to.vector.distanceTo(from.vector);
                const fullTime = to.time - from.time;

                const speed = fullDistance / fullTime / 2;
                const time = to.time - preTo.time;

                // Sign should represent if avatar moves forward or backward
                let sign = 1;
                // const [,r1,,r2] = this.rotation;
                // const isRight = Math.sign(r1) === Math.sign(r2);
                //
                // if (to.vector.z < preTo.vector.z) {
                //     sign = isRight ? -1 : 1;
                // } else if (to.vector.z > preTo.vector.z) {
                //     sign = isRight ? 1 : -1;
                // }
                // console.log(sign);

                return {
                    speed,
                    sign,
                    time,
                };
            };
        })();

        const run = () => {
            const { speed, sign, time } = this.speed = calcSpeed();

            if (this.avatarModel.visible) {
                this.animatedActions.idle.setEffectiveTimeScale(sign);
                this.animatedActions.walking.setEffectiveTimeScale(sign);
                this.animatedActions.running.setEffectiveTimeScale(sign);
                this.animatedActions.idle.setEffectiveWeight(1 - speed);
                this.animatedActions.walking.setEffectiveWeight(speed < 1 ? speed : 2 - speed);
                this.animatedActions.running.setEffectiveWeight(speed - 1);

                mixer.update(time);
            }

            this.animationId = requestAnimationFrame(() => run());
        }

        run();
    }

    up(p3d) {
        this._plane = null;
        let avatar = Microverse.GetPawn(p3d.avatarId);
        avatar.removeFirstResponder("pointerMove", {}, this);
    }

    maybeMove() {
        let velocity = Microverse.v3_magnitude(this.velocity);
        let moving = velocity > 0.001;

        let movingChanged = this.moving !== moving;

        if (movingChanged) {
            this.moving = moving;
            let xyz = Microverse.v3_rotate([0, 0, -10], this.rotation);
            this.say("poseAvatarRequest", {type: "move", coordinates: xyz, pointing: !this.moving}, 30);
        }
    }

    mapOpacity(avatar, opacity) {
        if (this._target === avatar && Microverse.v3_magnitude(this.lookOffset) < 0.8) {return 0;}
        if (opacity === 0 || opacity === 1) {return opacity;}
        return 1;
    }

    teardown() {
        delete this.bones;
        this.removeUpdateRequest(["FullBodyAvatarEventHandler$AvatarPawn", "maybeMove"]);
        if (!this.isMyPlayerPawn) {return;}
        this.removeFirstResponder("pointerTap", {ctrlKey: true, altKey: true}, this);
        this.removeEventListener("pointerTap", this.pointerTap);

        this.removeFirstResponder("pointerDown", {ctrlKey: true, altKey: true}, this);
        this.removeLastResponder("pointerDown", {}, this);
        this.removeEventListener("pointerDown", this.pointerDown);

        this.removeFirstResponder("pointerMove", {ctrlKey: true, altKey: true}, this);
        this.removeLastResponder("pointerMove", {}, this);
        this.removeEventListener("pointerMove", this.pointerMove);

        this.removeLastResponder("pointerUp", {ctrlKey: true, altKey: true}, this);
        this.removeEventListener("pointerUp", this.pointerUp);

        this.removeLastResponder("pointerWheel", {ctrlKey: true, altKey: true}, this);
        this.removeEventListener("pointerWheel", this.pointerWheel);

        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.removeFirstResponder("pointerDoubleDown", {shiftKey: true}, this);
        this.removeEventListener("pointerDoubleDown", this.addSticky);

        this.removeLastResponder("keyDown", {ctrlKey: true}, this);
        this.removeEventListener("keyDown", this.keyDown);

        this.removeLastResponder("keyUp", {ctrlKey: true}, this);
        this.removeEventListener("keyUp", this.keyUp);

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

}

export default {
    modules: [
        {
            name: "FullBodyAvatarEventHandler",
            actorBehaviors: [AvatarActor],
            pawnBehaviors: [AvatarPawn],
        }
    ]
}

/* globals Microverse */
