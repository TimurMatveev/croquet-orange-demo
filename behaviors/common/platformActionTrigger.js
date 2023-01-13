class PlatformActionTriggerActor {
    setup() {
        this.listen("boundBoxAvatarColliderChange", "onBoundBoxAvatarColliderChange");
    }

    onBoundBoxAvatarColliderChange(event) {
        if (event.name !== this.name) {
            return;
        }

        const playersMap = this.service("PlayerManager").players;
        const avatars = event.current.map((id) => playersMap.get(id));
        this.publish(this._cardData.gameKey, "PlatformAvatarsChange", avatars);
    }
}

class PlatformActionTriggerPawn {
    setup() {
        this.config = this.actor._cardData.platform;

        this.makeButton();
    }

    teardown() {
        if (this.buttonMesh) {
            this.shape.remove(this.buttonMesh);
            this.buttonMesh = null;
            this.cleanupColliderObject();
        }
    }

    makeButton() {
        this.teardown();

        const geometry = new Microverse.THREE.BoxGeometry(...this.config.box);
        const material = new Microverse.THREE.MeshStandardMaterial(this.config.material);
        this.buttonMesh = new Microverse.THREE.Mesh(geometry, material);
        this.buttonMesh.castShadow = this.actor._cardData.shadow;
        this.buttonMesh.receiveShadow = this.actor._cardData.shadow;

        if (this.actor.layers.includes("walk")) {
            this.cleanupColliderObject();
            this.constructCollider(this.buttonMesh);
        }

        this.shape.add(this.buttonMesh);
    }
}

export default {
    modules: [
        {
            name: "PlatformActionTrigger",
            actorBehaviors: [PlatformActionTriggerActor],
            pawnBehaviors: [PlatformActionTriggerPawn],
        }
    ]
}
