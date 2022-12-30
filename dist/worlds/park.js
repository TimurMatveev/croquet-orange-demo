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
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                // same position and orientation as in openPortal.js
                translation: [0, 1, 0],
                rotation: [0, -Math.PI / 2, 0],
                spawn: "default",
            }
        },
        {
            card: {
                name: "park",
                translation: [0, 0, 0],
                rotation: [0, 0, 0],
                dataLocation: "3KBNTGfcWpE0XqBChaqREsF37IO5CdKA59EVCXOhEZFoIz8_OzhxZGQtIicuOGU-OGUoOSQ6Pi4_ZSIkZD5kGRIHDS4HIwB8Gi4gc3sZE387cjh9OCx7CBt_eGQoJCZlLCYqIidlJio_PS4uPT8iJj45e397f2UmIig5JD0uOTguZCl7GicpCjMEAwMqHztmJR4eJD58GgIaJiUfGTgbDw8SPQ4vAgh4M3weEyxkLyo_KmQZPmYkBjEBInI9AiI7IS0vFC4zIXgmAxR6ZnI8OyImDg1-GnggJyEMfw8S",
                dataScale: [1, 1, 1],
                fileName: "/Area_Garden_blockout.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                layers: ["walk"],
                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, 0, 0],
                type: "3d",
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
    ];
}
