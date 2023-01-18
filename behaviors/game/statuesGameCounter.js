class StatuesGameCounterPawn {
    setup() {
        this.teardown();

        const fontPath = "./assets/fonts/helvetiker_bold.typeface.json";
        this.font = new Promise((resolve) => new Microverse.THREE.FontLoader().load(fontPath,  font => resolve(font)));

        this.subscribe(this.getScope(), "StatuesGameFinished", "onStatuesGameFinished");
        this.subscribe(this.getScope(), "StatuesGameStateChange", "onStatuesGameStateChange");
    }

    getScope() {
        return this.actor._cardData.gameScope || "global";
    }

    onStatuesGameFinished() {
        this.teardown();
    }

    onStatuesGameStateChange(event) {
        if (event.state === "go") {
            this.renderText("GO", 0x00FF00);
        } else if (event.state === "countdown") {
            this.renderText(`${event.value}`, 0xd3b200);
        } else if (event.state === "stop") {
            this.renderText("STOP", 0xFF0000);
        } else {
            this.teardown();
        }
    }

    async renderText(text, color) {
        if (this.textMesh) {
            this.teardown();
        }

        const depth = 0.05;
        const height = 0.25;
        const curveSegments = 4;
        const bevelThickness = 0.01;
        const bevelSize = 0.01;
        const font = await this.font;

        const materials = [
            new Microverse.THREE.MeshPhongMaterial( { color, flatShading: true } ),
            new Microverse.THREE.MeshPhongMaterial( { color, } ),
        ];

        const textGeometry = new Microverse.THREE.TextGeometry( text, {
            font,
            size: height,
            height: depth,
            curveSegments,
            bevelThickness,
            bevelSize,
        });

        textGeometry.computeBoundingBox();

        const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);

        this.textMesh = new Microverse.THREE.Mesh( textGeometry, materials );
        this.textMesh.position.set(centerOffset,0,0);

        this.shape.add( this.textMesh );
    }

    teardown() {
        if (this.textMesh) {
            this.textMesh.removeFromParent();
            this.textMesh.geometry.dispose();
            this.textMesh.material[0].dispose();
            this.textMesh.material[1].dispose();
            delete this.textMesh;
        }
    }
}

export default {
    modules: [
        {
            name: "StatuesGameCounter",
            actorBehaviors: [],
            pawnBehaviors: [StatuesGameCounterPawn]
        },
    ]
}
