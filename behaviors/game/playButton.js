class PlayButtonActor {
	setup() {
		this.avatarIds = [];
		this.subscribe(this.getScope(), "PlatformAvatarsChange", "onAvatarsChange");
		this.addEventListener("pointerTap", "pressed");

		console.log('PlayButtonActor:' + this.getScope());
	}

	getScope() {
		return this._cardData.playScope || "global";
	}

	onAvatarsChange(avatarIds) {
		this.avatarIds = avatarIds;
		this.say("updateAvatars", avatarIds);
	}

	pressed() {
		this.publish(this.getScope(), "StartPressed", this.avatarIds);
	}
}

class PlayButtonPawn {
	setup() {
		const fontPath = './assets/fonts/helvetiker_bold.typeface.json';
		this.font = new Promise((resolve) => new Microverse.THREE.FontLoader().load(fontPath,  font => resolve(font)));

		this.playerManager = this.actor.service("PlayerManager");

		this.listen("updateAvatars", "onAvatarsUpdated");

		this.addEventListener("pointerMove", "nop");
		this.addEventListener("pointerEnter", "onPointerHover");
		this.addEventListener("pointerLeave", "onPointerOut");

		this.onAvatarsUpdated(this.actor.avatars || []);

		this.subscribe(this.getScope(), "PlayButtonHidden", "onPlayButtonHiddenChange");
	}

	getScope() {
		return this.actor._cardData.playScope || "global";
	}

	onPlayButtonHiddenChange(isHidden) {
		this.isHidden = isHidden;

		if (isHidden) {
			this.teardown();
		} else {
			this.onAvatarsUpdated(this.actor.avatars || []);
		}
	}

	onAvatarsUpdated(avatarIds) {
		if (!avatarIds.length || this.isHidden) {
			return this.teardown();
		}

		const avatars = avatarIds.map((id) => this.playerManager.players.get(id));

		this.generateText(`
Start ${this.actor._cardData.gameName}
Players:
${avatars.map((avatar, index) => `${index + 1}. ${avatar.name}${index === avatars.length - 1 ? '' : ','}`).join('\n')}
`
		);
	}

	async generateText(text) {
		if (this.textMesh) {
			this.teardown();
		}

		const color = this.actor._cardData.color || 0x333333;
		const depth = 0.05;
		const height = 0.25;
		const curveSegments = 4;
		const bevelThickness = 0.01;
		const bevelSize = 0.01;
		const bevelEnabled = this.actor._cardData.bevelEnabled;
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
			bevelEnabled,
		});

		textGeometry.computeBoundingBox();

		const centerOffset = - 0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );

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

	onPointerHover() {
		this.setColor(this.actor._cardData.hover || 0x666666);
	}

	onPointerOut() {
		this.setColor(this.actor._cardData.color || 0x333333);
	}

	setColor(color) {
		const [facade, aside] = this.shape.children.at(0)?.material || [];
		facade?.color.setHex(color);
		aside?.color.setHex(color);
	}
}

export default {
	modules: [
		{
			name: "PlayButton",
			actorBehaviors: [PlayButtonActor],
			pawnBehaviors: [PlayButtonPawn]
		}
	]
}
