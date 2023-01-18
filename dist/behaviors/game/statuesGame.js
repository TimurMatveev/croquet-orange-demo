class StatuesGameActor {
    setup() {
        this.teardown();

        this.startTime = 0;
        this.playerIds = [];

        this.inProgress = false;
        this.playerManager = this.service("PlayerManager");

        this.listen("StatuesGameIntruderLose", "onStatuesGameIntruderLose");

        this.subscribe(this.getScope(), "StartPressed", "onStart");
    }

    getScope() {
        return this._cardData.statuesGame.scope || "global";
    }

    onBoundBoxAvatarColliderChange(event) {
        if (event.name !== this.name || !event.current.length) {
            return;
        }

        this.onPlayersFinished(event.current, (this.now() - this.startTime) / 1000);
    }

    onStart(avatarIds) {
        if (this.inProgress) {
            return;
        }

        this.startTime = this.now();
        this.playerIds = [...avatarIds];
        this.winners = [];
        this.losers = [];
        this.intruderIds = [];

        this.listen("boundBoxAvatarColliderChange", "onBoundBoxAvatarColliderChange");

        this.publish(this.getScope(), "StatuesGameStarted", {playerIds: this.playerIds});
        this.publish(this.getScope(), "PlayButtonHidden", true);

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

        this.publish(this.getScope(), "StatuesGameStateChange", { state: "go" });
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
            this.publish(this.getScope(), "StatuesGameStateChange", { state: "countdown", value });
            this.future(ms).countdown(ms, value - 1);
        } else {
            this.publish(this.getScope(), "StatuesGameStateChange", { state: "stop" });

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

        this.publish(this.getScope(), "StatuesGameInspectorChange", { state: "toPlayers", time: this._cardData.statuesGame.delay });
    }

    publishInspectorFromPlayers() {
        if (!this.inProgress) {
            return;
        }

        this.publish(this.getScope(), "StatuesGameInspectorChange", { state: "fromPlayers", time: 1000 });
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

        const avatars = this.playerIds.map((playerId) => this.playerManager.players.get(playerId));

        const intruderIds = avatars
            .filter((avatar) => (avatar?.speedometer.speed.value || 0) > this._cardData.statuesGame.speedThreshold)
            .map((player) => player.playerId)
            .filter((id) => !this.intruderIds.includes(id));

        this.intruderIds = [...this.intruderIds, ...intruderIds];

        if (intruderIds.length) {
            this.say("StatuesGameCheckIntruders", intruderIds);
        }

        if (!this.playerIds.length) {
            this.finishGame([]);
        }

        if (!this.inProgress) {
            return;
        }

        this.future(50).watchPlayersMoving();
    }

    stopWatchPlayersMoving() {
        this.isWatching = false;
        this.intruderIds = [];
    }

    onStatuesGameIntruderLose(intruderId) {
        const index = this.playerIds.findIndex(playerId => playerId === intruderId);

        if (index === -1) {
            return;
        }

        this.losers = [...this.losers, ...this.playerIds.splice(index, 1).map(playerId => ({ playerId }))];

        if (!this.playerIds.length) {
            this.finishGame();
        }

        this.publish(this.getScope(), "StatuesGamePlayerLose", intruderId);
    }

    onPlayersFinished(finishedIds, time) {
        const realFinishedIds = finishedIds.filter((playerId) => this.playerIds.includes(playerId));

        const winners = realFinishedIds.map(playerId => ({ playerId, time }));
        this.winners = [...this.winners, ...winners];

        this.publish(this.getScope(), "StatuesGamePlayersWin", winners);

        this.playerIds = this.playerIds.filter(playerId => !realFinishedIds.includes(playerId));

        if (!this.playerIds.length) {
            this.finishGame();
        }
    }

    finishGame() {
        if (!this.inProgress) {
            return;
        }

        this.inProgress = false;

        this.unsubscribe(this.id, "boundBoxAvatarColliderChange", "onBoundBoxAvatarColliderChange");
        this.publish(this.getScope(), "StatuesGameInspectorChange", { state: "fromPlayers", time: 1000 });

        this.future(1000).showResults();
    }

    showResults() {
        this.publish(this.getScope(), "StatuesGameFinished", [...this.winners, ...this.losers]);
        this.publish(this.getScope(), "PlayButtonHidden", false);
    }

    teardown() {

    }
}

class StatuesGamePawn {
    setup() {
        this.playerManager = this.actor.service("PlayerManager");

        this.listen("StatuesGameCheckIntruders", "onStatuesGameCheckIntruders");

        this.subscribe(this.getScope(), "StatuesGamePlayersWin", "onStatuesGamePlayersWin");
        this.subscribe(this.getScope(), "StatuesGameFinished", "onStatuesGameFinished");
        this.subscribe(this.getScope(), "StatuesGamePlayerKilled", "onStatuesGamePlayerKilled");
    }

    onStatuesGameCheckIntruders(intruderIds) {
        const myId = this.getMyId();

        if (intruderIds.includes(myId)) {
            this.say("StatuesGameIntruderLose", myId);
        }
    }

    onStatuesGamePlayerKilled(playerId) {
        if (this.getMyId() === playerId) {
            window.parent.notie.alert({
                type: "error",
                text: "You lose. Try again.",
                time: 5,
            });
        }
    }

    onStatuesGamePlayersWin(winners) {
        const myId = this.getMyId();

        const myWinner = winners.find(({ playerId }) => playerId === myId);

        if (myWinner) {
            window.parent.notie.alert({
                type: "success",
                text: `You win. Time ${myWinner.time.toFixed(2)}`,
                time: 5,
            });
        }
    }

    onStatuesGameFinished(players) {
        const myId = this.getMyId();

        if (players.some(({ playerId }) => playerId === myId)) {
            const avatars = players.map(({ playerId, time }) => ({
                player: this.playerManager.players.get(playerId),
                time,
            }));

            const text = `
            STATUES GAME OVER
    
            ${
                avatars
                    .map((avatar, index) => `${index + 1}.  ${avatar.player.name}  |  ${ avatar.time ? "WIN" : "LOSE" }  |  ${avatar.time?.toFixed(2) || "--.--"}`)
                    .join("\n")
            }
            `;

            window.parent.notie.force({
                text,
                position: "bottom",
            });
        }
    }

    getMyId() {
        return this.getMyAvatar().actor.playerId;
    }

    getScope() {
        return this.actor._cardData.statuesGame.scope || "global";
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
