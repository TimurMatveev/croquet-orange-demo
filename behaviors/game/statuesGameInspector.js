class StatuesGameInspectorPawn {
    setup() {
        this.teardown();

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

        const {fromPlayersAngle = 0, toPlayersAngle = Math.PI} = this.actor._cardData.inspector;

        switch (state) {
            case "toPlayers":
                return this.rotate(fromPlayersAngle, toPlayersAngle, time / 1000);
            case "fromPlayers":
                return this.rotate(toPlayersAngle, fromPlayersAngle, time / 1000);
        }
    }

    onStatuesGamePlayerLose(playerId) {
        const bullet = new Microverse.THREE.Mesh(
            new Microverse.THREE.IcosahedronGeometry(0.25, 0),
            new Microverse.THREE.MeshStandardMaterial({color: 0xff1111, metalness: 1}),
        );

        this.shape.parent?.add(bullet);

        const origin = this._getBulletOriginPoint();
        const target = this._getBulletTargetPoint(playerId);

        const distance = origin.distanceTo(target);
        const speed = this.actor._cardData.inspector.bulletSpeed;
        const duration = distance / speed * 1000;

        const start = performance.now();

        const run = () => {
            const part = (performance.now() - start) / duration;

            if (part > 1) {
                bullet.geometry.dispose();
                bullet.material.dispose();
                this.shape.parent?.remove(bullet);
                this.publish(this.getScope(), "StatuesGamePlayerKilled", playerId);
                return;
            }

            const path = this._getBulletTrajectory(playerId);
            const point = path.getPoint(part);

            bullet.position.x = point.x;
            bullet.position.y = point.y;
            bullet.position.z = point.z;

            requestAnimationFrame(() => run());
        };

        run();
    }

    teardown() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        this.losedPlayers?.clear();
    }

    _getBulletOriginPoint() {
        if (!this._bulletOriginPoint) {
            this._bulletOriginPoint = new Microverse.THREE.Vector3(
                this.actor.translation[0],
                this.actor.translation[1] + 2,
                this.actor.translation[2]
            );
        }

        return this._bulletOriginPoint;
    }

    _getBulletTargetPoint(playerId) {
        const avatar = this.actor.service('PlayerManager').players.get(playerId);
        return new Microverse.THREE.Vector3(...avatar.translation);
    }

    _getBulletTrajectory(playerId) {
        const origin = this._getBulletOriginPoint();
        const target = this._getBulletTargetPoint(playerId);

        const distance = origin.distanceTo(target);
        const elevation = distance / 30;

        return new Microverse.THREE.QuadraticBezierCurve3(
            origin,
            new Microverse.THREE.Vector3(
                (origin.x + target.x) / 2,
                (origin.y + target.y) / 2 + elevation,
                (origin.z + target.z) / 2,
            ),
            target,
        );
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
