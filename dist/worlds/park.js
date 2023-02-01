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
                translation: [1.4681377559753939, 1.372139256814212, 4.756],
                scale: [0.7, 0.8, 0.8],
                rotation: [0, -1, 0, 0],
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
                translation: [1.4827656968730767, 1.3798597554202536, 4.770973765886535],
                scale: [2, 2, 1],
                rotation: [0, 1, 0, 0],
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
                translation: [-1.2124644638349933, 1.372139256814212, 2.4206044978956975],
                scale: [0.7, 0.8, 0.8],
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
                translation: [-1.2159423993648515, 1.372139256814212, 2.4206044978956975],
                scale: [2, 2, 1],
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
                translation: [193.1701953366865, -0.008479360184294737, -11.084568000916025],
                rotation: [0, -0.9891874762371504, 0, 0.14665652680865338],
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
                translation: [197.49480805470685, -0.008479360184294737, -11.406474946276603],
                rotation: [0, -0.9997491419018639, 0, 0.02239761742880403],
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
                translation: [201.7525717980556, -0.008479360184294737, -11.085508181418602],
                rotation: [0, -0.9949240542213715, 0, -0.10062865561911158],
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
                translation: [201.7525717980556, -0.008479360184294737, 21.762896175740547],
                rotation: [0, -0.06399904327091721, 0, -0.997949959897994],
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
                translation: [197.49480805470685, -0.008479360184294737, 21.70610459689945],
                rotation: [0, 0.002054716265693271, 0, 0.999997889068306],
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
                translation: [193.1701953366865, -0.008479360184294737, 21.834295678919396],
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
                translation: [217.7433125593843, 0.036400769460795956, 14.650562179846572],
                rotation: [0, -0.486080674467918, 0, -0.8739139419352536],
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
                translation: [198.21076582920932, 0.006161472705038751, 9.373498369816023],
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
                translation: [198.21076582920932, 0.006161472705038751, 8.14439571769563],
                rotation: [0, 0.6173831960345622, 0, 0.7866625637807796],
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
                translation: [201.09579915311, 0.006161472705038751, 13.373498369816023],
                rotation: [0, 0.802004826873425, 0, 0.5973175517860889],
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
                translation: [200.39927014115298, 0.006161472705038751, 12.373498369816023],
                rotation: [0, 0.8059854769044209, 0, 0.5919353098262957],
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
                translation: [204.60348108456895, 0.006161472705038751, 15.373498369816023],
                rotation: [0, 0.941471737299819, 0, 0.3370919279153093],
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
                translation: [204.08617665629154, 0.006161472705038751, 14.373498369816023],
                rotation: [0, 0.8507395512151876, 0, 0.5255874960443605],
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
                translation: [203.68545112995207, 0.006161472705038751, 10.584765834318711],
                rotation: [0, 0.83524277025676, 0, 0.5498813642357894],
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
                translation: [203.1317004308144, 0.006161472705038751, 9.4808224525476],
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
                translation: [204.60348108456895, 0.006161472705038751, 11.39490098868783],
                rotation: [0, 0.941471737299819, 0, 0.3370919279153093],
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
                translation: [220.18827021596974, 3.4001893594048016, 4.193318392750683],
                scale: [7.946698516468886, 7.657358813175109, 1],
                rotation: [0, -0.7155666718168641, 0, 0.6985444425266988],
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
