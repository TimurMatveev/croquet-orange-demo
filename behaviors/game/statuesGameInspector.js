class StatuesGameInspectorPawn {
    setup() {
        this.losedPlayers = new Set();
        this.rotationWrapper = new Microverse.THREE.Group();
        this.playerManager = this.actor.service("PlayerManager");

        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");

        this.subscribe(this.getScope(), "StatuesGameInspectorChange", "onStatuesGameInspectorChange");
        this.subscribe(this.getScope(), "StatuesGamePlayerLose", "onStatuesGamePlayerLose");
    }

    modelLoaded() {
        this.rotationWrapper.add( this.shape.children[0] );
        this.shape.add(this.rotationWrapper);
    }

    rotate(from, to, seconds) {
        const { x: x1, y: y1, z: z1, w: w1 } = new Microverse.THREE.Quaternion()
            .setFromAxisAngle( new Microverse.THREE.Vector3( 0, 1, 0 ), from );

        const { x: x2, y: y2, z: z2, w: w2 } = new Microverse.THREE.Quaternion()
            .setFromAxisAngle( new Microverse.THREE.Vector3( 0, 1, 0 ), to );

        const rotationKeyframeTrack = new Microverse.THREE.QuaternionKeyframeTrack(
            ".quaternion",
            [0, seconds],
            [
                x1, y1, z1, w1,
                x2, y2, z2, w2,
            ],
        );

        const rotationClip = new Microverse.THREE.AnimationClip("rotation", seconds, [
            rotationKeyframeTrack,
        ]);

        const rotationMixer = new Microverse.THREE.AnimationMixer(this.rotationWrapper);

        const rotationAction = rotationMixer.clipAction(rotationClip);
        rotationAction.loop = Microverse.THREE.LoopOnce;
        rotationAction.clampWhenFinished = true;
        rotationAction.play();

        const clock = new Microverse.THREE.Clock();

        const run = () => {
            rotationMixer.update(clock.getDelta());

            if (!rotationAction.paused) {
                this.animationId = requestAnimationFrame(() => run());
            }
        };

        run();
    }

    getScope() {
        return this.actor._cardData.gameScope || "global";
    }

    onStatuesGameInspectorChange({ state, time }) {
        if (this.inspectorState === state) {
            return;
        }

        this.inspectorState = state;

        switch (state) {
            case "toPlayers":
                return this.rotate(0, Math.PI, time / 1000);
            case "fromPlayers":
                return this.rotate(Math.PI, 0, time / 1000);
        }
    }

    onStatuesGamePlayerLose(playerId) {
        if (this.losedPlayers.has(playerId)) {
            return;
        }

        this.losedPlayers.add(playerId);

        const avatar = this.playerManager.players.get(playerId);

        const bullet = new Microverse.THREE.Mesh(
            new Microverse.THREE.IcosahedronGeometry(0.15, 0),
            new Microverse.THREE.MeshStandardMaterial({color: 0xff1111, metalness: 1}),
        );

        this.shape.parent?.add(bullet);

        const startPoint = new Microverse.THREE.Vector3(this.actor.translation[0], 2, this.actor.translation[2]);
        const endPoint = new Microverse.THREE.Vector3(...avatar.translation);

        const distance = startPoint.distanceTo(endPoint);
        const speed = 200;
        const duration = distance / speed;

        const keyframeTrack = new Microverse.THREE.VectorKeyframeTrack(
            ".position",
            [0, duration / 2, duration],
            [
                startPoint.x,
                startPoint.y,
                startPoint.z,

                (startPoint.x + endPoint.x) / 2,
                (startPoint.y + endPoint.y) / 2 + 2,
                (startPoint.z + endPoint.z) / 2,

                endPoint.x,
                endPoint.y,
                endPoint.z,
            ],
        );

        const clip = new Microverse.THREE.AnimationClip("BulletShot", duration, [
            keyframeTrack,
        ]);

        const mixer = new Microverse.THREE.AnimationMixer(bullet);

        const action = mixer.clipAction(clip);
        action.setLoop(Microverse.THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();

        const clock = new Microverse.THREE.Clock();

        const run = () => {
            mixer.update(clock.getDelta());

            if (!action.paused) {
                requestAnimationFrame(() => run());
            } else {
                bullet.geometry.dispose();
                bullet.material.dispose();
                this.shape.parent?.remove(bullet);
                this.losedPlayers.delete(playerId);
                this.publish(this.getScope(), "StatuesGamePlayerKilled", playerId);
            }
        };

        run();
    }

    teardown() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        this.losedPlayers?.clear();
    }
}

export default {
    modules: [
        {
            name: "StatuesGameInspector",
            pawnBehaviors: [StatuesGameInspectorPawn]
        },
    ]
}
