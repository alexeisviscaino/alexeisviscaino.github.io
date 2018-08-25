var BjsApp = BjsApp || {};

BjsApp.init = function () {
    var canvas = document.getElementById("renderPoolCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera", 51, 1.20, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.lowerBetaLimit = 0.5
    camera.lowerRadiusLimit = 8;
    camera.upperBetaLimit = 1.5;
    camera.upperRadiusLimit = 30;

    //var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,0,-10), scene);

    /*var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(5, 2, 5), scene);
    camera.angularSensibility = 10;
    camera.moveSensibility = 10;
    camera.setTarget(new BABYLON.Vector3(0, 0, -10));*/

    scene.activeCameras.push(camera);
    camera.attachControl(canvas, true);

    //FUNCTIONS UTILS
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var deleteMeshes = function (filter) {
        scene.meshes.filter(function (e) {
            var nameArray = e.name.split('-');
            if (nameArray[0] == filter) {
                e.dispose(true, true);
            }
        });
    };
    var poolActualSizeX, poolActualSizeY, poolActualSizeZ, poolActualMat, staircaseActualMat ;

    var updatePoolSizeMat = function () {
        poolActualSizeX = $(".input-size #profondeur").val();
        poolActualSizeY = $(".input-size #largeur").val();
        poolActualSizeZ = $(".input-size #longueur").val();
        poolActualMat = $(".input-color input:checked").val();
        staircaseActualMat = $(".input-staircase input:checked").val();

    };

    var updateStaircase = function (bol) {
        var tube = scene.getMeshByID("tube");
        var tube2 = scene.getMeshByID("tube2");
        var bar = scene.getMeshByID("bar");
        var bar2 = scene.getMeshByID("bar2");
        var bar3 = scene.getMeshByID("bar3");

        if(bol == "oui"){
            tube.isVisible = tube2.isVisible = bar.isVisible = bar2.isVisible = bar3.isVisible = true;
        } else {
            tube.isVisible = tube2.isVisible = bar.isVisible = bar2.isVisible = bar3.isVisible = false;
        }

        tube.position.z = - (poolActualSizeZ / 2) + 0.15 ;
        tube2.position.z = - (poolActualSizeZ / 2) + 0.15 ;
        bar.position.z = - (poolActualSizeZ / 2) + 0.65 ;
        bar2.position.z = - (poolActualSizeZ / 2) + 0.65 ;
        bar3.position.z = - (poolActualSizeZ / 2) + 0.65 ;
    };

    updatePoolSizeMat();

    function poolSwitchMat (mat) {

        switch (mat) {
            case "poolMatWhite":
                pools[0].material = poolMatWhite;
                poolActualMat = "poolMatWhite";
                break;
            case "poolMatBeige":
                pools[0].material = poolMatBeige;
                poolActualMat = "poolMatBeige";
                break;
            case "poolMatBlue":
                pools[0].material = poolMatBlue;
                poolActualMat = "poolMatBlue";
                break;
            case "poolMatMosaic":
                pools[0].material = poolMatMosaic;
                poolActualMat = "poolMatMosaic";
                break;
            case "poolMatGrey":
                pools[0].material = poolMatGrey;
                poolActualMat = "poolMatGrey";
                break;
            case "poolMatGreen":
                pools[0].material = poolMatGreen;
                poolActualMat = "poolMatGreen";
                break;
        }

        updatePoolSizeMat();
    }

    //LIGHT
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(50, 50, 50), scene);
    var light2 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-50, 50, -50), scene);
    light.specular = light2.specular = new BABYLON.Color3(0, 0, 0);
    scene.clearColor = new BABYLON.Color3(0.94, 0.33, 0.25);

    //MESH
    /*var octahedron = BABYLON.MeshBuilder.CreatePolyhedron("oct", {
        type: 16,
        size: 4
    }, scene);

    octahedron.position.x = 15;
    octahedron.position.y = 7;
    octahedron.position.z = 10;*/

    //POOL MATERIALS
    var poolMatWhite = new BABYLON.StandardMaterial("poolMatWhite", scene);
    poolMatWhite.diffuseColor = new BABYLON.Color3(0.80, 0.80, 0.80);
    var poolMatBeige = new BABYLON.StandardMaterial("poolMatBeige", scene);
    poolMatBeige.diffuseColor = new BABYLON.Color3(0.93, 0.80, 0.68);
    var poolMatBlue = new BABYLON.StandardMaterial("poolMatBlue", scene);
    poolMatBlue.diffuseColor = new BABYLON.Color3(0.5, 0.85, 0.89);
    var poolMatGrey = new BABYLON.StandardMaterial("poolMatGrey", scene);
    poolMatGrey.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    var poolMatGreen = new BABYLON.StandardMaterial("poolMatGreen", scene);
    poolMatGreen.diffuseColor = new BABYLON.Color3(0.09, 0.70, 0.31);
    var poolMatMosaic = new BABYLON.StandardMaterial("poolMatMosaic", scene);
    poolMatMosaic.diffuseTexture = new BABYLON.Texture("assets/img/texture-piscine.jpg", scene);
    poolMatMosaic.diffuseTexture.uScale = 4;
    poolMatMosaic.diffuseTexture.vScale = 3;

    //WATER MATERIAL
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 50, 50, 10, scene, false);
    waterMesh.position.y = -0.1;

    var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(700, 700));
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture("assets/img/waterbump.png", scene);
    water.bumpTexture.uScale = 1;
    water.bumpTexture.vScale = 1;
    water.windForce = 2;
    water.waveHeight = 0;
    water.bumpHeight = 0.2;
    water.waterColor = new BABYLON.Color3(0.5, 0.85, 0.89);
    water.colorBlendFactor = 0.5;
    waterMesh.material = water;

    //GROUND MATERIALS
    var groundFlatMat = new BABYLON.StandardMaterial("groundFlatMat", scene);
    groundFlatMat.diffuseColor = new BABYLON.Color3(0.94, 0.33, 0.25);
    groundFlatMat.specular = new BABYLON.Color3(0, 0, 0);

    //THREES
    var liteThreeArray = [];
    var mediumThreeArray = [];

    var liteThreeMat = new BABYLON.StandardMaterial("liteThreeMat", scene);
    liteThreeMat.diffuseColor = new BABYLON.Color3(0.22, 0.67, 0.58);
    liteThreeMat.specular = new BABYLON.Color3(0, 0, 0);

    var liteThree = BABYLON.MeshBuilder.CreateCylinder("liteThree-0", {diameterTop:0, diameterBottom:0.5, height: 0.5, tessellation: 96}, scene);
    liteThree.position.x = random(-5, -20);
    liteThree.position.y = 0.25;
    liteThree.position.z = random(-5, -25);

    var mediumThree = BABYLON.MeshBuilder.CreateCylinder("mediumThree-0", {diameterTop:0, diameterBottom:1.5, height: 2, tessellation: 96}, scene);
    mediumThree.position.x = random(5, 17);
    mediumThree.position.y = 1;
    mediumThree.position.z = random(5, 10);

    liteThree.material = liteThreeMat;
    mediumThree.material = liteThreeMat;

    liteThreeArray.push(liteThree);
    mediumThreeArray.push(mediumThree);

    for(var i = 1; i < 20; i++){
        var liteThreeClone = liteThree.clone("liteThree-" + i);
        liteThreeClone.position.x = random(-5, -20);
        liteThreeClone.position.y = 0.25;
        liteThreeClone.position.z = random(-5, -25);
        liteThreeArray.push(liteThreeClone);
        liteThreeClone.material = liteThreeMat;
    }

    for(var i = 1; i < 10; i++){
        var mediumThreeClone = mediumThree.clone("mediumThree-" + i);
        mediumThreeClone.position.x = random(5, 17);
        mediumThreeClone.position.y = 1;
        mediumThreeClone.position.z = random(5, 10);
        mediumThreeArray.push(mediumThreeClone);
        mediumThreeClone.material = liteThreeMat;
    }

    for(var i = 1; i < 10; i++){
        var mediumThreeClone = mediumThree.clone("mediumThree-" + (i+10));
        mediumThreeClone.position.x = random(-5, -17);
        mediumThreeClone.position.y = 1;
        mediumThreeClone.position.z = random(-5, -10);
        mediumThreeArray.push(mediumThreeClone);
        mediumThreeClone.material = liteThreeMat;
    }

    //UPDATE GROUND/POOL FUNCTIONS
    var shape = true;
    var staircase = false;
    var pools = [];

    var stairPath = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0.15, 0),
        new BABYLON.Vector3(0.1, 0.25, 0),
        new BABYLON.Vector3(0.25, 0.3, 0),
        new BABYLON.Vector3(0.4, 0.25, 0),
        new BABYLON.Vector3(0.45, 0.2, 0),
        new BABYLON.Vector3(0.5, 0.1, 0),
        new BABYLON.Vector3(0.5, -0.75, 0)
    ];
    var barsPath = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0.5, 0, 0)
    ];


    var createStaircase = function () {
        var tube = BABYLON.MeshBuilder.CreateTube("tube", {path: stairPath, radius: 0.01, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);
        var tube2 = BABYLON.MeshBuilder.CreateTube("tube2", {path: stairPath, radius: 0.01, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);
        var bar = BABYLON.MeshBuilder.CreateTube("bar", {path: barsPath, radius: 0.01, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);
        var bar2 = BABYLON.MeshBuilder.CreateTube("bar2", {path: barsPath, radius: 0.01, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);
        var bar3 = BABYLON.MeshBuilder.CreateTube("bar3", {path: barsPath, radius: 0.01, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);

        tube.position = new BABYLON.Vector3(0.25, 0, 0);
        tube2.position = new BABYLON.Vector3(-0.25, 0, 0);
        bar.position = new BABYLON.Vector3(-0.25, 0, 0);
        bar2.position = new BABYLON.Vector3(-0.25, -0.25, 0);
        bar3.position = new BABYLON.Vector3(-0.25, -0.5, 0);

        tube2.rotation.y = tube.rotation.y = -Math.PI/2;
        tube2.rotation.y = tube.rotation.y = -Math.PI/2;

        tube.position.z = - (poolActualSizeZ / 2) + 0.15 ;
        tube2.position.z = - (poolActualSizeZ / 2) + 0.15 ;
        bar.position.z = - (poolActualSizeZ / 2) + 0.65 ;
        bar2.position.z = - (poolActualSizeZ / 2) + 0.65 ;
        bar3.position.z = - (poolActualSizeZ / 2) + 0.65 ;

        staircase = true;

    };

    var addCircularPool = function(d, h) {

        updatePoolSizeMat();

        var circularSwimmingPool = BABYLON.MeshBuilder.CreateCylinder("circle-PoolBase", {diameterTop: d, diameterBottom: d, height: h, tessellation: 96}, scene);
        var circularSwimmingPool2 = BABYLON.MeshBuilder.CreateCylinder("circle-PoolBase-2", {diameterTop: d, diameterBottom: d, height: h, tessellation: 96}, scene);
        var circularSwimmingPoolSubtract = BABYLON.MeshBuilder.CreateCylinder("circle-SubPool", {diameterTop: (d - 0.5) , diameterBottom: (d - 0.5), height: h, tessellation: 96}, scene);
        circularSwimmingPoolSubtract.position.y = 0.1;
        circularSwimmingPool.isVisible = circularSwimmingPool2.isVisible = circularSwimmingPoolSubtract.isVisible = false;

        //SUBSTRACT POOL
        var swimmingPoolCSG = BABYLON.CSG.FromMesh(circularSwimmingPool);
        [circularSwimmingPoolSubtract].forEach(function (decMesh) {
            swimmingPoolCSG.subtractInPlace(BABYLON.CSG.FromMesh(decMesh));
        });

        var pool = swimmingPoolCSG.toMesh("circle-Pool", circularSwimmingPool.material, scene, false);
        pool.position.y = circularSwimmingPool2.position.y = -((h/2) - 0.1);
        pools.push(pool);
        poolSwitchMat(poolActualMat);

        shape = false;

        if(staircase){
            updateStaircase(staircaseActualMat)
        } else {
            createStaircase();
        }

        var tube = scene.getMeshByID("tube");
        var tube2 = scene.getMeshByID("tube2");
        var bar = scene.getMeshByID("bar");
        var bar2 = scene.getMeshByID("bar2");
        var bar3 = scene.getMeshByID("bar3");

        water.addToRenderList(pool);
        water.addToRenderList(tube);
        water.addToRenderList(tube2);
        water.addToRenderList(bar);
        water.addToRenderList(bar2);
        water.addToRenderList(bar3);

        deleteMeshes("ground");
        updateGround(circularSwimmingPool2);
    };

    var addRectangularPool = function (h, w, d) {

        updatePoolSizeMat();

        var swimmingPool = BABYLON.MeshBuilder.CreateBox("rect-PoolBase", {height: h, width: w, depth: d}, scene);
        var swimmingPool2 = BABYLON.MeshBuilder.CreateBox("rect-PoolBase-2", {height: h, width: w, depth: d}, scene);
        var swimmingPoolSubtract = BABYLON.MeshBuilder.CreateBox("rect-SubPool", {height: h, width: (w - 0.5), depth: (d - 0.5)}, scene);
        swimmingPoolSubtract.position.y = 0.1;
        swimmingPoolSubtract.isVisible = swimmingPool.isVisible = swimmingPool2.isVisible = false;

        //SUBSTRACT POOL
        var swimmingPoolCSG = BABYLON.CSG.FromMesh(swimmingPool);
        [swimmingPoolSubtract].map(function (decMesh) {
            swimmingPoolCSG.subtractInPlace(BABYLON.CSG.FromMesh(decMesh));
        });

        var pool = swimmingPoolCSG.toMesh("rect-Pool", swimmingPool.material, scene, false);
        pool.position.y = swimmingPool2.position.y = -((h/2) - 0.1);
        pools.push(pool);
        poolSwitchMat(poolActualMat);

        shape = true;

        if(staircase){
            updateStaircase(staircaseActualMat)
        } else {
            createStaircase();
        }

        var tube = scene.getMeshByID("tube");
        var tube2 = scene.getMeshByID("tube2");
        var bar = scene.getMeshByID("bar");
        var bar2 = scene.getMeshByID("bar2");
        var bar3 = scene.getMeshByID("bar3");

        water.addToRenderList(pool);
        water.addToRenderList(tube);
        water.addToRenderList(tube2);
        water.addToRenderList(bar);
        water.addToRenderList(bar2);
        water.addToRenderList(bar3);

        deleteMeshes("ground");
        updateGround(swimmingPool2);
    };

    var updateGround = function (subtract) {

        //var groundSub = BABYLON.MeshBuilder.CreatePlane("ground-SUB", {width: 70, height: 70}, scene);
        var groundSub = BABYLON.MeshBuilder.CreateDisc("ground-SUB", {tessellation: 36, radius: 50}, scene);
        groundSub.rotation.x = Math.PI / 2;
        groundSub.isVisible = false;

        //SUBSTRACT POOL
        var groudlCSG = BABYLON.CSG.FromMesh(groundSub);
        [subtract].map(function (decMesh) {
            groudlCSG.subtractInPlace(BABYLON.CSG.FromMesh(decMesh));
        });
        var ground = groudlCSG.toMesh("ground-Elem", subtract.material, scene, false);

        var groundFlatMat = new BABYLON.StandardMaterial("groundFlatMat", scene);
        groundFlatMat.diffuseColor = new BABYLON.Color3(0.94, 0.33, 0.25);
        groundFlatMat.specular = new BABYLON.Color3(0, 0, 0);

        ground.material = groundFlatMat;

        updatePoolSizeMat();

    };

    addRectangularPool(poolActualSizeX, poolActualSizeY, poolActualSizeZ);
    console.log(pools);

    // EQUADOR

    var equador = function (rad) {
        var equadorPoints = [];
        if(rad > 9 ){
            rad = 9
        } else {}
        var radius = rad;
        var theta = 0;
        var Y = 0.1;
        for (var i = 0; i < 64; i++) {
            equadorPoints.push(new BABYLON.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta)));
            theta += 0.1;
        }
        var equador = BABYLON.MeshBuilder.CreateDashedLines("equador", {
            points: equadorPoints,
            dashNb: 100
        }, scene);
    }

    equador(poolActualSizeZ);

    //POST-PROCESS
    console.log(scene.meshes);

    //ENGINE RENDER
    engine.runRenderLoop(function () {
        /*console.log(camera.alpha, camera.beta, camera.radius);*/
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

    //-----POOL FILTERS-----//

    //CHANGE POOL SHAPE
    $(".input-shape input[type=radio]").on("change", function () {

        updatePoolSizeMat();

        pools[0].material = poolSwitchMat(poolActualMat);
        deleteMeshes("ground");

       if($(this).val() == "rond"){

           pools[0].dispose(true, true);
           pools = pools.filter(item => item !== pools[0]);

           $(".input.largeur").slideUp();
           $(".input.longueur label").text("diamètre");

           deleteMeshes("rect");
           deleteMeshes("ground");
           addCircularPool(poolActualSizeZ, poolActualSizeX);

           deleteMeshes("equador");
           equador(poolActualSizeZ);

       } else {

           pools[0].dispose(true, true);
           pools = pools.filter(item => item !== pools[0]);

           $(".input.largeur").slideDown();
           $(".input.longueur label").text("longueur");

           deleteMeshes("circle");
           deleteMeshes("ground");
           addRectangularPool(poolActualSizeX, poolActualSizeY, poolActualSizeZ);

           deleteMeshes("equador");
           equador(poolActualSizeZ > poolActualSizeX ? poolActualSizeZ : poolActualSizeX );

       }

       $("#bleu-clair").attr('checked', 'checked');

    });

    //CHANGE POOL COLOR
    $(".input-color input[type=radio]").on("change", function () {
        poolSwitchMat($(this).val());
    });

    //POOL SIZE

    $(".input-size input#longueur").on("change", function () {
        pools[0].material = poolMatWhite;
        updatePoolSizeMat();

       if(shape){
           pools[0].dispose(true, true);
           pools = pools.filter(item => item !== pools[0]);

           deleteMeshes("rect");
           deleteMeshes("ground");
           addRectangularPool(poolActualSizeX, poolActualSizeY, $(this).val());

           deleteMeshes("equador");
           equador(parseInt($(this).val(), 10) > poolActualSizeY ? parseInt($(this).val(), 10) : poolActualSizeY);

       } else {
           pools[0].dispose(true, true);
           pools = pools.filter(item => item !== pools[0]);

           deleteMeshes("circle");
           deleteMeshes("ground");
           addCircularPool($(this).val(), poolActualSizeX);

           deleteMeshes("equador");
           equador(parseInt($(this).val(), 10) > poolActualSizeY ? parseInt($(this).val(), 10) : poolActualSizeY);

       }

        poolMatMosaic.diffuseTexture.uScale = $(this).val() * 0.75;

    });

    $(".input-size input#largeur").on("change", function () {
        pools[0].material = poolMatWhite;
        updatePoolSizeMat();
        pools[0].dispose(true, true);
        pools = pools.filter(item => item !== pools[0]);

        deleteMeshes("rect");
        deleteMeshes("ground");
        addRectangularPool(poolActualSizeX, $(this).val(), poolActualSizeZ);

        deleteMeshes("equador");

        equador(parseInt($(this).val(), 10) > poolActualSizeZ ? parseInt($(this).val(), 10) : poolActualSizeZ);


        poolMatMosaic.diffuseTexture.vScale = $(this).val() * 0.75;

    });

    $(".input-size input#profondeur").on("change", function () {
        pools[0].material = poolMatWhite;
        updatePoolSizeMat();
        if(shape){
            pools[0].dispose(true, true);
            pools = pools.filter(item => item !== pools[0]);

            deleteMeshes("rect");
            deleteMeshes("ground");
            addRectangularPool($(this).val(), poolActualSizeY, poolActualSizeZ);
        } else {
            pools[0].dispose(true, true);
            pools = pools.filter(item => item !== pools[0]);

            deleteMeshes("circle");
            deleteMeshes("ground");
            addCircularPool(poolActualSizeZ, $(this).val());
        }

    });

    //POOL STAIRCASE

    $(".input-staircase input[type=radio]").on("change", function () {

        updateStaircase($(this).val());

    });

    //WATER OPACTIY

    $(".input-water input[type=radio]").on("change", function () {

        if($(this).val() == "oui"){
            waterMesh.isVisible = true;
        } else {
            waterMesh.isVisible = false;
        }
    });
    
    updateStaircase(staircaseActualMat);

}