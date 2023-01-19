export const AM_Speedometer = superclass => class extends superclass {
    constructor(options) {
        super(options);

        // $ prefix -> ignore croquet snapshot
        this.$speedometer = {
            start: 0,
            interval: 25,
            intervalId: null,
            snapshots: [],
            speed: {
                value: 0,
                sign: 1,
                tick: 0,
            },
        };
    }

    initSpeedometer(pawn) {
        const run = () => {
            if (this.$speedometer.intervalId) {
                clearInterval(this.$speedometer.intervalId);
                this.$speedometer.intervalId = null;
            }

            this.$speedometer.speed = this._calcSpeed(pawn);
            this.$speedometer.intervalId = setInterval(() => run(), this.$speedometer.interval);
        }

        this.$speedometer.start = performance.now();

        run();
    }

    detach() {
        super.detach();

        if (this.$speedometer.intervalId) {
            clearInterval(this.$speedometer.intervalId);
            this.$speedometer.intervalId = null;
        }
    }

    _calcSpeed(pawn) {
        if (this.$speedometer.snapshots.length >= 8) {
            this.$speedometer.snapshots.shift();
        }

        this.$speedometer.snapshots.push({
            position: [...pawn.translation],
            time: performance.now(),
        });

        const from = this.$speedometer.snapshots.at(0);
        const to = this.$speedometer.snapshots.at(-1);
        const preTo = this.$speedometer.snapshots.at(-2) || from;
        const tick = to.time - preTo.time;

        const arePositionsEqual =
            from.position[0] === to.position[0] &&
            from.position[1] === to.position[1] &&
            from.position[2] === to.position[2];

        if (arePositionsEqual) {
            return {
                value: 0,
                sign: 1,
                tick,
            };
        }

        const distance = Math.sqrt(
            (from.position[0] - to.position[0]) ** 2 +
            (from.position[1] - to.position[1]) ** 2 +
            (from.position[2] - to.position[2]) ** 2
        );

        const time = to.time - from.time;

        const value = distance / time * 1000;

        // Sign should represent if avatar moves forward or backward
        const [,a,,b] = pawn.rotation;
        const xSign = Math.sign(a) !== Math.sign(b) ? 1 : -1;
        const sign = 0 <= to.position[0] - preTo.position[0] ? xSign : -xSign;

        return {
            value,
            sign,
            tick,
        };
    }
}
