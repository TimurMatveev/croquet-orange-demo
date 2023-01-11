class LightSwitchActor {
    setup() {
        this.isTurnOn = this._cardData.isTurnOnInitialy;
        this.addEventListener("pointerTap", "pressed");
    }

    pressed() {
        this.isTurnOn = !this.isTurnOn;
        this.say("lightSwitchChanged", this.isTurnOn);
        this.publish('global', 'switchLight', { key: this._cardData.lightKey, value: this.isTurnOn });
        //this.subcribe('global', 'switchLight', 'method')
    }
}

class LightSwitchPawn {
    setup() {
        this.addEventListener("pointerMove", "nop");
        this.addEventListener("pointerEnter", "hilite");
        this.addEventListener("pointerLeave", "unhilite");
        this.listen("lightSwitchChanged", "rotate");
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
    }

    setColor() {
        let baseColor = this.entered ? 0xeeeeee : 0xcccccc;
    
        if (this.shape.children[0].children[0] && this.shape.children[0].children[0].material) {
            this.shape.children[0].children[0].material.color.setHex(baseColor);
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

    rotate(isOn) {
        let angle = isOn ? -0.12 : 0;
        this.shape.children[0].children[0].children[0].rotation.x = angle;
    }

    modelLoaded() {
        this.rotate(this.actor._cardData.isTurnOnInitialy); 
    }
}

export default {
    modules: [
        {
            name: "lightSwitchButton",
            actorBehaviors: [LightSwitchActor],
            pawnBehaviors: [LightSwitchPawn]
        }
    ]
}