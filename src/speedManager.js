import {ViewService} from "@croquet/worldcore-kernel";

// class LinkedList {};

export class SpeedManager extends ViewService {
    constructor(name) {
        super(name || "SpeedManager");
        this._objects = {};
    }

    destroy() {
        super.destroy();
        this._objects = {};
    }

    /*
     * @param "object": 3d object with translation and rotation properties changing during time
     * @param "options":
     *      {
     *          maxSnapshots: number;
     *      }
     */
    watch(id, object, options = {}) {
        this._objects[id] = {
            object,
            options: {
                maxSnapshots: 16,
                ...options,
            },
            snapshots: [],
            speed: {
                value: 0,
                sign: 1,
                tick: 0,
            },
        };
    }

    dispose(id) {
        delete this._objects[id];
    }

    update(time, tick) {
        Object.values(this._objects).forEach((config) => {
            config.speed = this._calcSpeed(config, time, tick);
        });
    }

    getSpeed(id) {
        return this._objects[id]?.speed || {
            value: 0,
            sign: 1,
            tick: 0,
        };
    }

    _calcSpeed(config, time, tick) {
        if (config.snapshots.length >= config.options.maxSnapshots) {
            config.snapshots.shift();
        }

        config.snapshots.push({
            position: [...config.object.translation],
            // time: performance.now(),
            time,
        });

        const from = config.snapshots.at(0);
        const to = config.snapshots.at(-1);
        const preTo = config.snapshots.at(-2) || from;
        // const tick = to.time - preTo.time;

        if (from.position[0] === to.position[0] &&
            from.position[1] === to.position[1] &&
            from.position[2] === to.position[2]
        ) {
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

        const value = distance / (to.time - from.time) * 1000;

        // Sign should represent if avatar moves forward or backward
        const [,a,,b] = config.object.rotation;
        const xSign = Math.sign(a) !== Math.sign(b) ? 1 : -1;
        const sign = 0 <= to.position[0] - preTo.position[0] ? xSign : -xSign;

        return {
            value,
            sign,
            tick,
        };
    }
}
