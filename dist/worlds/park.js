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
        "default/replaceWorld.js",
        "common/hover.js",
        "common/cubeRotation.js",
        "default/video.js",
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
                dataLocation: "./assets/3D/AreaParkAssets/Area_Garden.glb",
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
                dataLocation: "./assets/sky/shanghai_riverside_2k.exr",
                dataType: "exr",
            }
        },
        /*{
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
        },*/
        /*{
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
        },*/
        /*{
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
        },*/
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
        {
            card: {
                name: "park to office img portal",
                behaviorModules: ["ReplaceWorld"],
                replaceWorldTargetURL: "?world=office",
                //replaceWorldPreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                translation: [-1.2079303801936077, 1.3872934681872633, 1.0782156597205623],
                scale: [1, 1, 1],
                rotation: [0, -0.7079754824937937, 0, -0.706237011340867],
                layers: ["pointer"],
                dataLocation: "./assets/3D/SM_FX_Teleport.glb",
                fileName: "/SM_FX_Teleport.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                permissions: ["location.office"],
            }
        },
        {
            card: {
                translation: [-1.3079303801936077, 1.3872934681872633, 1.0782156597205623],
                rotation: [0, -0.7079754824937937, 0, -0.706237011340867],
                scale: [2.5, 2.5, 1],
                layers: ["pointer"],
                name: "/T_UI_TeleporOffice.png",
                cornerRadius: 0.02,
                fileName: "/T_UI_TeleporOffice.png",
                fullBright: true,
                modelType: "img",
                shadow: true,
                singleSided: true,
                textureLocation: "./assets/images/T_UI_TeleporOffice.png",
                textureType: "image",
                type: "2d",
            
            }
        },
        {
            card: {
                name: "park to home img portal",
                behaviorModules: ["ReplaceWorld"],
                replaceWorldTargetURL: "?world=home",
                //replaceWorldPreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                translation: [-1.2079303801936077, 1.3872934681872633, -3.2129729643194467],
                scale: [1, 1, 1],
                rotation: [0, -0.7079754824937937, 0, -0.706237011340867],
                layers: ["pointer"],
                dataLocation: "./assets/3D/SM_FX_Teleport.glb",
                fileName: "/SM_FX_Teleport.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                permissions: ["location.home"],
            }
        },
        {
            card: {
                translation: [-1.2159423993648515, 1.372139256814212, -3.208152346372732],
                scale: [2.5, 2.5, 1],
                rotation: [0, -0.7079754824937937, 0, -0.706237011340867],
                layers: ["pointer"],
                name: "/T_UI_TeleporHome.png",
                cornerRadius: 0.02,
                fileName: "/T_UI_TelepoHome.png",
                fullBright: true,
                modelType: "img",
                shadow: true,
                singleSided: true,
                textureLocation: "./assets/images/T_UI_TeleporHome.png",
                textureType: "image",
                type: "2d",
            
            }
        },
        {
            card: {
                translation: [57.74930543348876, -0.008479360184294737, 7.320752510751911],
                rotation: [0, -0.5900855711917569, 0, 0.8073407079240451],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "Bench",
                dataLocation: "./assets/3D/AreaParkAssets/SM_Bench001.glb",
                fileName: "/SM_Bench001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [57.76222650039005, -0.008479360184294737, -3.4776401871338574],
                rotation: [0, -0.8557708461646311, 0, 0.5173550607220069],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "Bench",
                dataLocation: "./assets/3D/AreaParkAssets/SM_Bench001.glb",
                fileName: "/SM_Bench001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [44.286509116514374, -0.008479360184294737, 11.1626577104934],
                rotation: [0, 0.0014446500514881527, 0, -0.9999989564925702],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "Bench",
                dataLocation: "./assets/3D/AreaParkAssets/SM_Bench001.glb",
                fileName: "/SM_Bench001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [43.91165350731576, -0.008479360184294737, -6.856923064851041],
                rotation: [0, -0.9999672611159451, 0, -0.008091767191127155],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "Bench",
                dataLocation: "./assets/3D/AreaParkAssets/SM_Bench001.glb",
                fileName: "/SM_Bench001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [23.584687866308784, -0.008479360184294737, 10.410917038654128],
                rotation: [0, -0.027082358743851037, 0, 0.9996332056533884],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "Bench",
                dataLocation: "./assets/3D/AreaParkAssets/SM_Bench001.glb",
                fileName: "/SM_Bench001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [17.660446798816153, -0.008479360184294737, 7.673101221238412],
                rotation: [0, -0.6063520335276628, 0, 0.7951963351505518],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "Bench",
                dataLocation: "./assets/3D/AreaParkAssets/SM_Bench001.glb",
                fileName: "/SM_Bench001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [217.7433125593843, 0.036400769460795956, -6.913720664041055],
                rotation: [0, -0.8960028871604678, 0, -0.44404822508383684],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "SM_LoudSpeakers",
                dataLocation: "./assets/3D/AreaParkAssets/SM_LoudSpeakers001.glb",
                fileName: "/SM_LoudSpeakers001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [215.96737533967368, 0.036400769460795956, 16.196435945862405],
                rotation: [0, -0.406067601115082, 0, -0.9138430408580254],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "SM_LoudSpeakers",
                dataLocation: "./assets/3D/AreaParkAssets/SM_LoudSpeakers001.glb",
                fileName: "/SM_LoudSpeakers001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [200.03068181009274, 0.006161472705038751, 0.514406655673272],
                rotation: [0, 0.5407177804741503, 0, 0.8412040667276331],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_cyan",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_cyan.glb",
                fileName: "/SM_ChillBag_cyan.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [199.63537617253033, 0.006161472705038751, 5.4551874526824164],
                rotation: [0, 0.7190827182776836, 0, 0.6949244881815413],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_cyan",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_cyan.glb",
                fileName: "/SM_ChillBag_cyan.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [200.93404783822896, 0.006161472705038751, -0.8571826345759415],
                rotation: [0, 0.4934853031403624, 0, 0.8697541351350188],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_p",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_purple.glb",
                fileName: "/SM_ChillBag_purple.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },{
            card: {
                translation: [203.02642228402865, 0.006161472705038751, 4.077753667361074],
                rotation: [0, 0.7293326363017921, 0, 0.6841592691947375],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_p",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_purple.glb",
                fileName: "/SM_ChillBag_purple.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [199.60959891603383, 0.006161472705038751, 3.8088218194660612],
                rotation: [0, 0.6051704486589775, 0, 0.796095928936891],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_red",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_red.glb",
                fileName: "/SM_ChillBag_red.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },{
            card: {
                translation: [200.11371038561964, 0.006161472705038751, 8.862311653601367],
                rotation: [0, 0.8209408750844659, 0, 0.5710132044143558],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_red",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_red.glb",
                fileName: "/SM_ChillBag_red.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [199.63939557737294, 0.006161472705038751, 2.161818919396886],
                rotation: [0, 0.6528910022002047, 0, 0.7574518725608987],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_yellow",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_yellow.glb",
                fileName: "/SM_ChillBag_yellow.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [203.13965629800023, 0.006161472705038751, 5.152128939672868],
                rotation: [0, 0.8297681009121709, 0, 0.55810832166221],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_yellow",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_yellow.glb",
                fileName: "/SM_ChillBag_yellow.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [199.61996766320286, 0.006161472705038751, 7.183020001703682],
                rotation: [0, 0.6173831960345622, 0, 0.7866625637807796],
                layers: ["pointer", "walk"],
                behaviorModules: ["hover"],
                name: "ChillBag_yellow",
                dataLocation: "./assets/3D/AreaParkAssets/SM_ChillBag_yellow.glb",
                fileName: "/SM_ChillBag_yellow.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {  
                translation: [27.187080278519634, 0.03835456130256931, -5.163396208984247],
                rotation: [0, -0, 0, 0],
                layers: ["pointer", "walk"],
                behaviorModules: ["CubeRotation"],
                name: "rotating cube",
                dataLocation: "./assets/3D/AreaOfficeAssets/SM_OrangeCube_special.glb",
                fileName: "/SM_OrangeCube_special.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            } 
        },
        {
            card: {
                type: "2d",
                translation: [220.2669337221663, 4.846229211889341, 4.785516061348889],
                scale: [12, 12, 1],
                rotation: [0.06061132089612128, -0.7043707845664409, 0.05869793097236669, 0.7047997009988353],
                width: 4,
                height: 2,
                fullBright: true,
                behaviorModules: ["VideoPlayer"],
                textureLocation: "./assets/video/Big_Buck_Bunny.mp4",
                textureWidth: 4096,
                textureHeight: 2048,
                textureType: "video",
                step: 1.5,
                permissions: ["action.tv"],
            }
        },
    ];
}
