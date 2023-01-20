class PlatformActionTriggerActor {
    setup() {
        this.subscribe("BoundAvatarCollider", "AvatarsChange", "onAvatarsChange");
    }

    getScope() {
        return this._cardData.platform.scope || "global";
    }

    onAvatarsChange(event) {
        if (event.id !== this.id) {
            return;
        }

        this.publish(this.getScope(), "PlatformAvatarsChange", event.current);
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
