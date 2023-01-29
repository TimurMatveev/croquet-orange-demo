class CubeActor {
    setup() {
        this.animationStep = 20; //milisec
        this.angle = 0;
        this.doSpin();
    }

    doSpin() {
        this.angle += 0.3 * Math.PI / 180; //radians;
        this.say("cubeRotated", this.angle);

        this.future(this.animationStep).doSpin();
    }
}


class CubePawn {
    setup() {
        this.listen("cubeRotated", "rotateCube");
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        this.loaded = false;
    }

    rotateCube(angle) {
        if (this.loaded) {
            this.shape.children[0].children[0].rotation.y = angle;
        }
    }

    modelLoaded() {
        this.loaded = true;
        let angle = this.actor.angle;
        //console.log(this.shape);
        this.rotateCube(angle); 
    }
}

export default {
    modules: [
        {
            name: "CubeRotation",
            actorBehaviors: [CubeActor],
            pawnBehaviors: [CubePawn]
        }
    ]
}