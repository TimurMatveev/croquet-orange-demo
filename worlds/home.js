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
        "home/lights.js",
        // "bouncingBall.js",
        // "bitcoinTracker.js",
        // "spin.js",
        "home/officePortal.js",
        // "urlLink.js",
        // "text3D.js"
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
                name: "office portal button",
                behaviorModules: ["BoundAvatarCollider", "OfficePortalButton"],
                type: "object",
                translation: [-0.15, 0.1, -2.6],
                layers: ["walk"],
                shadow: true,
                boundAvatarCollider: {
                    tick: 100,
                    type: 'box',
                    setup: [ [-1.5, 0, -0.8], [1.5, 4, 0.8] ],
                    once: true,
                },
            }
        },
    ];
}
