class HoverPawn {
    setup() {
        this.addEventListener("pointerMove", "nop");
        this.addEventListener("pointerEnter", "hilite");
        this.addEventListener("pointerLeave", "unhilite");
    }

    setColor() {
        let baseColor = this.entered ? 0xf1b551 : 0x000000;
    
        if (this.shape.children[0].children[0] && this.shape.children[0].children[0].material) {
            this.shape.children[0].children[0].material.emissive.setHex(baseColor);
        }
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
            name: "hover",
            pawnBehaviors: [HoverPawn]
        }
    ]
}