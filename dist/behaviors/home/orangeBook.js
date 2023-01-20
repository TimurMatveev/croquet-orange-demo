class OrangeBookActor {
    setup() {
        this.teardown();
        this.addEventListener("pointerTap", "pressed");
    }

    pressed() {
        if (this.bookCard) {
            this.bookCard.destroy();
            this.bookCard = null;
            return;
        }

        this.bookCard = this.createCard({
            ...this._cardData.pdf,
            layers: ["pointer"],
            behaviorModules: ["PDFView"],
            color: 8947848,
            depth: 0.05,
            frameColor: 16777215,
            fullBright: true,
            modelType: "pdf",
            shadow: true,
            singleSided: true,
            type: "2d",
        });
    }

    teardown() {
        this.bookCard?.teardown();
    }
}

export default {
    modules: [
        {
            name: "OrangeBook",
            actorBehaviors: [OrangeBookActor]
        },
    ],
}
