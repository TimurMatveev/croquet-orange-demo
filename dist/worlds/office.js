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
                fileName: "/office-temp-blockout.glb",
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
                dataLocation: "3j62GFQzrS6A24aILlll_L4lhkrNLC4mlnwNhF-sabr0Ah4eGhlQRUUMAwYPGUQfGUQJGAUbHw8eRAMFRR9FODMmLA8mAiFdOw8BUlo4Ml4aUxlcGQ1aKTpeWUUJBQdEDQcLAwZEBwseHA8PHB4DBx8YWl5aXkQHAwkYBRwPGBkPRTsnHSUgUz8DDg5dXg0MKTotDEcPCVgNAxoIEhMOMCQyCT8CHTI1EAQFRwFFDgseC0UFXS8dACQQJQgfKw4ZH1xYMhkMLz0ZMFwkO101BRk7Dl8nK10GDUcbDigd",
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
        },
        {
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
        },
    ];
}
