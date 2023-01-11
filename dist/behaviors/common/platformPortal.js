class PlatformPortalActor {
    setup() {
        this.config = this._cardData.portalCard;

        this.permitted = (this.config.permissions || [])
            .every(permission => !(window.settingsMenuConfiguration.restrictions || []).includes(permission));

        this.subscribe("global", "boundBoxAvatarColliderChange", "onBoundBoxAvatarColliderChange");
    }

    onBoundBoxAvatarColliderChange(event) {
        if (!event.current.length) {
            return;
        }

        if (event.name === this.name) {
            this.openPortal();
        } else {
            this.closePortal();
        }
    }

    isPortal(card) {
        return card.layers.includes("portal");
    }

    openPortal() {
        if (this.getPortalCard() || !this.permitted) {return;}

        this.createCard(this.config);

        this.say("portalOpened");
    }

    getPortalCard() {
        return this.queryCards({methodName: "isPortal"}, this).find(card => card.name === this.config.name);
    }

    closePortal() {
        this.getPortalCard()?.destroy();
    }
}

class PlatformPortalPawn {
    setup() {
        this.config = this.actor._cardData.platformButton;

        this.makeButton();
        this.listen("portalOpened", "onPortalOpened");
    }

    teardown() {
        if (this.buttonMesh) {
            this.shape.remove(this.buttonMesh);
            this.buttonMesh = null;
        }
    }

    onPortalOpened() {
        this.buttonMesh.material.setValues(this.config.material.opened);
    }

    makeButton() {
        this.teardown();

        const geometry = new Microverse.THREE.BoxGeometry(...this.config.box);
        const material = new Microverse.THREE.MeshStandardMaterial(
            this.actor.permitted ? this.config.material.default : this.config.material.disabled
        );
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
            name: "PlatformPortalActor",
            actorBehaviors: [PlatformPortalActor],
            pawnBehaviors: [PlatformPortalPawn]
        }
    ]
}
