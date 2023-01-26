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
        "default/replaceWorld.js",
        "common/clock.js",
        "common/lightLamp.js",
        "common/lightSwitch.js"
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
                dataLocation: "./assets/3D/AreaOfficeAssets/Area_Office.glb",
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
        {
            card: {     
                translation: [0.29703801679875474, 0.009136398013603997, 27.4608981906762],
                rotation: [0, -0.9920623751374665, 0, -0.1257467448350414],
                layers: ["pointer"],
                name: "chair",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_Chair002.glb",
                fileName: "/SM_Chair002.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [2.9848509083472683, 0.009136398013603997, 27.4608981906762],
                rotation: [0, -0.9922405988414158, 0, 0.12433259432195967],
                layers: ["pointer"],
                name: "chair",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_Chair002.glb",
                fileName: "/SM_Chair002.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [-2.398622117694, 0.009136398013603997, 27.75174311825301],
                rotation: [0, -0.7903040881542069, 0, -0.6127148180407815],
                layers: ["pointer"],
                name: "chair",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_Chair002.glb",
                fileName: "/SM_Chair002.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [8.648676162307043, 0.006565559364607232, 21.91333013531732],
                rotation: [0, -0.989388604026974, 0, 0.1452934624184994],
                layers: ["pointer"],
                name: "OrangeCube",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_OrangeCube.glb",
                fileName: "/SM_OrangeCube.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [8.662515957714566, 1.0242136166587792, 21.91333013531732],
                rotation: [0, -0.2694022640775942, 0, 0.9630277358985392],
                layers: ["pointer"],
                name: "OrangeCube",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_OrangeCube.glb",
                fileName: "/SM_OrangeCube.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [-3.2819069591577352, 0.012233548182525311, -0.4957232858110161],
                rotation: [0, 0.705755576177956, 0, 0.7084554091075327],
                dataScale: [0.5, 1, 0.5],
                layers: ["pointer"],
                name: "Table",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_Table003.glb",
                fileName: "/SM_Table003.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {  
                translation: [-4.2875619323777325, 0.011915243219937532, 1.80836813375425],
                rotation: [0, 0.999986660172338, 0, -0.005165218037358969],
                layers: ["pointer"],
                name: "SofaCorner",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_SofaCorner001.glb",
                fileName: "/SM_SofaCorner001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",            
            }
        },
        {
            card: {     
                translation: [-4.722441299295229, -0.014151443229004024, 3.190704750858114],
                rotation: [0, 0.19285530177086768, 0, 0.9812272074187852],
                layers: ["pointer"],
                name: "OrangeCube",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_OrangeCube.glb",
                fileName: "/SM_OrangeCube.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [-4.7918555564302245, 1.003174210352768, 3.1562280487563026],
                rotation: [0, -0.04535938296629494, 0, 0.998970733493688],
                layers: ["pointer"],
                name: "OrangeCube",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_OrangeCube.glb",
                fileName: "/SM_OrangeCube.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {  
                translation: [1.8475039093007974, 0.0003664854995015787, -3.4788529644297586],
                rotation: [0.009247652050364886, 0.04477237954053692, 0.01311149499815003, -0.9988683615275573],
                layers: ["pointer"],
                name: "TrashBin002",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_TrashBin002.glb",
                fileName: "/SM_TrashBin002.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",            
            }
        },
        {
            card: {  
                translation: [-1.8613796768308521, 0.0003664854995015787, -3.4788529644297586],
                rotation: [0.009247652050364886, 0.04477237954053692, 0.01311149499815003, -0.9988683615275573],
                layers: ["pointer"],
                name: "TrashBin002",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_TrashBin002.glb",
                fileName: "/SM_TrashBin002.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",            
            }
        },
        {
            card: {  
                translation: [-9.20944401249121, 0.0003664854995015787, 21.33471426721254],
                rotation: [0.009247652050364886, 0.04477237954053692, 0.01311149499815003, -0.9988683615275573],
                layers: ["pointer"],
                name: "TrashBin002",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_TrashBin002.glb",
                fileName: "/SM_TrashBin002.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",            
            }
        },
        {
            card: {
                translation: [6.306222769258454, 2.3537691447078197, 1.4135593797608876],
                rotation: [0, 0.7069032632064396, 0, -0.7073102406073922],
                behaviorModules: ["Clock"],
                isRealTimeClock: true,
                //startHour: 9,        // only for not realTime clock
                //clockPeriodTime: 12, // min, only for not realTime clock
                zoneGMT: 0,        // for realTime clock
                layers: ["pointer"],
                name: "clock London",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [6.306222769258454, 2.3537691447078197, 2.323001486637799],
                rotation: [0, 0.7069032632064396, 0, -0.7073102406073922],
                behaviorModules: ["Clock"],
                isRealTimeClock: true,
                //startHour: 9,        // only for not realTime clock
                //clockPeriodTime: 12, // min, only for not realTime clock
                zoneGMT: 1,        // for realTime clock
                layers: ["pointer"],
                name: "clock Paris",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [6.306222769258454, 2.3537691447078197, 3.1932459295688917],
                rotation: [0, 0.7069032632064396, 0, -0.7073102406073922],
                behaviorModules: ["Clock"],
                isRealTimeClock: true,
                //startHour: 9,        // only for not realTime clock
                //clockPeriodTime: 12, // min, only for not realTime clock
                zoneGMT: -8,        // for realTime clock
                layers: ["pointer"],
                name: "clock LA",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [6.306222769258454, 2.3537691447078197, -1.1162298338928138],
                rotation: [0, 0.7069032632064396, 0, -0.7073102406073922],
                behaviorModules: ["Clock"],
                isRealTimeClock: true,
                //startHour: 9,        // only for not realTime clock
                //clockPeriodTime: 12, // min, only for not realTime clock
                zoneGMT: 9,        // for realTime clock
                layers: ["pointer"],
                name: "clock Tokyo",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [6.306222769258454, 2.3537691447078197, -2.044516167863628],
                rotation: [0, 0.7069032632064396, 0, -0.7073102406073922],
                behaviorModules: ["Clock"],
                isRealTimeClock: true,
                //startHour: 9,        // only for not realTime clock
                //clockPeriodTime: 12, // min, only for not realTime clock
                zoneGMT: -5,        // for realTime clock
                layers: ["pointer"],
                name: "clock NY",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [6.306222769258454, 2.3537691447078197, -2.9526560998104725],
                rotation: [0, 0.7069032632064396, 0, -0.7073102406073922],
                behaviorModules: ["Clock"],
                isRealTimeClock: true,
                //startHour: 9,        // only for not realTime clock
                //clockPeriodTime: 12, // min, only for not realTime clock
                zoneGMT: 3,        // for realTime clock
                layers: ["pointer"],
                name: "clock Minsk",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [-1.2239129806980569, 2.9777980516593177, 1.5158928114996075],
                rotation: [0, 0.5743217596568575, 0, -0.818629657650302],
                behaviorModules: ['lightLamp'],
                layers: ["pointer"],
                name: "home light",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_CeilingLampSpecial.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"officeRoomLight",
                isTurnOnInitialy: true,
                isSimlpify: true,
                angle: 0.8
            }
        },
        {
            card: {
                translation: [5.5249358175706575, 2.9761581524012564, 0.20351921851317217],
                rotation: [-0.0924580729833584, 0.6955361179663418, -0.09099975657734624, -0.7066824305495211],
                behaviorModules: ['lightLamp'],
                layers: ["pointer"],
                name: "home light",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_CeilingLampSpecial.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"officeRoomLight",
                isTurnOnInitialy: true,
                isSimlpify: true,
                angle: 0.8
            }
        },
        {
            card: {
                translation: [2.4524091684332987, 2.9777980516593177, -0.9584810404450219],
                rotation: [0, -0.427469461400404, 0, -0.9040297890943907],
                behaviorModules: ['lightLamp'],
                layers: ["pointer"],
                name: "home light",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_CeilingLampSpecial.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"officeRoomLight",
                isTurnOnInitialy: true,
                isSimlpify: true,
                angle: 0.8
            }
        },
        {
            card: {
                translation: [1.9055386076168728, 1.1702589029338024, -3.7392472183669927],
                rotation: [0, 0, 0, 1],
                behaviorModules: ["lightSwitchButton"],
                layers: ["pointer"],
                name: "light switcher",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_LightSwitch001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"officeRoomLight",
                isTurnOnInitialy: true
            }
        },
        {
            card: {    
                translation: [8.677070423252012, 0, 31.02981547954427],
                rotation: [0, 0.4041980048432665, 0, 0.9146715109156526],
                layers: ["pointer"],
                name: "plant",
                dataLocation: "./assets/3D/pottedplant.glb",
                fileName: "/pottedplant.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",

            }
        },
        {
            card: {    
                translation: [-8.458907587071751, 0, 31.47395634469],
                rotation: [0, 0.4041980048432665, 0, 0.9146715109156526],
                layers: ["pointer"],
                name: "plant",
                dataLocation: "./assets/3D/pottedplant.glb",
                fileName: "/pottedplant.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",

            }
        }
    ];
}
