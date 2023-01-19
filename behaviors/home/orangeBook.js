class OrangeBookActor {
    setup() {
        this.teardown();

        this.addEventListener("pointerTap", "pressed");
    }

    pressed() {
        if (this.bookCard) {
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
            pdfLocation: "3i2bjIBqONmUqz8XGj0oguUVu-wJleyHEiMp8RBLCX2sAR0dGRpTRkYPAAUMGkccGkcKGwYYHAwdRwAGRhxGLg0_CxAFIBooAjgKKzENWi4RCB8QHjwiPjAwW0YABkcKGwYYHAwdRwQAChsGHwwbGgxGWjFcGQxRBQY8IA4-UBkaLwMTHBsEIA1cEVsCGTY2LCgKIBlROw8tNg8-XUYNCB0IRhAeHRoqCw8EBjguAxMiBQQxBDw7Xl8AKiddMVkdIB02Nh4zIRskGyomXgI",
            // pdfLocation: "",
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
