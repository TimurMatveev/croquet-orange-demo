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
                dataLocation: "3o1GAwt1oBVNBNIU3Jw5BfAk-D6aidHEt1iL226qKnecBxsbHxxVQEAJBgMKHEEaHEEMHQAeGgobQQYAQBpAPTYjKQojByRYPgoEV189N1sfVhxZHAhfLD9bXEAMAAJBCAIOBgNBAg4bGQoKGRsGAhodX1tfW0ECBgwdABkKHRwKQC4jAgcNABg8Px4NHR4mW1dCKBpfXzw9DSMgJgkNCAIWPyg-OBUuKQJWJFdACw4bDkAOIDYAOlg-OChWIl8gOR8IFiItXSMALVo8ATArJDwqIx08BSpXOhsCAQcM",
                fileName: "/house01-temp-blockout.glb",
                modelType: "glb",
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
                "translation": [
                    -4.32401861650581,
                    2.5398132389469135,
                    14.475702336946458
                ],
                "rotation": [
                    0,
                    -1,
                    0,
                    -0
                ],
                scale: [5, 4, 3],
                width: 4,
                height: 2,
                fullBright: true,
                behaviorModules: ["VideoPlayer"],
                textureLocation: "./assets/video/intro.mp4",
                textureWidth: 4096,
                textureHeight: 2048,
                textureType: "video",
                step: 1.5
            }
        },
    ];
}
