// tutorial1.js
// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors";
    Constants.UserBehaviorModules = [
        "game/lights.js",
        "game/gridFloor.js",
        "common/boundAvatarCollider.js",
        "common/platformActionTrigger.js",
        "game/playButton.js",
        "game/statuesGame.js",
        "game/statuesGameCounter.js",
        "game/statuesGameInspector.js",
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                // same position and orientation as in openPortal.js
                translation: [38, 0.2, 48],
                rotation: [0, -Math.PI / 2, 0],
                spawn: "default",
            }
        },
        {
            card: {
                name: "world model",
                behaviorModules: ["GridFloor"],
                layers: ["walk"],
                type: "object",
                translation:[0, -1.5, 0],
                shadow: true,
                isWorld: true,
            },
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                clearColor: 0xaabbff,
            },
        },
        {
            card: {
                name: "statues game players collector",
                layers: ["walk"],
                type: "object",
                behaviorModules: ["BoundAvatarCollider", "PlatformActionTrigger"],
                translation: [45, -1.5, 48],
                shadow: true,
                platform: {
                    box: [10, 0.2, 4],
                    material: { color: 0x777777 },
                    scope: "ParkStatuesGame",
                },
                boundAvatarCollider: {
                    tick: 100,
                    type: 'box',
                    distance: 0.2,
                    setup: [ [-5, 0, -2], [5, 2, 2] ],
                },
            },
        },
        {
            card: {
                name: "statues game start trigger",
                layers: ["pointer"],
                behaviorModules: ["PlayButton"],
                type: "object",
                shadow: true,
                playScope: "ParkStatuesGame",
                gameName: "'STATUES GAME'",
                translation: [45, 1.5, 44],
            },
        },
        {
            card: {
                name: "statues game",
                layers: ["pointer"],
                behaviorModules: ["BoundAvatarCollider", "StatuesGame"],
                type: "object",
                shadow: false,
                gameName: "'STATUES GAME'",
                translation: [45, -1.5, -47],
                boundAvatarCollider: {
                    tick: 20,
                    type: 'box',
                    distance: 0.4,
                    setup: [ [-5, 0, -3], [5, 2, 3] ],
                    ghost: true,
                },
                statuesGame: {
                    delay: 2400,
                    maxRunTime: 4000,
                    minRunTime: 2000,
                    maxStopTime: 5000,
                    minStopTime: 4000,
                    speedThreshold: 0.05,
                    scope: "ParkStatuesGame",
                },
            },
        },
        {
            card: {
                name: "statues game counter",
                layers: ["pointer"],
                behaviorModules: ["StatuesGameCounter"],
                type: "object",
                shadow: true,
                gameScope: "ParkStatuesGame",
                translation: [45, 2, -50],
                scale: [10, 10, 10],
            },
        },
        {
            card: {
                name: "statues game inspector",
                layers: ["pointer"],
                behaviorModules: ["StatuesGameInspector"],
                shadow: true,
                gameScope: "ParkStatuesGame",
                translation: [45, -2.4, -50],
                rotation: [0, Math.PI, 0],
                scale: [8, 8, 8],
                dataLocation: "35hI1OQ1NaqWki0Or-uHXAVM9vipZGVZIc_emQwLfCAcXUFBRUYPGhpTXFlQRhtARhtWR1pEQFBBG1xaGkAaT2BBQmV6T3NAemYEflxSeG9cAAYMTXNxcg0FBxpcWhtWR1pEQFBBG1hcVkdaQ1BHRlAbQ1RbUEZGVBpebAd3ZwBkYVEEZVICWAB7YkdiYm9xc09BXHNRcE1qf3hEdlZEfFFzRGAFGlFUQVQabV1-bFdNZAdnBAxCfnAYXk9kamVaAUVbBnt3QUBaWwUEfnhPb1RWfhhqDQ",
                fileName: "/Auggie2.glb",
                modelType: "glb",
                license: "CC-BY",
                singleSided: true,
                type: "3d",
            },
        },
    ];
}
