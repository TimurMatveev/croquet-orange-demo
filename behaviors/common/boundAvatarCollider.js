class BoundAvatarColliderActor {
    setup() {
        this.collider = this._getCollider();
        this.avatars = new Set();
        this.keepAlive = true;
        this.lastAvatarsInsideCollider = new Set();
        this.playerManager = this.service("PlayerManager");

        if (!this.initialized) {
            this.initialized = true;

            this.tickIndex = 0;

            this.tick = this._cardData.boundAvatarCollider.tick || 100;

            this.step();
        }
    }

    step() {
        if (!this.initialized) {
            return;
        }

        const avatarsInsideCollider = new Set();

        this.playerManager.players.forEach(avatar => {
            if (this._checkCollision(new Microverse.THREE.Vector3(...avatar.translation))) {
                avatarsInsideCollider.add(avatar);
            }
        });

        if (!this._compareSets(avatarsInsideCollider, this.lastAvatarsInsideCollider)) {
            this.say("boundBoxAvatarColliderChange", {
                previous: Array.from(this.lastAvatarsInsideCollider).map(({ playerId }) => playerId),
                current: Array.from(avatarsInsideCollider).map(({ playerId }) => playerId),
                type: this._cardData.boundAvatarCollider.type,
                setup: this._cardData.boundAvatarCollider.setup,
                name: this.name,
                tickIndex: this.tickIndex,
            });

            if (this._cardData.boundAvatarCollider.once) {
                this.keepAlive = false;
                this.teardown();
            }

            this.lastAvatarsInsideCollider = avatarsInsideCollider;
        }

        this.tickIndex++;

        if (this.keepAlive) {
            this.future(this.tick).step();
        }
    }

    teardown() {
        this.initialized = false;
    }

    _checkCollision(point) {
        if (!this._cardData.boundAvatarCollider.distance) {
            return this.collider.containsPoint(point);
        } else {
            return this.collider.distanceToPoint(point) <= this._cardData.boundAvatarCollider.distance;
        }
    }

    // should return interface:
    // {
    //     containsPoint(point: THREE.Vector3): boolean;
    //     distanceToPoint(point: THREE.Vector3): number;
    // }
    _getCollider() {
        switch (this._cardData.boundAvatarCollider.type) {
            case 'box':
                const [ p1, p2 ] = this._cardData.boundAvatarCollider.setup;
                const translate = new Microverse.THREE.Vector3(...this.translation);

                return new Microverse.THREE.Box3(
                    new Microverse.THREE.Vector3(...p1).add(translate),
                    new Microverse.THREE.Vector3(...p2).add(translate),
                );
            default:
                return {
                    containsPoint: () => false,
                    distanceToPoint: () => Infinity,
                };
        }
    }

    _compareSets(set1, set2) {
        if (!set1.size && !set2.size) {
            return true;
        }

        if (set1.size !== set2.size) {
            return false;
        } else {
            return Array.from(set1).every(item => set2.has(item));
        }
    }
}

class BoundAvatarColliderPawn {
    setup() {
        this.config = this.actor._cardData.boundAvatarCollider;

        if (this.config.ghost) {
            switch (this.config.type) {
                case 'box':
                    this.makeBoxGhost();
            }
        }
    }

    teardown() {
        if (this.mesh) {
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

        this.mesh = new Microverse.THREE.Mesh(geometry, this.material);

        this.shape.add(this.mesh);
    }

    get material() {
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
