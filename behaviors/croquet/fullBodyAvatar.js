class AvatarActor {
    setup() {
        this._cardData.animationClipIndex = -1;

        this.say("animationStateChanged");
    }
}

class AvatarPawn {
    setup() {
        this.actor.initSpeedometer(this);

        this.animationsPromise = this.animationsPromise || this.loadAnimations();

        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");

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
    }

    _getAssetsPath(path) {
        if (window.location.hostname === 'localhost') {
            return path;
        }

        return `/croquet-orange-demo${path}`;
    }

    loadAnimations() {
        const assetManager = this.service('AssetManager').assetManager;

        const paths = [
            this._getAssetsPath('/assets/animations/idle.glb'),
            this._getAssetsPath('/assets/animations/walking.glb'),
            this._getAssetsPath('/assets/animations/running.glb'),
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

        const group = new Microverse.THREE.Group();
        group.add( this.shape.children[0] );
        group.rotateY(Math.PI);
        group.translateY(-1.7);
        this.shape.add(group);

        this.animationsPromise.then((animations) => this.animate(animations));
    }

    move(type, xyz) {
        if (!xyz) {return;}
        this.say("poseAvatarRequest", {type, coordinates: xyz, pointing: true}, 30);
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

        const run = () => {
            const { value: speed, sign } = this.actor.speedometer.speed;

            const weight = speed / 2;

            if (this.avatarModel.visible) {
                this.animatedActions.idle.setEffectiveTimeScale(sign);
                this.animatedActions.walking.setEffectiveTimeScale(sign);
                this.animatedActions.running.setEffectiveTimeScale(sign);
                this.animatedActions.idle.setEffectiveWeight(1 - weight);
                this.animatedActions.walking.setEffectiveWeight(weight < 1 ? weight : 2 - weight);
                this.animatedActions.running.setEffectiveWeight(weight - 1);

                mixer.update(this.clock.getDelta());
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

    mapOpacity(avatar, opacity) {
        if (this._target === avatar && Microverse.v3_magnitude(this.lookOffset) < 0.8) {return 0;}
        if (opacity === 0 || opacity === 1) {return opacity;}
        return 1;
    }

    teardown() {
        delete this.bones;

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

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
