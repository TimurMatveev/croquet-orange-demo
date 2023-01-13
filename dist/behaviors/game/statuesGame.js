class StatuesGameActor {
    setup() {
        this.clock = new Microverse.THREE.Clock();
        this.players = [];

        this.inProgress = false;
        this.playerManager = this.service("PlayerManager");

        this.subscribe(this.getKey(), "PlayButtonStart", "onStart");
        this.addEventListener("pointerTap", "pressed");
    }

    getKey() {
        return this._cardData.gameKey;
    }

    onBoundBoxAvatarColliderChange(event) {
        if (event.name !== this.name) {
            return;
        }

        const playersMap = this.playerManager.players;
        const avatars = event.current.map((id) => playersMap.get(id));
        this.onPlayersFinished(avatars, this.clock.getElapsedTime());
    }

    onStart(avatars) {
        if (this.inProgress) {
            return;
        }

        this.clock.start();
        this.players = avatars;
        this.winners = [];
        this.losers = [];

        this.listen("boundBoxAvatarColliderChange", "onBoundBoxAvatarColliderChange");

        this.publish(this.getKey(), "StatuesGameStarted", {players: this.players});
        this.publish(this.getKey(), "PlayButtonHidden", true);

        this.inProgress = true;

        this.startNewCycle();
    }

    startNewCycle() {
        if (!this.inProgress) {
            return;
        }

        this.stopWatchPlayersMoving();

        const { delay, maxRunTime, minRunTime  } = this._cardData.statuesGame;
        const cycleRunTime = minRunTime + Math.random() * (maxRunTime - minRunTime);
        const countdown = delay / 3;

        this.publish(this.getKey(), 'StatuesGameStateChange', { state: 'go' });
        this.future(cycleRunTime).countdown(countdown, 3);
    }

    countdown(ms, value) {
        if (!this.inProgress) {
            return;
        }

        if (value === 3) {
            this.publishInspectorToPlayers();
        }

        if (value) {
            this.publish(this.getKey(), 'StatuesGameStateChange', { state: 'countdown', value });
            this.future(ms).countdown(ms, value - 1);
        } else {
            this.publish(this.getKey(), 'StatuesGameStateChange', { state: 'stop' });

            this.watchPlayersMoving(true);

            const { maxStopTime, minStopTime } = this._cardData.statuesGame;
            const stopTime = minStopTime + Math.random() * (maxStopTime - minStopTime);

            this.future(stopTime - 500).publishInspectorFromPlayers();
            this.future(stopTime).startNewCycle();
        }
    }

    publishInspectorToPlayers() {
        if (!this.inProgress) {
            return;
        }

        this.publish(this.getKey(), 'StatuesGameInspectorChange', { state: 'toPlayers', time: this.getKey().delay });
    }

    publishInspectorFromPlayers() {
        if (!this.inProgress) {
            return;
        }

        this.publish(this.getKey(), 'StatuesGameInspectorChange', { state: 'fromPlayers', time: 1000 });
    }

    watchPlayersMoving(force) {
        if (!this.inProgress) {
            return;
        }

        if (force) {
            this.isWatching = true;
        }

        if (!this.isWatching) {
            return;
        }

        this.kickPlayers(this.players.filter((player) => player.speedValue.speed > this._cardData.statuesGame.speedThreshold));

        if (!this.players.length) {
            this.finishGame([]);
        }

        if (!this.inProgress) {
            return;
        }

        this.future(50).watchPlayersMoving();
    }

    stopWatchPlayersMoving() {
        this.isWatching = false;
    }

    kickPlayers(losers) {
        if (losers.length) {
            this.losers = [...this.losers, ...losers.map(player => ({player}))];
            this.players = this.players.filter(player => !losers.includes(player));
            this.say('StatuesGamePlayersLose', {players: losers.map((player) => ({ playerId: player.playerId }))});

            if (!this.players.length) {
                this.finishGame();
            }
        }
    }

    onPlayersFinished(winners, time) {
        if (winners.length) {
            this.winners = [...this.winners, ...winners.map(player => ({player, time}))];
            this.say('StatuesGamePlayersWin', {
                players: winners.map((player) => ({ playerId: player.playerId })),
                time,
            });

            this.players = this.players.filter(player => !winners.includes(player));

            if (!this.players.length) {
                this.finishGame();
            }
        }
    }

    finishGame() {
        if (!this.inProgress) {
            return;
        }

        this.inProgress = false;

        this.publish(this.getKey(), "StatuesGameFinished", {
            players: [...this.winners, ...this.losers].map(({player, time}) => ({
                playerId: player.playerId,
                name: player.name,
                time,
            })),
        });

        this.publish(this.getKey(), "PlayButtonHidden", false);

        this.unsubscribe(this.id, "boundBoxAvatarColliderChange", "onBoundBoxAvatarColliderChange");
    }
}

class StatuesGamePawn {
    setup() {
        this.listen('StatuesGamePlayersLose', 'onStatuesGamePlayersLose');
        this.listen('StatuesGamePlayersWin', 'onStatuesGamePlayersWin');
        this.subscribe(this.getKey(), 'StatuesGameFinished', 'onStatuesGameFinished');
    }

    onStatuesGamePlayersLose(event) {
        if (this.isEventForMe(event)) {
            window.parent.notie.alert({
                type: 'error',
                text: 'You lose. Try again.',
                time: 5,
            });
        }
    }

    onStatuesGamePlayersWin(event) {
        if (this.isEventForMe(event)) {
            window.parent.notie.alert({
                type: 'success',
                text: `You win. Time ${event.time.toFixed(2)}`,
                time: 5,
            });
        }
    }

    onStatuesGameFinished(event) {
        if (this.isEventForMe(event)) {
            const text = `
            STATUES GAME OVER
    
            ${
                event.players
                    .map(({name, time}, index) => `${index + 1}.  ${name}  |  ${ time ? 'WIN' : 'LOSE' }  |  ${time?.toFixed(2) || '--.--'}`)
                    .join('\n')
            }
            `;

            window.parent.notie.force({
                text,
                position: 'bottom',
            });
        }
    }

    isEventForMe(event) {
        const myId = this.getMyAvatar().actor.playerId;
        return event.players.some(({playerId}) => playerId === myId);
    }

    getKey() {
        return this.actor._cardData.gameKey;
    }
}

export default {
    modules: [
        {
            name: "StatuesGame",
            actorBehaviors: [StatuesGameActor],
            pawnBehaviors: [StatuesGamePawn],
        }
    ]
}
