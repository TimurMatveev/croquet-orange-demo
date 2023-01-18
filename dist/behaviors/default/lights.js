class LightActor {
    setup() {
        this.radius = 100; //of circle sun path
        this.sunStartAngle = 20 //degrees
        this.sunPeriodTime = 12 //minutes
        this.animationStep = 50 //milisec
        this.z0 = -15; //z displacement

        this.sunAngle = this.sunStartAngle * Math.PI / 180; //radians

        this.sunAngleSpeed = ((180 - 2 * this.sunStartAngle) / (this.sunPeriodTime * 60 * 1000 / this.animationStep)) * Math.PI / 180;

        this.pos = {...this.calcPos()};
        this.doSpin();
    }

    doSpin() {
        this.say("sunPositionChanged", this.pos);

        this.sunAngle += this.sunAngleSpeed;
        this.pos = {...this.calcPos()};

        if ( this.sunAngle >= (180 - this.sunStartAngle) * Math.PI / 180 ) {
            this.sunAngle = this.sunStartAngle * Math.PI / 180;
        }

        this.future(this.animationStep).doSpin();
    }

    calcPos() {
        const pos = {};
        pos.x = this.radius * Math.cos(this.sunAngle);
        pos.y = this.radius * Math.sin(this.sunAngle);
        pos.z = this.z0 + this.radius * Math.sin(this.sunAngle);
        return pos
    }
}

class LightPawn {
    setup() {
        let group = this.shape;
        let THREE = Microverse.THREE;

        this.removeLights();
        this.lights = [];

        const ambient = new THREE.AmbientLight( 0xffffff, .9 );
        group.add(ambient);
        this.lights.push(ambient);

        this.sun = new THREE.DirectionalLight( 0xffffff, 10 );     
        this.sun.castShadow = true;
        this.sun.shadow.blurSamples = 25;
        this.sun.shadow.camera.left = 25;
        this.sun.shadow.camera.right = -25;
        this.sun.shadow.camera.top = 25;
        this.sun.shadow.camera.bottom = -25;
        this.sun.shadow.mapSize.width = 2048; // default
        this.sun.shadow.mapSize.height = 2048; // default

        /*const helper2 = new THREE.CameraHelper( this.sun.shadow.camera);
        group.add(helper2);*/

        group.add(this.sun);
        this.lights.push(this.sun);

        const sunTarget = new THREE.Object3D();
        sunTarget.position.set(1, 0, 8);
        group.add(sunTarget);
        this.lights.push(sunTarget);
        this.sun.target = sunTarget;

       
        const geometry1 = new THREE.SphereGeometry( 2, 32, 16 );
        const material1 = new THREE.MeshStandardMaterial( { color: 0xffed7a, emissive: 0xffed7a, emissiveIntensity: 100} );
        const ob1 = new THREE.Mesh( geometry1, material1 );

        const geometry2 = new THREE.SphereGeometry( 4, 32, 16 );
        const material2 = new THREE.MeshStandardMaterial( { color: 0xf5f5f5, emissive: 0xffed7a, emissiveIntensity: 1, transparent: true, opacity: 0.3} );
        const ob2 = new THREE.Mesh( geometry2, material2 );

        const geometry3 = new THREE.SphereGeometry( 6, 32, 16 );
        const material3 = new THREE.MeshStandardMaterial( { color: 0xf5f5f5, emissive: 0xffed7a, emissiveIntensity: 1, transparent: true, opacity: 0.2} );
        const ob3 = new THREE.Mesh( geometry3, material3 );

        this.sphere = new THREE.Group();
        this.sphere.add( ob1 );
        this.sphere.add( ob2 );
        this.sphere.add( ob3 );
        group.add( this.sphere );

        this.constructBackground(this.actor._cardData);

        let moduleName = this._behavior.module.externalName;
        this.addUpdateRequest([`${moduleName}$LightPawn`, "update"]);

        this.listen("updateShape", "updateShape");
        this.listen("sunPositionChanged", "changedPosition");
    }
        
   

    removeLights() {
        if (this.lights) {
            [...this.lights].forEach((light) => {
                if (light.dispose) {
                    light.dispose();
                }
                this.shape.remove(light);
            });
        }

        delete this.lights;

        if (this.sphere) {
            this.shape.remove(this.sphere);
        }

        delete this.sphere;


        if (this.csm) {
	    for ( let i = 0; i < this.csm.lights.length; i ++ ) {
	        this.csm.parent.remove( this.csm.lights[ i ].target );
	    }
            this.csm.remove();
            this.csm.dispose();
            delete this.csm;
        }
    }

    teardown() {
        console.log("teardown lights");
        this.removeLights();
        let scene = this.service("ThreeRenderManager").scene;
        scene.background?.dispose();
        scene.environment?.dispose();
        scene.background = null;
        scene.environment = null;

    }

    updateShape(options) {
        this.constructBackground(options);
    }

    constructBackground(options) {
        let assetManager = this.service("AssetManager").assetManager;
        let dataType = options.dataType;
        if (!options.dataLocation) {return;}
        return this.getBuffer(options.dataLocation).then((buffer) => {
            return assetManager.load(buffer, dataType, Microverse.THREE, options).then((texture) => {
                let TRM = this.service("ThreeRenderManager");
                let renderer = TRM.renderer;
                let scene = TRM.scene;
                let pmremGenerator = new Microverse.THREE.PMREMGenerator(renderer);
                pmremGenerator.compileEquirectangularShader();

                let exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
                let exrBackground = exrCubeRenderTarget.texture;

                let bg = scene.background;
                let e = scene.environment;
                scene.background = exrBackground;
                scene.environment = exrBackground;
                if(e !== bg) if(bg) bg.dispose();
                if(e) e.dispose();
                texture.dispose();
            }).then(() => {
                if (this.actor._cardData.loadSynchronously) {
                    this.publish(
                        this.sessionId, "synchronousCardLoaded", {id: this.actor.id});
                }
            });
        });
    }

    changedPosition(pos) {
        this.sun.position.set(pos.x, pos.y, pos.z);
        this.sphere.position.set(pos.x, pos.y, pos.z);
    }

    update(_time) {
        if(this.csm) this.csm.update();
    }
}

export default {
    modules: [
        {
            name: "Light",
            actorBehaviors: [LightActor],
            pawnBehaviors: [LightPawn]
        }
    ]
}

/* globals Microverse */
