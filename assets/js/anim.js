var BjsApp = BjsApp || {};

BjsApp.init = function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var numberWaterDrop = 10;
    var surface = 150;

    /*var camera = new BABYLON.ArcRotateCamera("Camera", 51, 1.20, 33, new BABYLON.Vector3(0, 0, 0), scene);*/
    var camera = new BABYLON.ArcRotateCamera("Camera", 50, 1, 160, new BABYLON.Vector3(0, 0, 0), scene);
    scene.activeCameras.push(camera);
    camera.lowerBetaLimit = 0.5;
    camera.lowerRadiusLimit = 8;
    camera.upperBetaLimit = 1.5;
    camera.upperRadiusLimit = 160;
    camera.attachControl(canvas);

    //UTIL FUNCTIONS
    var myPoints = [];
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //LIGHT
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, -10, 10), scene);
    var light2 = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 10, -20), scene);
    var light3 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, -10, 10), scene);

    light.diffuse = new BABYLON.Color3(0.96, 0.42, 1);
    light.specular = new BABYLON.Color3(0, 0, 0);

    light2.diffuse = new BABYLON.Color3(0.28, 0.53, 0.85);
    light.specular = new BABYLON.Color3(0, 0, 0);

    light3.diffuse = new BABYLON.Color3(1, 0.53, 0.85);
    light.specular = new BABYLON.Color3(0, 0, 0);

    scene.clearColor = new BABYLON.Color3(0.2, 0.6, 1);

    /*****MESH*****/

    //SOL
    var ground = new BABYLON.Mesh.CreatePlane("ground", surface * 2, scene);
    ground.rotation.x = Math.PI / 2;
    ground.computeWorldMatrix(true);

    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.alpha = 0;
    ground.material = groundMat;

    // EQUADOR
    var equadorPoints = [];
    var radius = 1;
    var theta = 0;
    var Y = 0;
    for (var i = 0; i < 64; i++) {
        equadorPoints.push(new BABYLON.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta)));
        theta += 0.1;
    }

    for (var i = 0; i < numberWaterDrop; i++) {
        var waterDrop = BABYLON.MeshBuilder.CreateBox("waterDrop-" + i, {
            height: 5,
            width: 0.1,
            depth: 0.1,
            speed: random(1, 50)
        }, scene);
        waterDrop.computeWorldMatrix(true);
        waterDrop.position.x = random(surface * -1, surface);
        waterDrop.position.y = 50;
        waterDrop.position.z = random(surface * -1, surface);
        waterDrop.speed = random(20, 50);
    }

    var meshArray = [];
    var circleArray = [];
    var waterDropArray = [];

    scene.meshes.map(function (i) {
        meshArray.push(i);
    });

    meshArray.filter(function (e) {
        var nameArray = e.name.split('-');
        if (nameArray[0] == "equador") {
            circleArray.push(e);
        } else if (nameArray[0] == "waterDrop") {
            waterDropArray.push(e);
        }
    });

    //ENGINE EVENTS

    engine.runRenderLoop(function () {
        scene.render();
    });

    scene.registerAfterRender(function () {
        waterDropArray.map(function (i) {
            var waterDrop = i;
            i.position.y -= waterDrop.speed * 0.1;
            if (waterDrop.intersectsMesh(ground, true)) {
                emitCercle(waterDrop.position.x, waterDrop.position.z);
                i.dispose(true, true);
                waterDropArray = waterDropArray.filter(item => item !== i);
            } else {}

            if (waterDropArray.length < numberWaterDrop) {
                createWaterDrop();
            }
        });
        circleArray.map(function (i) {
            var thisCircle = i;
            thisCircle.scaling.x += 0.2;
            thisCircle.scaling.y += 0.2;
            thisCircle.scaling.z += 0.2;
            thisCircle.alpha -= 0.01;
            setTimeout(function () {
                i.dispose(true, true);
                circleArray = circleArray.filter(item => item !== i);

            }, 5000);
        });
    });

    var createWaterDrop = function () {
        var waterDrop = BABYLON.MeshBuilder.CreateBox("waterDrop-" + i, {
            height: 5,
            width: 0.1,
            depth: 0.1,
            speed: random(1, 50)
        }, scene);
        waterDrop.computeWorldMatrix(true);
        waterDrop.position.x = random(surface * -1, surface);
        waterDrop.position.y = 50;
        waterDrop.position.z = random(surface * -1, surface);
        waterDrop.speed = random(20, 50);
        waterDropArray.push(waterDrop);
    };

    var emitCercle = function (x, z) {
        var cirlce = BABYLON.MeshBuilder.CreateLines("circle-" + i, {
            points: equadorPoints
        }, scene);
        cirlce.position.x = x;
        cirlce.position.z = z;
        circleArray.push(cirlce);
    };

    window.addEventListener("resize", function () {
        engine.resize();
    });

}
