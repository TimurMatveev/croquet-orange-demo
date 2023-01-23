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
        "office/lights.js",
        "default/replaceWorld.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                // same position and orientation as in openPortal.js
                translation: [0, 1.6, 0],
                rotation: [0, Math.PI, 0],
                spawn: "default",
            }
        },
        {
            card: {
                name: "office",
                type: "3d",
                singleSided: true,
                shadow: true,
                layers: ["walk"],
                translation: [0, 0, 0],
                dataScale: [1, 1, 1],
                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],
                rotation: [0, 0, 0],
                modelType: "glb",
                isWorld: true,
                dataLocation: "3oTiSzkNlcwqiV_Eh0zwnZme8Rce8sobtoxGdI8axIQUBxsbHxxVQEAJBgMKHEEaHEEMHQAeGgobQQYAQBpAPTYjKQojByRYPgoEV189N1sfVhxZHAhfLD9bXEAMAAJBCAIOBgNBAg4bGQoKGRsGAhodX1tfW0ECBgwdABkKHRwKQDAkDj88CTUHOTkNAA46Hhw3O1pWOTgWVycuAT04BjxdHyBZAD4JIgoIPhhACw4bDkArPwIdB182GR8BKB86QlYjWxpcNSogFR1bPC1WNhUlJSxcID9YMC4KFi4u",
                fileName: "/Area_Office.glb",
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
       /* {
            card: {
                name: "office to home portal button",
                behaviorModules: ["BoundAvatarCollider", "PlatformPortalActor"],
                type: "object",
                translation: [0, 0.1, -2.7],
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
                    name: "office to home portal",
                    translation: [0, 1.3, -3.6],
                    rotation: [0, Math.PI, 0],
                    layers: ["pointer"],
                    className: "PortalActor",
                    color: 16737996,
                    cornerRadius: 0.05,
                    depth: 0.05,
                    frameColor: 8947848,
                    portalURL: "?world=home",
                    type: "2d",
                    width: 1.8,
                    height: 2.4,
                },
                boundAvatarCollider: {
                    tick: 100,
                    type: 'box',
                    distance: 0.6,
                    setup: [ [-1.5, 0, -0.8], [1.5, 4, 0.8] ],
                    once: true,
                },
            }
        },*/
        /*{
            card: {
                name: "office to park portal button",
                behaviorModules: ["BoundAvatarCollider", "PlatformPortalActor"],
                type: "object",
                translation: [-1.4, 0.1, 11.85],
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
                    name: "office to park portal",
                    translation: [-2.175, 1.36, 11.85],
                    rotation: [0, -Math.PI / 2, 0],
                    layers: ["pointer"],
                    className: "PortalActor",
                    color: 16737996,
                    cornerRadius: 0.05,
                    depth: 0.05,
                    frameColor: 8947848,
                    portalURL: "?world=park",
                    type: "2d",
                    width: 2.3,
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
        },*/
        {
            card: {
                name: "office to home img portal",
                behaviorModules: ["ReplaceWorld"],
                replaceWorldTargetURL: "/?world=home",
                //replaceWorldPreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                rotation: [0, 2*Math.PI, 0],
                layers: ["pointer"],
                translation: [0, 1.3829947900984176, -3.8231034746138968],
                scale: [2.7201816100252265, 4.283723228296544, 4.283723228296544],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/home-bg.png",
                fullBright: true,
                frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0,
                depth: 0.01,
                shadow: true,
                permissions: ["location.home"],
            }
        },
        {
            card: {
                name: "office to park img portal",
                behaviorModules: ["ReplaceWorld"],
                replaceWorldTargetURL: "/?world=park",
                //replaceWorldPreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                rotation: [0, Math.PI/2, 0],
                layers: ["pointer"],
                translation: [-2.3462180352332984, 1.3829947900984176, 11.875755569629419],
                scale: [2.301816100252265, 4.283723228296544, 4.283723228296544],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/park-bg.png",
                fullBright: true,
                frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0,
                depth: 0.01,
                shadow: true,
                permissions: ["location.park"],
            }
        },
    ];
}
