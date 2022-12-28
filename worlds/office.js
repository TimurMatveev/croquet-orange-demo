export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite",
        "madhatter",
        "marchhare",
        "queenofhearts",
        "cheshirecat",
        "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/office";
    Constants.UserBehaviorModules = [
        "lights.js",
        "homePortal.js",
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                // same position and orientation as in openPortal.js
                translation: [0, 1.6, -2.4],
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
                dataLocation: "3kKAhvaPHlbNe-unbdUETfGIbSgLX-gewPY5BbYwAw9EAx8fGxhRREQNAgcOGEUeGEUIGQQaHg4fRQIERB5EOTInLQ4nAyBcOg4AU1s5M18bUhhdGAxbKDtfWEQIBAZFDAYKAgdFBgofHQ4OHR8CBh4ZW19bX0UGAggZBB0OGRgORAYtEhI_HF4vLFpfXUY5DhsEHC9aWzIYIApGDiMELzstAiIvES8NLloKCQBEDwofCkQ8WD4qIQhGIz0HLzo0GDwHCAQEKjsKRho9BCwsMwI8Oz4jWD1cAi8POggE",
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
                name: "home portal button",
                behaviorModules: ["HomePortalButton"],
                type: "object",
                translation: [0, 2.67, -2.27],
                layers: ["pointer"],
            }
        },
    ];
}
