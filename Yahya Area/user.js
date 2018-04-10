const _skybox = Skybox;

document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(canvas, true);
    let scene = new BABYLON.Scene(engine);

    // Load debugger
    BABYLON.DebugLayer.InspectorURL = 'lib/babylon.inspector.bundle.js';
    scene.debugLayer.show();

    // Physics
    gravity = new BABYLON.Vector3(0, -9.81, 0);
    physicsEngine = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravity, physicsEngine);

    // Create FreeCamera
    camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 10), scene); 
    camera.setTarget(new BABYLON.Vector3(0, 4, -10));
    camera.attachControl(canvas);

    // Create light
    let light = new BABYLON.HemisphericLight("hLight", new BABYLON.Vector3(0, 8, 0), scene);

    // Create ground
    let ground = BABYLON.Mesh.CreateGround('ground', 10, 10, 10, scene);

    // Create skybox
    let skybox = _skybox(scene);

    // Load glTF
    BABYLON.SceneLoader.Append('res/meshes/player/', 'player.gltf', scene);

    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});