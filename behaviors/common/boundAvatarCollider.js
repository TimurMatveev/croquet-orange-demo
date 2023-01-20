class BoundAvatarColliderActor {
    setup() {
        this.avatarsInsideCollider = new Set();
        this.listen('AvatarCollisionChange', 'onAvatarCollisionChange');
    }

    onAvatarCollisionChange({ playerId, isColliding }) {
        if (isColliding && !this.avatarsInsideCollider.has(playerId)) {
            const previous = Array.from(this.avatarsInsideCollider);

            this.publish("BoundAvatarCollider", "AvatarsChange", {
                previous,
                current: [...previous, playerId],
                type: this._cardData.boundAvatarCollider.type,
                setup: this._cardData.boundAvatarCollider.setup,
                id: this.id,
            });

            this.avatarsInsideCollider.add(playerId);

            if (this._cardData.boundAvatarCollider.once) {
                this.teardown();
            }
        }

        if (!isColliding && this.avatarsInsideCollider.has(playerId)) {
            const previous = Array.from(this.avatarsInsideCollider);

            this.publish("BoundAvatarCollider", "AvatarsChange", {
                previous,
                current: previous.filter((id) => id !== playerId),
                type: this._cardData.boundAvatarCollider.type,
                setup: this._cardData.boundAvatarCollider.setup,
                id: this.id,
            });

            this.avatarsInsideCollider.delete(playerId);

            if (this._cardData.boundAvatarCollider.once) {
                this.teardown();
            }
        }
    }

    teardown() {
        this.say('StopListening');
    }
}

class BoundAvatarColliderPawn {
    setup() {
        this.config = this.actor._cardData.boundAvatarCollider;

        this.myPawn = this.getMyAvatar();

        if (this.config.ghost) {
            switch (this.config.type) {
                case "box":
                    this.makeBoxGhost();
            }
        }

        this.tickTime = this.actor._cardData.boundAvatarCollider.tick || 100;
        this.collider = this._buildCollider();

        this._checking = true;
        this.runChecking();

        this.listen('StopListening', 'teardown');
    }

    runChecking() {
        if (!this._checking) {
            return;
        }

        const isColliding = this.calcIsColliding();

        if (this._isColliding !== isColliding) {
            this._isColliding = isColliding;
            this.say('AvatarCollisionChange', { playerId: this.myPawn.actor.playerId, isColliding });
        }

        this.future(this.tickTime).runChecking();
    }

    calcIsColliding() {
        if (!this._checking || !this.myPawn.initialized) {
            return false;
        }

        const point = new Microverse.THREE.Vector3(...this.myPawn.translation);

        if (!this.actor._cardData.boundAvatarCollider.distance) {
            return this.collider.containsPoint(point);
        } else {
            return this.collider.distanceToPoint(point) <= this.actor._cardData.boundAvatarCollider.distance;
        }
    }

    teardown() {
        this._checking = false;

        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            this.shape.remove(this.mesh);
            this.mesh = null;
        }
    }

    makeBoxGhost() {
        this.teardown();

        const [ [x1, y1, z1], [x2, y2, z2] ] = this.config.setup;

        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        const depth = Math.abs(z2 - z1);
        const cX = (x2 + x1) / 2;
        const cY = (y2 + y1) / 2;
        const cZ = (z2 + z1) / 2;

        const geometry = new Microverse.THREE.BoxGeometry(width, height, depth);

        geometry.translate(cX, cY, cZ);

        this.mesh = new Microverse.THREE.Mesh(geometry, this.getMaterial());

        this.shape.add(this.mesh);
    }

    _buildCollider() {
        const [ p1, p2 ] = this.actor._cardData.boundAvatarCollider.setup;
        const translate = new Microverse.THREE.Vector3(...this.translation);

        return new Microverse.THREE.Box3(
            new Microverse.THREE.Vector3(...p1).add(translate),
            new Microverse.THREE.Vector3(...p2).add(translate),
        );
    }

    getMaterial() {
        return new Microverse.THREE.MeshStandardMaterial({
            color: 0xcccccc,
            wireframe: true,
        });
    }
}

export default {
    modules: [
        {
            name: "BoundAvatarCollider",
            actorBehaviors: [BoundAvatarColliderActor],
            pawnBehaviors: [BoundAvatarColliderPawn],
        }
    ]
}
