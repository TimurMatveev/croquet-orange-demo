class ClockActor {
    setup() {
        this.animationStep = 50; //milisec
        this.isRealTimeClock = this._cardData.isRealTimeClock; 
        
        if (!this.isRealTimeClock) {
            this.startHour = this._cardData.startHour;
            this.clockPeriodTime = this._cardData.clockPeriodTime; //minutes

            this.time = this.startHour * 60 * 60 * 1000; //millisec
        }
        
        this.pos = {...this.calcPos()};
        this.doSpin();
    }

    doSpin() {
        this.say("timeChanged", this.pos);

        if (!this.isRealTimeClock) {
            this.time += this.animationStep * (60 * 12 / this.clockPeriodTime);
        }

        this.pos = {...this.calcPos()};

        this.future(this.animationStep).doSpin();
    }

    calcPos() {
        const pos = {};
        if (!this.isRealTimeClock) {
            pos.bigArrowAngle = 360 * ( this.time / (3600 * 1000) -  Math.trunc(this.time / (3600 * 1000)) ) * Math.PI / 180; //radians
            pos.smallArrowAngle = (360 * this.time / (12 * 3600 * 1000)) * Math.PI / 180;  //radians 
        } else {
            let date = globalThis.CroquetViewDate(); //it is a String - Thu Jan 19 2023 22:56:55 GMT+0300 (Moscow Standard Time)
            let minsHours = date.match(/\s[0-9]{2}\:[0-9]{2}/)[0].trim();
            let initGMT = date.match(/[+-][0-9]{4}/)[0].replaceAll('0','');
            let h = minsHours.split(':')[0] - Number(initGMT) + this._cardData.zoneGMT;
            let min = minsHours.split(':')[1] - 60 * (Number(initGMT) - Math.trunc(Number(initGMT)));
                       
            pos.bigArrowAngle = 360 * (min / 60) * Math.PI / 180 //radians
            pos.smallArrowAngle = (720 * (h + (min / 60)) / 24) * Math.PI / 180;  //radians 
        }
        return pos
    }
}


class ClockPawn {
    setup() {
        this.listen("timeChanged", "rotateClock");
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        this.loaded = false
    }

    rotateClock(pos) {
        if (this.loaded ) {
            this.shape.children[0].children[0].children[0].rotation.z = -pos.smallArrowAngle;
            this.shape.children[0].children[0].children[1].rotation.z = -pos.bigArrowAngle;
        }
    }

    modelLoaded() {
        this.loaded = true;
        let pos = this.actor.pos;
        //console.log(this.shape);
        this.rotateClock(pos); 
    }
}

export default {
    modules: [
        {
            name: "Clock",
            actorBehaviors: [ClockActor],
            pawnBehaviors: [ClockPawn]
        }
    ]
}