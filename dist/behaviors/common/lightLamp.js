class LightLampPawn {
    setup() {
        let group = this.shape;
        let THREE = Microverse.THREE;

        this.removeLights();
        this.lights = [];
        this.lightTargets = [];
        const angle = this.actor._cardData.angle || 0.6;

        this.isTurnOn = this.actor._cardData.isTurnOnInitialy;
        this.isSimlpe = this.actor._cardData.isSimlpify || false;

        if (!this.isSimlpe) {
            const light1 = new THREE.SpotLight( 0xffffff );
            light1.position.set( 0.777, 0, 0 );
            light1.angle = angle;
            light1.castShadow  = true;
            light1.visible = this.isTurnOn;
            group.add(light1);
            this.lights.push(light1);

            const lightTargetPoint1 = new THREE.Object3D();
            lightTargetPoint1.position.set( 0, -5, 0 );
            group.add(lightTargetPoint1);
            this.lightTargets.push(lightTargetPoint1);
            light1.target = lightTargetPoint1;
        }
      
        const pointLight1 = new THREE.PointLight( 0xffffff, 100, 0.05 );
        pointLight1.position.set( 0.78, -0.131, 0 );
        group.add(pointLight1);
        pointLight1.visible = this.isTurnOn;
        this.lights.push(pointLight1);     
        ////////////////////////////////////////

        const light2 = new THREE.SpotLight( 0xffffff );
        light2.position.set( 0.242, 0, 0 );
        light2.angle = angle;
        light2.castShadow  = true;
        light2.visible = this.isTurnOn;
        group.add(light2);
        this.lights.push(light2);

        const pointLight2 = new THREE.PointLight( 0xffffff, 100, 0.05 );
        pointLight2.position.set( 0.236, -0.131, 0 );
        group.add(pointLight2);
        pointLight2.visible = this.isTurnOn;
        this.lights.push(pointLight2);

        const lightTargetPoint2 = new THREE.Object3D();
        lightTargetPoint2.position.set( -1, -5, 0 );
        group.add(lightTargetPoint2);
        this.lightTargets.push(lightTargetPoint2);
        light2.target = lightTargetPoint2;
        ////////////////////////////////////////

        if (!this.isSimlpe) {
            const light3 = new THREE.SpotLight( 0xffffff );
            light3.position.set( -0.236, 0, 0 );
            light3.angle = angle;
            light3.castShadow  = true;
            light3.visible = this.isTurnOn;
            group.add(light3);
            this.lights.push(light3);

            const lightTargetPoint3 = new THREE.Object3D();
            lightTargetPoint3.position.set( -0.5, -5, 0 );
            group.add(lightTargetPoint3);
            this.lightTargets.push(lightTargetPoint3);
            light3.target = lightTargetPoint3;
        }
        
        const pointLight3 = new THREE.PointLight( 0xffffff, 100, 0.05 );
        pointLight3.position.set( -0.231, -0.131, 0 );
        group.add(pointLight3);
        pointLight3.visible = this.isTurnOn;
        this.lights.push(pointLight3);  
        ////////////////////////////////////////

        if (!this.isSimlpe) {
            const light4 = new THREE.SpotLight( 0xffffff );
            light4.position.set( -0.775, 0, 0 );
            light4.angle = angle;
            light4.castShadow  = true;
            light4.visible = this.isTurnOn;
            group.add(light4);
            this.lights.push(light4);

            const lightTargetPoint4 = new THREE.Object3D();
            lightTargetPoint4.position.set( -0.7, -5, 0 );
            group.add(lightTargetPoint4);
            this.lightTargets.push(lightTargetPoint4);
            light4.target = lightTargetPoint4;
        }

        const pointLight4 = new THREE.PointLight( 0xffffff, 100, 0.05 );
        pointLight4.position.set( -0.752, -0.131, 0 );
        group.add(pointLight4);
        pointLight4.visible = this.isTurnOn;
        this.lights.push(pointLight4);

        

        this.subscribe('global', 'switchLight', 'switchLight');
    }

    switchLight(params) {
        if (params.key === this.actor._cardData.lightKey) {
            this.lights.forEach(el => el.visible = params.value);
            
            if (this.actor._cardData.externalSwitchUrls) {
                let url = params.value ? this.actor._cardData.externalSwitchUrls.on : this.actor._cardData.externalSwitchUrls.off;
                fetch(url, {mode: 'no-cors', cache:'no-cache'})
                .then(res => res.text())
                .then(res => console.log(res + 'external device is switched'))
                .catch(err => console.error(err))
            }
            
        }
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

        if (this.liglightTargetshts) {
            [...this.lightTargets].forEach((lightTarget) => {
                if (lightTarget.dispose) {
                    lightTarget.dispose();
                }
                this.shape.remove(lightTarget);
            });
        }
        delete this.lightTargets;
    }
}

export default {
    modules: [
        {
            name: "lightLamp",
            pawnBehaviors: [LightLampPawn]
        }
    ]
}