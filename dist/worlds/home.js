export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite",
        "madhatter",
        "marchhare",
        "queenofhearts",
        "cheshirecat",
        "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/home";
    Constants.UserBehaviorModules = [
        // "demo.js",
        "lights.js",
        // "bouncingBall.js",
        // "bitcoinTracker.js",
        // "spin.js",
        "officePortal.js",
        // "urlLink.js",
        // "text3D.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                // same position and orientation as in openPortal.js
                translation: [0.6, 1.6, -6.3],
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
                dataLocation: "3eAFdcF7mtjZ_GT6GvvYycK5RTrkBc4-I72IHGNevBDwDRERFRZfSkoDDAkAFksQFksGFwoUEAARSwwKShBKNzwpIwApDS5SNAAOXVU3PVEVXBZTFgJVJjVRVkoGCghLAggEDAlLCAQREwAAExEMCBAXVVFVUUsIDAYXChMAFxYASgAfJAQHESwHDTErHSwNLBwcUVE_NClcARYHKFMiUxI9UFcOVgoNVh0xEQZKAQQRBEo_IFIsPRETDggkHw8IPx8XCDFdJgk2UlQLDxISVBM8J1M8KxcsPCcHPysK",
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
                translation: [0.6, 3.1, -6.2],
                behaviorModules: ["OfficePortalButton"],
                type: "object",
            }
        },
    ];
}
