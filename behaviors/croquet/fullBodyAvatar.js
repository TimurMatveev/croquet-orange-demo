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

        const animationPaths = [
            // '/assets/animations/walking.glb',
            // '/assets/animations/crouch_to_stand.glb',
        ];

        return Promise.all(
            animationPaths.map((path) => this.getBuffer(path)
                .then((buffer) => {
                    assetManager.setCache(path, buffer, this.id);
                    return assetManager.load(buffer, 'glb', Microverse.THREE);
                })
                .catch((error) => {
                    // debugger;
                })),
        ).then(([
            walking,
            crouchToStand
       ]) => ({
            walking,
            crouchToStand,
       }));
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

        // const skeleton = new Microverse.THREE.SkeletonHelper(this.avatarModel);
        // skeleton.visible = true;
        // this.scene.add( skeleton );
        // let found = false;

        // const avatarSkeletonHelper = new Microverse.THREE.SkeletonHelper(this.avatarModel);

        // if (this.avatarModel) {
        //     this.bones = new Map();
        //     this.avatarModel.traverse((mesh) => {
        //         if (mesh.isBone) {
        //             this.bones.set(mesh.name, mesh);
        //             if (mesh.name === "Spine") {
        //                 found = true;
        //             }
        //         }
        //     });
        // }
        //
        // if (found) {
        //     console.log("ready player me avatar found");
        // }

        // this.addFoot();

        if (this.actor.lastPose) {
            this.avatarPosed(this.actor.lastPose);
        }

        this.animate();
    }

    move(type, xyz) {
        if (!xyz) {return;}
        this.say("poseAvatarRequest", {type, coordinates: xyz, pointing: true}, 30);
    }

    avatarPosed(data) {
        // console.log(this.velocity);
        if (!this.bones) {return;}

        this.handedness = this.actor._cardData.handedness === "Left" ? "Left" : "Right";
        this.otherHandName = this.actor._cardData.handedness === "Left" ? "RightHand" : "LeftHand";

        let otherHand = this.bones.get(this.otherHandName);
        otherHand.position.set();
        let {type, coordinates, pointing} = data;
        if (type === "pointerMove" || type === "move") {
            this.moveHead(coordinates);
        }
        let pointingChanged = this.isPointing !== pointing;
        if (pointingChanged) {
            this.isPointing = pointing;
        }
        // if (type === "keyDown" || type === "pointerDown" || type === "pointerUp" || type === "pointerTap" || pointingChanged) {
        //     this.moveHand(coordinates, pointing);
        // }
    }

    animate() {
        const { animations: [walk], mixer } = this.avatarModel._croquetAnimation;

        this.animatedActions = {
            walk: mixer.clipAction(walk),
        }

        Object.values(this.animatedActions).forEach((action) => action.play());

        let lastTranslation = new Microverse.THREE.Vector3(...this.translation);

        const run = () => {
            const currentTranslation = new Microverse.THREE.Vector3(...this.translation);

            let speed;

            if (this.isMyPlayerPawn) {
                speed = -this.velocity[2] * 666;
            } else {
                speed = lastTranslation.distanceToSquared(currentTranslation) * 4000;
                lastTranslation = currentTranslation;
            }

            this.animationId = requestAnimationFrame(() => run());
            this.updateAnimatedActions(speed);
            mixer.update(this.clock.getDelta());
        }

        run();
    }

    updateAnimatedActions(speed) {
        if (!this.animatedActions) {
            return;
        }

        this.animatedActions.walk.setEffectiveTimeScale(Math.sign(speed));
        this.animatedActions.walk.setEffectiveWeight(Math.abs(speed));
    }

    moveHead(xyz) {
        let {
            THREE,
            q_lookAt, q_pitch, q_euler, q_yaw, q_roll, q_multiply, q_slerp, q_identity,
            v3_normalize
        } = Microverse;

        let head = this.bones.get("Head");
        let neck = this.bones.get("Neck");
        let global = neck.matrixWorld.clone();

        let dataRotation = new THREE.Matrix4();
        dataRotation.makeRotationY(-Math.PI);
        let headOffset = new THREE.Matrix4();
        headOffset.makeTranslation(...head.position.toArray());

        global.multiply(dataRotation);
        global.multiply(headOffset);
        global.invert();

        let local = new Microverse.THREE.Vector3(...xyz);
        local.applyMatrix4(global);
        let normLocal = v3_normalize(local.toArray());
        let normHere = [0, 0, -1];

        let allQ = q_lookAt(normHere, [0, 1, 0], normLocal);

        if (Number.isNaN(allQ[0]) || Number.isNaN(allQ[1]) || Number.isNaN(allQ[2]) || Number.isNaN(allQ[3])) {
            // console.log("nande?");
            return;
        }

        let halfQ = q_slerp(q_identity(), allQ, 0.5);
        let leftEye = this.bones.get("LeftEye");
        let rightEye = this.bones.get("RightEye");

        head.rotation.set(-q_pitch(halfQ), q_yaw(halfQ), q_roll(halfQ));

        let eyeQ = q_multiply(q_euler(-1.57, 0, Math.PI), halfQ);
        leftEye.rotation.set(q_pitch(eyeQ), q_yaw(eyeQ), q_roll(eyeQ));
        rightEye.rotation.set(q_pitch(eyeQ), q_yaw(eyeQ), q_roll(eyeQ));
    }

    up(p3d) {
        this._plane = null;
        let avatar = Microverse.GetPawn(p3d.avatarId);
        avatar.removeFirstResponder("pointerMove", {}, this);
    }

    walkLook() {
        let {m4_translation, q_axisAngle, m4_rotationQ, m4_multiply} = Microverse;
        const pitchRotation = q_axisAngle([1,0,0], this.lookPitch);
        const m0 = m4_translation(this.lookOffset);
        const m1 = m4_translation([0, 0.2, 0]); // needs to be eye height;
        const tr = m4_multiply(m1, m0);

        const m2 = m4_rotationQ(pitchRotation);
        const m3 = m4_multiply(m2, tr);
        return m4_multiply(m3, this.global);
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
