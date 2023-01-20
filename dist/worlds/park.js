export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite",
        "madhatter",
        "marchhare",
        "queenofhearts",
        "cheshirecat",
        "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors";
    Constants.UserBehaviorModules = [
        "office/lights.js",
        "common/boundAvatarCollider.js",
        "common/platformPortal.js",
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
                translation: [5, 1.6, 0],
                rotation: [0, -Math.PI / 2, 0],
                spawn: "default",
            }
        },
        {
            card: {
                name: "park",
                translation: [0, 0, 0],
                rotation: [0, 0, 0],
                dataLocation: "3FQ132_92ZCGh4L2z7ZJGTkAcKSO-EPSklpEU8JUdaJgLjIyNjV8aWkgLyojNWgzNWglNCk3MyMyaC8paTNpFB8KACMKLg1xFyMtfnYUHnI2fzVwNSF2BRZydWklKStoISsnLypoKycyMCMjMDIvKzM0dnJ2cmgrLyU0KTAjNDUjaXALdQQzAjY_FAoFawhrKSt0LAENMBQgLCABDSoiA3R2HB8Ecy8oHzULFwNpIicyJ2kQDBE-JH4QdgwNdn88IQA1dhA-M38ZJyByIWsiEh4nMS52EX8QMRQrDi4h",
                dataScale: [1, 1, 1],
                fileName: "/Area_Garden.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                layers: ["walk"],
                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],
                type: "3d",
                isWorld: true,
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                fileName: "/shanghai_riverside_2k.exr",
                dataLocation: "32nxXNZxuyT3h-bh0OX-2uMdBRJ0WmDduuTJwwewEE60WkZGQkEIHR1UW15XQRxHQRxRQF1DR1dGHFtdHUcddVZkUEtee0FzWWNRcGpWAXVKU0RLRWd5ZWtrAB1bXRxRQF1DR1dGHF9bUUBdRFdAQVcdAH9ae3ZoZVdYW1FVZgNDBVZ9SAR2R1lgalt_cAMfW1h5cXYAfGtWX3lQex1WU0ZTHXVreUhtUEFeU218aAYDRVxqAHB_Rn5YZmFFZWsAZERtWHF_WkIGZEtRdnM",
                dataType: "exr",
            }
        },
        {
            card: {
                name: "park to office portal button",
                behaviorModules: ["BoundAvatarCollider", "PlatformPortalActor"],
                type: "object",
                translation: [0, 0, 0],
                rotation: [0, Math.PI / 2, 0],
                layers: ["walk"],
                shadow: true,
                platformButton: {
                    box: [3, 0.04, 1.6],
                    material: {
                        default: {color: 0xffffff, metalness: 0.8},
                        opened: {color: 0xcccccc, metalness: 0.8},
                        disabled: {color: 0x111111, metalness: 0.8},
                    },
                },
                portalCard: {
                    name: "park to office portal",
                    translation: [-1.2, 1.3, 0],
                    rotation: [0, -Math.PI / 2, 0],
                    layers: ["pointer"],
                    className: "PortalActor",
                    color: 16737996,
                    cornerRadius: 0.05,
                    depth: 0.05,
                    frameColor: 8947848,
                    portalURL: "?world=office",
                    type: "2d",
                    width: 1.6,
                    height: 2.4,
                    permissions: ["location.office"],
                },
                boundAvatarCollider: {
                    tick: 100,
                    type: 'box',
                    distance: 0.6,
                    setup: [ [-1.5, 0, -0.8], [1.5, 4, 0.8] ],
                    once: true,
                },
            }
        },
        {
            card: {
                name: "park to home portal button",
                behaviorModules: ["BoundAvatarCollider", "PlatformPortalActor"],
                type: "object",
                translation: [0, 0, -5],
                rotation: [0, Math.PI / 2, 0],
                layers: ["walk"],
                shadow: true,
                platformButton: {
                    box: [3, 0.04, 1.6],
                    material: {
                        default: {color: 0xffffff, metalness: 0.8},
                        opened: {color: 0xcccccc, metalness: 0.8},
                        disabled: {color: 0x111111, metalness: 0.8},
                    },
                },
                portalCard: {
                    name: "park to home portal",
                    translation: [-1.2, 1.3, -5],
                    rotation: [0, -Math.PI / 2, 0],
                    layers: ["pointer"],
                    className: "PortalActor",
                    color: 16737996,
                    cornerRadius: 0.05,
                    depth: 0.05,
                    frameColor: 8947848,
                    portalURL: "?world=home",
                    type: "2d",
                    width: 1.6,
                    height: 2.4,
                    permissions: ["location.home"],
                },
                boundAvatarCollider: {
                    tick: 100,
                    type: 'box',
                    distance: 0.6,
                    setup: [ [-1.5, 0, -0.8], [1.5, 4, 0.8] ],
                    once: true,
                },
            }
        },
        {
            card: {
                name: "park to office portal button",
                behaviorModules: ["BoundAvatarCollider", "PlatformPortalActor"],
                type: "object",
                translation: [0, 0, 0],
                rotation: [0, Math.PI / 2, 0],
                layers: ["walk"],
                shadow: true,
                platformButton: {
                    box: [3, 0.04, 1.6],
                    material: {
                        default: {color: 0xffffff, metalness: 0.8},
                        opened: {color: 0xcccccc, metalness: 0.8},
                        disabled: {color: 0x111111, metalness: 0.8},
                    },
                },
                portalCard: {
                    name: "park to office portal",
                    translation: [-1.2, 1.3, 0],
                    rotation: [0, -Math.PI / 2, 0],
                    layers: ["pointer"],
                    className: "PortalActor",
                    color: 16737996,
                    cornerRadius: 0.05,
                    depth: 0.05,
                    frameColor: 8947848,
                    portalURL: "?world=office",
                    type: "2d",
                    width: 1.6,
                    height: 2.4,
                    permissions: ["location.office"],
                },
                boundAvatarCollider: {
                    tick: 100,
                    type: 'box',
                    distance: 0.6,
                    setup: [ [-1.5, 0, -0.8], [1.5, 4, 0.8] ],
                    once: true,
                },
            }
        },
        {
            card: {
                name: "statues game players collector",
                layers: ["walk"],
                type: "object",
                behaviorModules: ["BoundAvatarCollider", "PlatformActionTrigger"],
                translation: [32.2, 0, -20.4],
                shadow: true,
                platform: {
                    box: [4, 0.2, 12],
                    material: { color: 0xFF8888 },
                    scope: "ParkStatuesGame",
                },
                boundAvatarCollider: {
                    tick: 100,
                    type: 'box',
                    distance: 0.2,
                    setup: [ [-2, 0, -6], [2, 2, 6] ],
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
                translation: [40, 3, -20.4],
                rotation: [0, -Math.PI / 2, 0],
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
                translation: [233, 0, -20.4],
                boundAvatarCollider: {
                    tick: 20,
                    type: 'box',
                    distance: 0.4,
                    setup: [ [-3, 0, -6], [3, 2, 6] ],
                },
                statuesGame: {
                    delay: 2400,
                    maxRunTime: 4000,
                    minRunTime: 2000,
                    maxStopTime: 5000,
                    minStopTime: 4000,
                    speedThreshold: 0.2,
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
                translation: [236, 4, -20.4],
                rotation: [0, -Math.PI / 2, 0],
                scale: [20, 20, 20],
            },
        },
        {
            card: {
                name: "statues game inspector",
                layers: ["pointer"],
                behaviorModules: ["StatuesGameInspector"],
                shadow: true,
                gameScope: "ParkStatuesGame",
                translation: [234, 0, -20.4],
                rotation: [0, Math.PI / 2, 0],
                scale: [8, 8, 8],
                dataLocation: "35hI1OQ1NaqWki0Or-uHXAVM9vipZGVZIc_emQwLfCAcXUFBRUYPGhpTXFlQRhtARhtWR1pEQFBBG1xaGkAaT2BBQmV6T3NAemYEflxSeG9cAAYMTXNxcg0FBxpcWhtWR1pEQFBBG1hcVkdaQ1BHRlAbQ1RbUEZGVBpebAd3ZwBkYVEEZVICWAB7YkdiYm9xc09BXHNRcE1qf3hEdlZEfFFzRGAFGlFUQVQabV1-bFdNZAdnBAxCfnAYXk9kamVaAUVbBnt3QUBaWwUEfnhPb1RWfhhqDQ",
                fileName: "/Auggie2.glb",
                modelType: "glb",
                license: "CC-BY",
                singleSided: true,
                type: "3d",
                inspector: {
                    bulletSpeed: 200,
                    fromPlayersAngle: 0,
                    toPlayersAngle: -Math.PI,
                },
            },
        },
    ];
}
