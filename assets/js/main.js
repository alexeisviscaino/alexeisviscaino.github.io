$(window).on("load", function () {

    //VARS
    var s_1 = Snap(".title-anim-1"),
        s_2 = Snap(".title-anim-2"),
        s_3 = Snap(".title-anim-3"),
        h = Snap(".decoupe-header"),
        d = Snap(".decoupe-triangle.bot"),
        k = Snap(".hover-item"),
        l = Snap(".title-animation"),
        decoup_triangle_w = $(".decoupe-triangle").width(),
        decoup_triangle_h = $(".decoupe-triangle").height(),
        decoup_width = $(".decoupe-header").width(),
        decoup_height = $(".decoupe-header").height(),
        title_width = $(".title-anim-2").width() - 10,
        title_height = $(".title-anim-3").height() - 10,
        half_title_width = title_width / 2,
        half_title_height = title_height / 2,
        scroll_test = true,
        t1 = Math.floor((Math.random() * half_title_width) + 1),
        t2 = Math.floor((Math.random() * half_title_height) + 1),
        t3 = Math.floor((Math.random() * (title_width - half_title_width)) + half_title_width),
        t4 = Math.floor((Math.random() * half_title_height) + 1),
        t5 = Math.floor((Math.random() * (title_width - half_title_width)) + half_title_width),
        t6 = Math.floor((Math.random() * (title_height - half_title_height)) + half_title_height),
        triangle_lit_1 = s_1.polygon().attr({
            points: [t1, t2, t3, t4, t5, t6],
            strokeWidth: 0,
            fill: "#f56b82",
            "fill-opacity": "0.5",
            "id": "lit-1"
        }),
        triangle_big_1 = s_1.polygon().attr({
            points: [t1, t2, t3, t4, t5, t6],
            strokeWidth: 1,
            stroke: "#f56b82",
            fill: "transparent",
            "id": "big-1"
        }),
        triangle_lit_2 = s_2.polygon().attr({
            points: [t1, t2, t3, t4, t5, t6],
            strokeWidth: 0,
            fill: "#f56b82",
            "fill-opacity": "0.5",
            "id": "lit-2"
        }),
        triangle_big_2 = s_2.polygon().attr({
            points: [t1, t2, t3, t4, t5, t6],
            strokeWidth: 1,
            stroke: "#f56b82",
            fill: "transparent",
            "id": "big-2"
        }),
        triangle_lit_3 = s_3.polygon().attr({
            points: [t1, t2, t3, t4, t5, t6],
            strokeWidth: 0,
            fill: "#f56b82",
            "fill-opacity": "0.5",
            "id": "lit-3"
        }),
        triangle_big_3 = s_3.polygon().attr({
            points: [t1, t2, t3, t4, t5, t6],
            strokeWidth: 1,
            stroke: "#f56b82",
            fill: "transparent",
            "id": "big-3"
        }),
        polygon_arrow = d.polygon().attr({
            points: [0, 0, (decoup_triangle_w / 2), 0, decoup_triangle_w, 0],
            fill: "#f56b82"
        }),
        grabPathTriangles = Snap.selectAll('#big-1, #big-2, #big-3, #lit-1, #lit-2, #lit-3');

    //MATH RANDOM TRIANGLES FUNCTIONS
    var animation_triangle = function () {
        grabPathTriangles.forEach(function (elem) {
            var t1 = Math.floor((Math.random() * half_title_width) + 1),
                t2 = Math.floor((Math.random() * half_title_height) + 1),
                t3 = Math.floor((Math.random() * (title_width - half_title_width)) + half_title_width),
                t4 = Math.floor((Math.random() * half_title_height) + 1),
                t5 = Math.floor((Math.random() * (title_width - half_title_width)) + half_title_width),
                t6 = Math.floor((Math.random() * (title_height - half_title_height)) + half_title_height);
            elem.animate({
                points: [t1, t2, t3, t4, t5, t6]
            }, 3500, mina.easeinout);
        });
    }

    var anim_arrow = function () {
        polygon_arrow.animate({
            points: [0, 0, (decoup_triangle_w / 2), 70, decoup_triangle_w, 0]
        }, 1000, mina.easeinout);
    };


    var nextFrame = function (el, frameArray, whichFrame) {
        if (whichFrame >= frameArray.length) {
            return
        };
        el.animate(frameArray[whichFrame].animation, frameArray[whichFrame].dur, nextFrame.bind(null, el, frameArray, whichFrame + 1));
    };

    //COMMON DECLARATION FUNCTIONS
    animation_triangle();
    setTimeout(function () {
        anim_arrow();
        $(".icon-arrow-bot").addClass("anim");
    }, 400);

    //ANIMATION TRIANGLE TITLES
    window.setInterval(function () {
        animation_triangle();
    }, 3500);

    $(".nav .main-nav a").on("click", function () {
        var this_attr = $(this).attr("data-attr") - 1;
        $(".sub-nav li").slideUp(700);
        $(".sub-nav li").eq(this_attr).slideDown(700);
    });

    $("body").on("click", ".decoupe-triangle.bot, .icon-arrow-bot", function () {
        var speed = 1000; // Durée de l'animation (en ms)
        $('html, body').animate({
            scrollTop: $("#portfolio").offset().top
        }, speed, mina.ease);
        return false;
    });

});

var BjsApp = BjsApp || {};

BjsApp.init = function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    /*var camera = new BABYLON.ArcRotateCamera("Camera", 51, 1.20, 33, new BABYLON.Vector3(0, 0, 0), scene);*/
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -50), scene);
    scene.activeCameras.push(camera);
    /*camera.attachControl(canvas);*/

    //UTIL FUNCTIONS
    var myPoints = [];
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //LIGHT
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, -10, 10), scene);
    var light2 = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 10, -20), scene);
    var light3 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, -10, 10), scene);

    light.diffuse = new BABYLON.Color3(0.96, 0.42, 0.51);
    light.specular = new BABYLON.Color3(0, 0, 0);

    light2.diffuse = new BABYLON.Color3(0.28, 0.53, 0.85);
    light.specular = new BABYLON.Color3(0, 0, 0);

    light3.diffuse = new BABYLON.Color3(1, 0.53, 0.85);
    light.specular = new BABYLON.Color3(0, 0, 0);

    scene.clearColor = new BABYLON.Color3(0.96, 0.42, 0.51);

    //MESH

    var octahedron = BABYLON.MeshBuilder.CreatePolyhedron("oct1", {
        type: 16,
        size: 4
    }, scene);
    octahedron.position.x = 15;
    octahedron.position.y = 7;
    octahedron.position.z = 10;

    var octahedron2 = BABYLON.MeshBuilder.CreatePolyhedron("oct2", {
        type: 16,
        size: 3
    }, scene);
    octahedron2.position.x = -20;
    octahedron2.position.y = 5;
    octahedron2.position.z = 0;

    var octahedron3 = BABYLON.MeshBuilder.CreatePolyhedron("oct3", {
        type: 16,
        size: 2
    }, scene);
    octahedron3.position.x = 0;
    octahedron3.position.y = -10;
    octahedron3.position.z = 50;

    octahedron.parent = octahedronParent;
    octahedron2.parent = octahedronParent;
    octahedron3.parent = octahedronParent;

    var octahedronRandParent = new BABYLON.Mesh.CreateBox("octahedronRandParent", 1, scene);
    var octahedronParent = new BABYLON.Mesh.CreateBox("octahedronParent", 1, scene);
    var octahedronParentMat = new BABYLON.StandardMaterial("myMaterial", scene);
    octahedronParentMat.alpha = 0;

    octahedronRandParent.material = octahedronParentMat;
    octahedronParent.material = octahedronParentMat;

    for (var i = 0; i < 20; i++) {
        var x, y, z;
        x = random(-250, 250);
        y = random(-150, 250);
        z = random(0, 500);

        var octahedronRand = BABYLON.MeshBuilder.CreatePolyhedron("oct" + i, {
            type: random(0, 20),
            size: random(2, 5)
        }, scene);

        octahedronRand.position.x = x;
        octahedronRand.position.y = y;
        octahedronRand.position.z = z;
        octahedronRand.parent = octahedronRandParent;
    };

    var octahedronMAt = new BABYLON.StandardMaterial("octahedronMAt", scene);
    octahedronMAt.specularColor = new BABYLON.Color3(0, 0, 0.87);
    octahedronMAt.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    octahedron.material = octahedronMAt;
    octahedron2.material = octahedronMAt;
    octahedron3.material = octahedronMAt;

    for (var i = 0; i < 20; i++) {

        var x, y, z;

        x = random(-250, 250);
        y = random(0, 250);
        z = random(20, 500);

        var point = new BABYLON.Vector3(x, y, z);
        myPoints.push(point);
    };
    var lines = BABYLON.Mesh.CreateLines("lines", myPoints, scene, true);

    //ENGINE EVENTS

    document.getElementById("renderCanvas").addEventListener("mousemove", function (event) {
        octahedron.rotation.x += coordX(event);
        octahedron.rotation.y += coordY(event);
        octahedron.rotation.z += coordX(event);
        octahedron2.rotation.x -= coordX(event);
        octahedron2.rotation.y += coordY(event);
        octahedron2.rotation.z -= coordX(event);
        octahedron3.rotation.x -= coordX(event);
        octahedron3.rotation.y += coordY(event);
        octahedron3.rotation.z += coordX(event);
    });

    var coordX = function (e) {
        var x = e.clientX / 40000;
        return x;
    };
    var coordY = function (e) {
        var y = e.clientY / 40000;
        return y;
    };
    var winScroll = false;
    var previous = window.scrollY;
    window.onscroll = function (e) {
        lines.position.y = document.documentElement.scrollTop / 30;
        octahedronRandParent.position.y = document.documentElement.scrollTop / 10;
        octahedronParent.position.y = document.documentElement.scrollTop;

    }

    engine.runRenderLoop(function () {
        octahedron.rotation.z += 1 / 200;
        octahedron2.rotation.z -= 1 / 200;
        octahedron3.rotation.z += 1 / 200;
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

};
