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
        "common/boundAvatarCollider.js",
        "common/platformPortal.js",
        "home/lights.js",
        "default/video.js",
        "common/lightSwitch.js",
        "common/lightLamp.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                // same position and orientation as in openPortal.js
                translation: [-0.15, 1.6, 0],
                rotation: [0, Math.PI, 0],
                spawn: "default",
            }
        },
        {
            card: {
                name: "home",
                type: "3d",
                singleSided: true,
                shadow: true,
                layers: ["walk"],
                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],
                translation: [0, 0, 0],
                rotation: [0, 0, 0],
                dataScale:[1,1,1],
                fileName: "/Area_House.glb",
                modelType: "glb",
                isWorld: true,
                dataLocation: "3TPVrfYXa75ffoM6bFjB-qr2N6OWLL7ABHvVh9g5XpvMPCAgJCdue3syPTgxJ3ohJ3o3JjslITEgej07eyF7Bg0YEjEYPB9jBTE_bGQGDGAkbSdiJzNkFwRgZ3s3Ozl6Mzk1PTh6OTUgIjExIiA9OSEmZGBkYHo5PTcmOyIxJicxezIkAzskJBBgMThmODIlLBgmFx8dPyUBAwVlYDkSBmY5JiAmLTgyEzdgZx17MDUgNXs4HRlmNSwDHj0fED8HI2wQMhkcIR04ZWwiIjAsDTowPSEuYAFgGw48Dhg3",
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
                name: "home to office portal button",
                behaviorModules: ["BoundAvatarCollider", "PlatformPortalActor"],
                type: "object",
                translation: [-0.15, 0.1, -2.6],
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
                    name: "home to office portal",
                    translation: [-0.15, 1.6, -3.5],
                    rotation: [0, Math.PI, 0],
                    layers: ["pointer"],
                    className: "PortalActor",
                    color: 16737996,
                    cornerRadius: 0.05,
                    depth: 0.05,
                    frameColor: 8947848,
                    portalURL: "?world=office",
                    type: "2d",
                    width: 2.8,
                    height: 2.6,
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
                name: "home to park portal button",
                behaviorModules: ["BoundAvatarCollider", "PlatformPortalActor"],
                type: "object",
                translation: [-8.88, 0.1, -2.6],
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
                    name: "home to park portal",
                    translation: [-8.88, 1.6, -3.5],
                    rotation: [0, Math.PI, 0],
                    layers: ["pointer"],
                    className: "PortalActor",
                    color: 16737996,
                    cornerRadius: 0.05,
                    depth: 0.05,
                    frameColor: 8947848,
                    portalURL: "?world=park",
                    type: "2d",
                    width: 2.8,
                    height: 2.6,
                    permissions: ["location.park"],
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
                type: "2d",
                rotation: [
                    0,
                    -1,
                    0,
                    -0
                ],
                translation: [-4.2837216501167426, 2.500142101961323, 14.475702336946458],
                scale: [3.9555802212023234, 3.1644641769618587, 2.373348132721394],
                width: 4,
                height: 2,
                fullBright: true,
                behaviorModules: ["VideoPlayer"],
                textureLocation: "./assets/video/intro.mp4",
                textureWidth: 4096,
                textureHeight: 2048,
                textureType: "video",
                step: 1.5,
                permissions: ["action.tv"],
            }
        },
        {
            card: {
                translation: [-4.077029560505512, 5.476805092001461, 10.067965348557347],
                rotation: [0, 0, 0, -1],
                behaviorModules: ['lightLamp'],
                layers: ["pointer"],
                name: "home light",
                dataLocation: "./assets/3D/SM_CellingLamp.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"badRoomLight",
                isTurnOnInitialy: true
            }
        },
        {
            card: {
                translation: [3.6972327546616874, 1.7283034220074693, 5.645000478768717],
                rotation: [0, -0.7152033225839578, 0, 0.6989164523495403],
                behaviorModules: ["lightSwitchButton"],
                layers: ["pointer"],
                name: "light switcher",
                dataLocation: "./assets/3D/SM_LightSwitch.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"badRoomLight",
                isTurnOnInitialy: true
            }
        }
    ];
}
