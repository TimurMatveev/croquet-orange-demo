class HomePortalActor {
    setup() {
        this.addEventListener("pointerTap", "pressed");
    }

    check() {
        let cards = this.queryCards({methodName: "isPortal"}, this);
        this.hasOpened = cards.length > 0;
    }

    isPortal(card) {
        return card.layers.includes("portal");
    }

    pressed() {
        this.check();
        if (this.hasOpened) {return;}
        this.hasOpened = true;

        this.createCard({
            translation: [0, 1.2, -2.4],
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

        this.say("portalChanged");
    }
}

class HomePortalPawn {
    setup() {
        this.addEventListener("pointerMove", "nop");
        this.addEventListener("pointerEnter", "hilite");
        this.addEventListener("pointerLeave", "unhilite");
        this.makeButton();
        this.listen("portalChanged", "setColor");
    }

    setColor() {
        let baseColor = !this.actor.hasOpened
            ? (this.entered ? 0xeeeeee : 0xcccccc)
            : 0x22ff22;

        if (this.shape.children[0] && this.shape.children[0].material) {
            this.shape.children[0].material.color.setHex(baseColor);
        }
    }

    makeButton() {
        [...this.shape.children].forEach((c) => this.shape.remove(c));

        let geometry = new Microverse.THREE.SphereGeometry(0.15, 16, 16);
        let material = new Microverse.THREE.MeshStandardMaterial({color: 0xcccccc, metalness: 0.8});
        let button = new Microverse.THREE.Mesh(geometry, material);
        this.shape.add(button);
        this.setColor();
    }

    hilite() {
        this.entered = true;
        this.setColor();
    }

    unhilite() {
        this.entered = false;
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
