class HomePortalActor {
    setup() {
        this.subscribe("global", "boundBoxAvatarColliderChange", "onBoundBoxAvatarColliderChange");
    }

    onBoundBoxAvatarColliderChange(event) {
        if (event.name === this.name && event.current.length) {
            this.openPortal();
        }
    }

    check() {
        let cards = this.queryCards({methodName: "isPortal"}, this);
        this.hasOpened = cards.length > 0;
    }

    isPortal(card) {
        return card.layers.includes("portal");
    }

    openPortal() {
        this.check();
        if (this.hasOpened) {return;}
        this.hasOpened = true;

        this.createCard({
            translation: [0, 1.3, -3.6],
            rotation: [0, Math.PI, 0],
            layers: ["pointer"],
            className: "PortalActor",
            color: 16737996,
            cornerRadius: 0.05,
            depth: 0.05,
            frameColor: 8947848,
            portalURL: "?world=home",
            type: "2d",
            width: 1.8,
            height: 2.4,
        });

        this.say("portalOpened");
    }
}

class HomePortalPawn {
    setup() {
        this.makeButton();
        this.listen("portalOpened", "setColor");
    }

    teardown() {
        if (this.buttonMesh) {
            this.shape.remove(this.buttonMesh);
            this.buttonMesh = null;
        }
    }

    setColor() {
        const baseColor = this.actor.hasOpened ? 0xdddddd : 0xeeeeee;
        this.buttonMesh?.material.color.setHex(baseColor);
    }

    makeButton() {
        this.teardown();

        let geometry = new Microverse.THREE.BoxGeometry(3, 0.04, 1.6);
        let material = new Microverse.THREE.MeshStandardMaterial({color: 0xcccccc, metalness: 0.8});
        this.buttonMesh = new Microverse.THREE.Mesh(geometry, material);
        this.buttonMesh.castShadow = this.actor._cardData.shadow;
        this.buttonMesh.receiveShadow = this.actor._cardData.shadow;

        if (this.actor.layers.includes("walk")) {
            this.cleanupColliderObject();
            this.constructCollider(this.buttonMesh);
        }

        this.shape.add(this.buttonMesh);
        this.setColor();
    }
}

export default {
    modules: [
        {
            name: "HomePortalButton",
            actorBehaviors: [HomePortalActor],
            pawnBehaviors: [HomePortalPawn]
        }
    ]
}
