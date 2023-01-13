export const PM_Speedo = superclass => class extends superclass {
    constructor(options) {
        super(options);

        this.speedClock = new THREE.Clock();

        this.speedInterval = 20;

        this.speedValue = {
            speed: 0,
            sign: 1,
            tick: 0,
        };

        this._speedPositions = [];

        this._speedHandlers = new Set();
    }

    addSpeedHandler(handler) {
        this._speedHandlers.add(handler);
    }

    removeSpeedHandler(handler) {
        this._speedHandlers.remove(handler);
    }

    initSpeedo(pawn) {
        this._listenSpeed(pawn);
    }

    detach() {
        this._stopListenSpeed();
        super.detach();
    }

    _listenSpeed(pawn) {
        const run = () => {
            if (this._speedoIntervalId) {
                clearInterval(this._speedoIntervalId);
            }

            this.speedValue = this._calcSpeed(pawn);
            this._speedHandlers.forEach(handler => handler(this.speedValue));
            this._speedoIntervalId = setInterval(() => run(), this.speedInterval);
        }

        run();
    }

    _stopListenSpeed() {
        if (this._speedoIntervalId) {
            clearInterval(this._speedoIntervalId);
        }

        this._speedHandlers.clear();
    }

    _calcSpeed(pawn) {
        if (this._speedPositions.length >= 8) {
            this._speedPositions.shift();
        }

        this._speedPositions.push({
            vector: new THREE.Vector3(...pawn.translation),
            time: this.speedClock.getElapsedTime(),
        });

        const from = this._speedPositions.at(0);
        const to = this._speedPositions.at(-1);
        const preTo = this._speedPositions.at(-2) || from;
        const tick = to.time - preTo.time;

        if (from.vector.equals(to.vector)) {
            return {
                speed: 0,
                sign: 1,
                tick,
            };
        }

        const fullDistance = to.vector.distanceTo(from.vector);
        const fullTime = to.time - from.time;

        const speed = fullDistance / (fullTime);

        // Sign should represent if avatar moves forward or backward
        const [,a,,b] = pawn.rotation;
        const xSign = Math.sign(a) !== Math.sign(b) ? 1 : -1;
        const sign = 0 <= to.vector.x - preTo.vector.x ? xSign : -xSign;

        return {
            speed,
            sign,
            tick,
        };
    }
}
