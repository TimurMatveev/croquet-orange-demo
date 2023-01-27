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
        "default/lights.js",
        "default/video.js",
        "common/lightSwitch.js",
        "common/lightLamp.js",
        "home/orangeBook.js",
        "common/clock.js",
        "default/replaceWorld.js"
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
                fileName: "/Area_House.glb",
                modelType: "glb",
                isWorld: true,
                dataLocation: "./assets/3D/AreaHouseAssets/Area_House.glb",
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                fileName: "/airport.exr",
                dataLocation: "./assets/sky/TC_panorama_map.exr",
                dataType: "exr",
            }
        },
        /*{
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
        },*/
        /*{
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
        },*/
        {
            card: {
                type: "2d",
                translation: [-4.2837216501167426, 2.500142101961323, 14.195328801946168],
                scale: [3.946698516468886, 3.657358813175109, 1],
                rotation: [0, -0.9994966325656738, 0, -0.03172509243294022],
                width: 4,
                height: 2,
                fullBright: true,
                behaviorModules: ["VideoPlayer"],
                textureLocation: "./assets/video/intro.mp4",
                textureWidth: 4096,
                textureHeight: 2048,
                textureType: "video",
                step: 1.5,
                permissions: ["action.tv"],
            }
        },
        {
            card: {
                translation: [-4.077029560505512, 5.476805092001461, 10.067965348557347],
                rotation: [0, 0, 0, -1],
                behaviorModules: ['lightLamp'],
                layers: ["pointer"],
                name: "home light",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_CeilingLampSpecial.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"badRoomLight",
                isTurnOnInitialy: true,
                externalSwitchUrls: {on: 'https://maker.ifttt.com/trigger/light_on/with/key/k5__FwyD3I0_l4Y6C_dnw_44kfuJEDD4lYqXlFWSO6a', off: 'https://maker.ifttt.com/trigger/light_off/with/key/k5__FwyD3I0_l4Y6C_dnw_44kfuJEDD4lYqXlFWSO6a'},
            }
        },
        {
            card: {
                translation: [3.6972327546616874, 1.7283034220074693, 5.645000478768717],
                rotation: [0, -0.7152033225839578, 0, 0.6989164523495403],
                behaviorModules: ["lightSwitchButton"],
                layers: ["pointer"],
                name: "light switcher",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_LightSwitch001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                lightKey:"badRoomLight",
                isTurnOnInitialy: true
            }
        },
        {
            card: {
                translation: [3.689324261248019, 2.9091903791119424, 1.754098287728504],
                rotation: [0, 0.7152033225839578, 0, -0.6989164523495403],
                behaviorModules: ["Clock"],
                isRealTimeClock: false,
                startHour: 9,        // only for not realTime clock
                clockPeriodTime: 12, // min, only for not realTime clock
                //zoneGMT: 0,        // for realTime clock
                layers: ["pointer"],
                name: "clock",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [9.295325188637028, 2.9091903791119424, 0.7590141173003331],
                rotation: [0, 0, 0, 0],
                behaviorModules: ["Clock"],
                isRealTimeClock: false,
                startHour: 9,        // only for not realTime clock
                clockPeriodTime: 12, // min, only for not realTime clock
                //zoneGMT: 0,        // for realTime clock
                layers: ["pointer"],
                name: "clock",
                dataLocation: "./assets/3D/SM_Clock01.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [2.387, 1.523, 13.663],
                rotation: [0.14, 0.7071067811865476, -0.1, 0.7071067811865476],
                pdf: {
                    translation: [0.7734766782531803, 2, 13],
                    scale: [2, 2, 2],
                    rotation: [0, 1.0296931562069376, 0, -0.04724409021872561],
                    pdfLocation: "3i2bjIBqONmUqz8XGj0oguUVu-wJleyHEiMp8RBLCX2sAR0dGRpTRkYPAAUMGkccGkcKGwYYHAwdRwAGRhxGLg0_CxAFIBooAjgKKzENWi4RCB8QHjwiPjAwW0YABkcKGwYYHAwdRwQAChsGHwwbGgxGWjFcGQxRBQY8IA4-UBkaLwMTHBsEIA1cEVsCGTY2LCgKIBlROw8tNg8-XUYNCB0IRhAeHRoqCw8EBjguAxMiBQQxBDw7Xl8AKiddMVkdIB02Nh4zIRskGyomXgI",
                },
                behaviorModules: ["OrangeBook"],
                layers: ["pointer"],
                name: "orange book",
                dataLocation: "./assets/3D/SM_Book001_Orange.glb",
                modelType: "glb",
                shadow: true,
                type: "3d",
            }
        },
        {
            card: {
                name: "home to office img portal",
                behaviorModules: ["ReplaceWorld"],
                replaceWorldTargetURL: "?world=office",
                //replaceWorldPreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                rotation: [0, 2*Math.PI, 0],
                translation: [-0.1492097088909791, 1.6, -3.5761245931673953],
                rotation: [0, 0.001177863013747546, 0, -0.9999993063191202],
                scale: [1.1, 1, 1],
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
                translation: [-0.13452307828389598, 1.6168962792854595, -3.662237539061193],
                scale: [2.5, 2.5, 1],
                rotation: [0, 0.0032392767578137806, 0, 0.9999947535292806],
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
                name: "home to park img portal",
                behaviorModules: ["ReplaceWorld"],
                replaceWorldTargetURL: "?world=park",
                //replaceWorldPreserveOrigin: "//(.*\\.)?croquet.(io|dev)$",
                rotation: [0, 2*Math.PI, 0],
                translation: [-8.870072544676102, 1.6, -3.5761245931673953],
                rotation: [0, 0.001177863013747546, 0, -0.9999993063191202],
                scale: [1, 1, 1],
                layers: ["pointer"],
                dataLocation: "./assets/3D/SM_FX_Teleport.glb",
                fileName: "/SM_FX_Teleport.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
                permissions: ["location.park"],
            }
        },
        {
            card: {
                translation: [-7.151342120037198, 0, 3.4288687542472314],
                rotation: [0, 0.9592222066157475, 0, -0.282653070627609],
                layers: ["pointer"],
                name: "Chair",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Chair001.glb",
                fileName: "/SM_Chair001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [-6.372010215905119, 0, 1.6557965969912989],
                rotation: [0, 0.6534799162587247, 0, -0.7569438546196741],
                layers: ["pointer"],
                name: "Chair",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Chair001.glb",
                fileName: "/SM_Chair001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [-7.771760563981092, 0, 0.06386750268147767],
                rotation: [0, 0.27568939379130913, 0, -0.9612467727649237],
                layers: ["pointer"],
                name: "Chair",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Chair001.glb",
                fileName: "/SM_Chair001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {
                translation: [-8.227003950373792, 0, 1.8793195517818693],
                scale: [0.8, 1.2, 0.8],
                rotation: [0, 0.9867736207791215, 0, 0.16210435322489836],
                layers: ["pointer"],
                name: "Table",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Table001.glb",
                fileName: "/SM_Table001.glb",
                modelType: "glb",
                shadow: true,
                //singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [3.1095786277320814, 0, 3.5730247324720885],
                rotation: [0, -0.8509537298292443, 0, 0.5252406588314521],
                layers: ["pointer"],
                name: "WhiteBoard",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_WhiteBoard002.glb",
                fileName: "/SM_WhiteBoard002.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [3.386971537383585, 0, -1.2689044539254821],
                rotation: [0, 0.7042509299690597, 0, -0.7099511445428586],
                layers: ["pointer"],
                name: "Nightstand",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Nightstand001.glb",
                fileName: "/SM_Nightstand001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [3.386971537383585, 0, -0.31614134663258797],
                rotation: [0, 0.7042509299690597, 0, -0.7099511445428586],
                layers: ["pointer"],
                name: "Nightstand",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Nightstand001.glb",
                fileName: "/SM_Nightstand001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                translation: [3.386971537383585, 0, 0.6283963746824974],
                rotation: [0, 0.7042509299690597, 0, -0.7099511445428586],
                layers: ["pointer"],
                name: "Nightstand",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Nightstand001.glb",
                fileName: "/SM_Nightstand001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {  
                translation: [1.964323957151095, 0, -3.354081579720068],
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
                translation: [3.1983899588727964, 0.10139441617195777, -3.1138820146181025],
                rotation: [0, -0.141274477570366, 0, 0.9899704652095538],
                layers: ["pointer"],
                name: "LampStand.glb",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_LampStand001.glb",
                fileName: "/SM_LampStand001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {  
                translation: [7.0454846194774, 1.0370614641403142, 1.3118394602246588],
                rotation: [0, -0.18530129316544658, 0, 0.9826817545631004],
                layers: ["pointer"],
                name: "NightstandLamp",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_NightstandLamp001.glb",
                fileName: "/SM_NightstandLamp001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            
            }
        },
        {
            card: {     
                translation: [-3.137849693895281, 0.09694085592590262, 10.573945888925552],
                rotation: [0, -0.0015932217537839577, 0, 0.9999987308214163],
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
                translation: [11.07995523493449, 0.09694085592590262, 9.650837325599623],
                rotation: [0, -0.7102176960278073, 0, 0.703982119267921],
                dataScale: [0.8, 1, 1],
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
                translation: [7.052765667502836, 0, 1.2515386367078534],
                rotation: [0, 0.013081754361860432, 0, -0.9999144301903119],
                layers: ["pointer"],
                name: "Nightstand",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Nightstand001.glb",
                fileName: "/SM_Nightstand001.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [11.304914066958517, 0.6019019904493992, 10.814504309102302],
                rotation: [0, -0.8823547231144305, 0, 0.4705848941452083],
                layers: ["pointer"],
                name: "/Book001_stack03",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Book001_stack03.glb",
                fileName: "/SM_Book001_stack03.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [-1.7917100299907367, 0.9866804719937562, 14.173176880918035],
                rotation: [0, 0.9923624471604701, 0, 0.12335628668893794],
                layers: ["pointer"],
                name: "/Book001_stack03",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Book001_stack04.glb",
                fileName: "/SM_Book001_stack03.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {     
                translation: [-2.418881828697503, 0.6725593178198047, 10.683995889291086],
                rotation: [-0.3946385858162169, 0.5867134773183125, -0.5796748032603606, -0.4049750666190363],
                dataScale: [1.5, 1.5, 1.5],
                layers: ["pointer"],
                name: "/Book001_stack03",
                dataLocation: "./assets/3D/AreaHouseAssets/SM_Book001_04.glb",
                fileName: "/SM_Book001_stack03.glb",
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {    
                translation: [-5.7501244286234, 0.1538633138092611, -2.9688506367664065],
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
