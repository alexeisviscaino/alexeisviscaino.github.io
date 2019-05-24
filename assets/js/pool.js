//SLIDEUP / SLIDOWN FUNCITONS
class DOMAnimations {
    static slideUp (element, duration = 500) {
        return new Promise(function (resolve, reject) {
            element.style.height = element.offsetHeight + 'px'
            element.style.transitionProperty = `height, margin, padding`
            element.style.transitionDuration = duration + 'ms'
            element.offsetHeight // eslint-disable-line no-unused-expressions
            element.style.overflow = 'hidden'
            element.style.height = 0
            element.style.paddingTop = 0
            element.style.paddingBottom = 0
            element.style.marginTop = 0
            element.style.marginBottom = 0
            window.setTimeout(function () {
                element.style.display = 'none'
                element.style.removeProperty('height')
                element.style.removeProperty('padding-top')
                element.style.removeProperty('padding-bottom')
                element.style.removeProperty('margin-top')
                element.style.removeProperty('margin-bottom')
                element.style.removeProperty('overflow')
                element.style.removeProperty('transition-duration')
                element.style.removeProperty('transition-property')
                resolve(false)
            }, duration)
        })
    }
    static slideDown (element, duration = 500) {
        return new Promise(function (resolve, reject) {
            element.style.removeProperty('display')
            let display = window.getComputedStyle(element).display
            if (display === 'none') display = 'block'
            element.style.display = display
            let height = element.offsetHeight
            element.style.overflow = 'hidden'
            element.style.height = 0
            element.style.paddingTop = 0
            element.style.paddingBottom = 0
            element.style.marginTop = 0
            element.style.marginBottom = 0
            element.offsetHeight // eslint-disable-line no-unused-expressions
            element.style.transitionProperty = `height, margin, padding`
            element.style.transitionDuration = duration + 'ms'
            element.style.height = height + 'px'
            element.style.removeProperty('padding-top')
            element.style.removeProperty('padding-bottom')
            element.style.removeProperty('margin-top')
            element.style.removeProperty('margin-bottom')
            window.setTimeout(function () {
                element.style.removeProperty('height')
                element.style.removeProperty('overflow')
                element.style.removeProperty('transition-duration')
                element.style.removeProperty('transition-property')
            }, duration)
        })
    }
}

Vue.component('radio-btn-item', {
    props: ['name', 'value', 'value2', 'id', 'id2', 'title', 'checked'],
    template: `<div :class="name" class="form-row">
                    <p class="label-title">{{title}} : </p>
                    
                    <input-radio-comp :name="name" :id="id" :value="value" :title="value" v-bind:checked="checked ? 'checked' : ''" ></input-radio-comp>
                    
                    <input-radio-comp :name="name" :id="id2" :value="value2" :title="value2" v-bind:checked="!checked ? 'checked' : ''"></input-radio-comp>
                </div>`,
    data: function () {
        return {}
    },
    methods: {
    }
});

Vue.component('radio-btn-color', {
    props: ['name', 'id', 'id2', 'id3', 'id4', 'id5', 'id6', 'title', 'checked'],
    template: `<div :class="name" class="form-row">
                    <p class="label-title">{{title}} :</p>
                    
                    <input-radio-comp :name="name" :id="id" :value="id" :title="'blanc'"></input-radio-comp>
                    
                    <input-radio-comp :name="name" :id="id2" :value="id2" :title="'beige'"></input-radio-comp>
                    
                    <input-radio-comp :name="name" :id="id3" :value="id3" :title="'bleu clair'" v-bind:checked="!checked ? 'checked' : ''"></input-radio-comp>
                    
                    <input-radio-comp :name="name" :id="id4" :value="id4" :title="'mozaïque'"></input-radio-comp>
                    
                    <input-radio-comp :name="name" :id="id5" :value="id5" :title="'gris acier'"></input-radio-comp>
                    
                    <input-radio-comp :name="name" :id="id6" :value="id6" :title="'vert'"></input-radio-comp>

                </div>`,
    data: function () {
        return {

        }
    },
    methods: {}
});

Vue.component('input-btn-size', {
    props: ['length', 'width', 'depth', 'title'],
    template: `<div class="form-row size">
                <p class="label-title">{{title}} :</p>
                
                <input-number-comp :name="length" :id="length" :value="5" :title="'longueur'" :min="'2'" :max="'10'"></input-number-comp>
                
                <input-number-comp :name="width" :id="width" :value="3" :title="'largeur'" :min="'1'" :max="'10'"></input-number-comp>
                
                <input-number-comp :name="depth" :id="depth" :value="2" :title="'profondeur'" :min="'2'"></input-number-comp>
            </div>`,
    data: function () {
        return {}
    }
});

Vue.component('input-number-comp', {
    props: ['name', 'id', 'value', 'title', 'checked', 'min', 'max', 'depth'],
    template: `<div class="input pool-size" :class="title">
                    <input type="number" :name="name" :id="id" :min="min" :max="max" v-on:change="emitSize" v-model="dataVal">
                    <label :for="depth">{{ title | capitalize }}</label>
                </div>`,
    data: function () {
        return {
            dataVal: this.value
        }
    },
    methods: {
        emitSize: function () {
            console.log(this.name, this.value);
            var poolSize = [this.name, this.dataVal];
            this.$bus.$emit('emitSize', poolSize);
        }
    }
});

Vue.component('input-radio-comp', {
    props: ['name', 'id', 'value', 'title', 'checked'],
    template: `<div class="input">
                    <input type="radio" :name="name" :id="id" :value="value" :checked="checked" v-on:change="emitChecked">
                    <label :for="id">{{ title | capitalize }}</label>
                </div>`,
    data: function () {
        return {}
    },
    methods: {
        emitChecked: function () {
            var radioInput = [this.name, this.value];
            this.$bus.$emit('emitChecked', radioInput);
        }
    }
});

Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1)
});

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
    get () {
        return this.$root.bus
    }
});

var app = new Vue({
  el: '#app',
  data: {
      message: 'Configurateur VueJS/BabylonJS',
      bus
  },
  methods: {
      evtRadio: function (change) {//-----POOL FILTERS-----//
          console.log(change);
          updatePoolSizeMat();

          switch (change[0]) {
              case "shape":
                  this.shape(change[1]);
                  break;
              case "staircase":
                  this.staircase(change[1]);
                  break;
              case "water":
                 this.water(change[1]);
                  break;
              case "scenery":
                  this.landscape(change[1]);
                  break;
              case "textures":
                  this.textures(change[1]);
                  break;
              case "color":
                  this.color(change[1]);
                  break;
              case "longueur":
                  this.longueur(change[1]);
                  break;
              case "largeur":
                  this.largeur(change[1]);
                  break;
              case "profondeur":
                  this.profondeur(change[1]);
                  break;
          }
      },
      shape: function (e) {//CHANGE POOL SHAPE
          console.log("shape", e);

          pools[0].material = poolSwitchMat(poolActualMat);
          deleteMeshes("ground");

          var input = document.querySelector(".input.largeur");
          var inputLabel = document.querySelector(".input.largeur label");
          var bleuClair = document.querySelector("#bleu-clair");

          if (e == "rond") {

              pools[0].dispose(true, true);
              pools = pools.filter(item => item !== pools[0]);

              DOMAnimations.slideUp(input);
              inputLabel.innerText = "diamètre";

              deleteMeshes("rect");
              deleteMeshes("ground");
              addCircularPool(poolActualSizeZ, poolActualSizeX);

              deleteMeshes("equador");
              equador(poolActualSizeZ);

          } else {

              pools[0].dispose(true, true);
              pools = pools.filter(item => item !== pools[0]);

              DOMAnimations.slideDown(input);
              inputLabel.innerText = "longueur";

              deleteMeshes("circle");
              deleteMeshes("ground");
              addRectangularPool(poolActualSizeX, poolActualSizeY, poolActualSizeZ);

              deleteMeshes("equador");
              equador(poolActualSizeZ > poolActualSizeX ? poolActualSizeZ : poolActualSizeX);

          }
      },
      staircase: function (e) {//POOL STAIRCASE
            console.log("staircase", e);
          updateStaircase(e);
      },
      water: function (e) {//WATER OPACTIY
          if (e == "oui") {
              waterMesh.isVisible = true;
          } else {
              waterMesh.isVisible = false;
          }
      },
      landscape: function(e){//SCENERY MATERIAL
            console.log("landscape", e);

          var ground = scene.getMeshByID("ground-Elem");
          var inputRadio = [].slice.call(document.querySelectorAll(".water input[type=radio]"));

          console.log(inputRadio);

          if (e == "oui") {

              inputRadio.map(function (e) {
                  console.log(this);
                  e.disabled = false;
              });

              ground.isVisible = true;
              waterMesh.isVisible = true;

              liteThreeArray.map(function (e) {
                  e.isVisible = true;
              });
              mediumThreeArray.map(function (e) {
                  e.isVisible = true;
              });
          } else {

              inputRadio.map(function (e) {
                  console.log(this);
                  e.disabled = true;
              });

              ground.isVisible = false;
              waterMesh.isVisible = false;

              liteThreeArray.map(function (e) {
                  e.isVisible = false;
              });
              mediumThreeArray.map(function (e) {
                  e.isVisible = false;
              });
          }
      },
      textures: function(e){//SCENE TEXTURES MATERIAL
            console.log("textures", e);
          var ground = scene.getMeshByID("ground-Elem");

          if (e == "oui") {
              ground.material = groundFlatMat;
              ground.material = groundMat;

              skybox.material = skyboxFlatMaterial;
              skybox.material = skyboxMaterial;

          } else {
              ground.material = groundFlatMat;
              skybox.material = skyboxFlatMaterial;
          }

          updatePoolSizeMat();
      },
      color: function (e) {//CHANGE POOL COLOR
          poolSwitchMat(e);
      },
      longueur: function(e){
          pools[0].material = poolMatWhite;
          updatePoolSizeMat();

          if (shape) {
              pools[0].dispose(true, true);
              pools = pools.filter(item => item !== pools[0]);

              deleteMeshes("rect");
              deleteMeshes("ground");
              addRectangularPool(poolActualSizeX, poolActualSizeY, parseInt(e, 10));

              deleteMeshes("equador");
              equador(parseInt(e, 10) > poolActualSizeY ? parseInt(e, 10) : poolActualSizeY);

          } else {
              pools[0].dispose(true, true);
              pools = pools.filter(item => item !== pools[0]);

              deleteMeshes("circle");
              deleteMeshes("ground");
              addCircularPool(parseInt(e, 10), poolActualSizeX);

              deleteMeshes("equador");
              equador(parseInt(e, 10) > poolActualSizeY ? parseInt(e, 10) : poolActualSizeY);

          }

          poolMatMosaic.diffuseTexture.uScale = parseInt(e, 10) * 0.75;
      },
      largeur: function(e){
          pools[0].material = poolMatWhite;
          updatePoolSizeMat();
          pools[0].dispose(true, true);
          pools = pools.filter(item => item !== pools[0]);

          deleteMeshes("rect");
          deleteMeshes("ground");
          addRectangularPool(poolActualSizeX, parseInt(e, 10), poolActualSizeZ);

          deleteMeshes("equador");

          equador(parseInt(e, 10) > poolActualSizeZ ? parseInt(e, 10) : poolActualSizeZ);

          poolMatMosaic.diffuseTexture.vScale = parseInt(e, 10) * 0.75;
      },
      profondeur: function(e){
          pools[0].material = poolMatWhite;
          updatePoolSizeMat();
          if (shape) {
              pools[0].dispose(true, true);
              pools = pools.filter(item => item !== pools[0]);

              deleteMeshes("rect");
              deleteMeshes("ground");
              addRectangularPool(parseInt(e, 10), poolActualSizeY, poolActualSizeZ);
          } else {
              pools[0].dispose(true, true);
              pools = pools.filter(item => item !== pools[0]);

              deleteMeshes("circle");
              deleteMeshes("ground");
              addCircularPool(poolActualSizeZ, e);
          }
      }
  },
    created() {
        this.$bus.$on("emitChecked", this.evtRadio);
        this.$bus.$on("emitSize", this.evtRadio);
    }
});

//FONCTION WEBGL
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera", 51, 1.20, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.lowerBetaLimit = 0.5
    camera.lowerRadiusLimit = 3;
    camera.upperBetaLimit = 1.29;
    camera.upperRadiusLimit = 60;

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
    var poolActualSizeX, poolActualSizeY, poolActualSizeZ, poolActualMat, groundActualMat, staircaseActualMat;

    var updatePoolSizeMat = function () {
        poolActualSizeX = document.querySelector(".size #profondeur").value;
        poolActualSizeY = document.querySelector(".size #largeur").value;
        poolActualSizeZ = document.querySelector(".size #longueur").value;
        poolActualMat = document.querySelector(".color input:checked").value;
        groundActualMat = document.querySelector(".textures input:checked").value;
        staircaseActualMat = document.querySelector(".staircase input:checked").value;
    };

    var updateStaircase = function (bol) {
        var tube = scene.getMeshByID("tube");
        var tube2 = scene.getMeshByID("tube2");
        var bar = scene.getMeshByID("bar");
        var bar2 = scene.getMeshByID("bar2");
        var bar3 = scene.getMeshByID("bar3");

        if (bol == "oui") {
            tube.isVisible = tube2.isVisible = bar.isVisible = bar2.isVisible = bar3.isVisible = true;
        } else {
            tube.isVisible = tube2.isVisible = bar.isVisible = bar2.isVisible = bar3.isVisible = false;
        }

        tube.position.z = -(poolActualSizeZ / 2) + 0.15;
        tube2.position.z = -(poolActualSizeZ / 2) + 0.15;
        bar.position.z = -(poolActualSizeZ / 2) + 0.65;
        bar2.position.z = -(poolActualSizeZ / 2) + 0.65;
        bar3.position.z = -(poolActualSizeZ / 2) + 0.65;
    };

    updatePoolSizeMat();

    function poolSwitchMat(mat) {
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

    BABYLON.SceneLoader.ImportMesh("", "assets/meshes/", "boueesobj.obj", scene, function (meshes, particleSystems, skeletons) {
        var bouee = meshes[0];
        meshes[1].isVisible = false;
        var bouee3 = meshes[2];

        bouee.scaling = bouee3.scaling = new BABYLON.Vector3(0.0015, 0.0015, 0.0015);

        bouee.position.x = 0.5;
        bouee.position.y = -0.05;
        bouee.position.z = -0.5;

        bouee.position = new BABYLON.Vector3( 0.75, -0.05, -0.75);
        bouee3.position = new BABYLON.Vector3( -0.3, -0.05, 1.5);

        bouee.rotation.x = -0.1;
        bouee3.rotation.x = 0.1;

        var blueMat = new BABYLON.StandardMaterial("whiteMat", scene);
        blueMat.diffuseColor = new BABYLON.Color3(100/255, 100/255, 244/255);

        var pinkMat = new BABYLON.StandardMaterial("pinkMat", scene);
        pinkMat.diffuseColor = new BABYLON.Color3(225/255, 50/255, 149/255);

        var yellowMat = new BABYLON.StandardMaterial("yellowMat", scene);
        yellowMat.diffuseColor = new BABYLON.Color3(255/255, 182/255, 43/255);

        bouee.material = pinkMat;
        bouee3.material = yellowMat;

        var frameRate = 30;

        var animationBouee = new BABYLON.Animation("tutoAnimation", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];

        keys.push({
            frame: 0,
            value: 0.1
        });

        keys.push({
            frame: frameRate * 2,
            value: -0.1
        });

        keys.push({
            frame: frameRate * 4,
            value: 0.1
        });

        var easingFunction = new BABYLON.SineEase();

        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        animationBouee.setEasingFunction(easingFunction);

        animationBouee.setKeys(keys);

        bouee.animations.push(animationBouee);
        bouee3.animations.push(animationBouee);

        var anim = scene.beginAnimation(bouee, 0, frameRate * 4, true);
        var anim3 = scene.beginAnimation(bouee3, 0, frameRate * 4, true);

        water.addToRenderList(bouee);
        water.addToRenderList(bouee3);
    });

    //SKYBOX
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/img/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;

    var skyboxFlatMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxFlatMaterial.diffuseColor = new BABYLON.Color3(0.94, 0.33, 0.25);

    if (groundActualMat == "oui") {
        skybox.material = skyboxMaterial;
    } else {
        skybox.material = skyboxFlatMaterial;
    }

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
    poolMatGreen.diffuseColor = new BABYLON.Color3(0.21, 0.65, 0.41);
    var poolMatMosaic = new BABYLON.StandardMaterial("poolMatMosaic", scene);
    poolMatMosaic.diffuseTexture = new BABYLON.Texture("assets/img/texture-piscine.jpg", scene);
    poolMatMosaic.diffuseTexture.uScale = 4;
    poolMatMosaic.diffuseTexture.vScale = 3;

    //WATER MATERIAL
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 60, 60, 10, scene, false);
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

    var groundTexture = new BABYLON.Texture("assets/img/grass.jpg", scene);
    groundTexture.uScale = 15;
    groundTexture.vScale = 30;

    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = groundTexture;

    //THREES
    var liteThreeArray = [];
    var mediumThreeArray = [];

    var liteThreeMat = new BABYLON.StandardMaterial("liteThreeMat", scene);
    liteThreeMat.diffuseColor = new BABYLON.Color3(0.22, 0.67, 0.58);
    liteThreeMat.specular = new BABYLON.Color3(0, 0, 0);

    var liteThree = BABYLON.MeshBuilder.CreateCylinder("liteThree-0", {
        diameterTop: 0,
        diameterBottom: 0.5,
        height: 0.5,
        tessellation: 96
    }, scene);
    liteThree.position.x = random(-5, -20);
    liteThree.position.y = 0.25;
    liteThree.position.z = random(-5, -25);

    var mediumThree = BABYLON.MeshBuilder.CreateCylinder("mediumThree-0", {
        diameterTop: 0,
        diameterBottom: 1.5,
        height: 2,
        tessellation: 96
    }, scene);
    mediumThree.position.x = random(5, 17);
    mediumThree.position.y = 1;
    mediumThree.position.z = random(5, 10);

    liteThree.material = liteThreeMat;
    mediumThree.material = liteThreeMat;

    liteThreeArray.push(liteThree);
    mediumThreeArray.push(mediumThree);

    for (var i = 1; i < 20; i++) {
        var liteThreeClone = liteThree.clone("liteThree-" + i);
        liteThreeClone.position.x = random(-5, -20);
        liteThreeClone.position.y = 0.25;
        liteThreeClone.position.z = random(-5, -25);
        liteThreeArray.push(liteThreeClone);
        liteThreeClone.material = liteThreeMat;
    }

    for (var i = 1; i < 10; i++) {
        var mediumThreeClone = mediumThree.clone("mediumThree-" + i);
        mediumThreeClone.position.x = random(5, 17);
        mediumThreeClone.position.y = 1;
        mediumThreeClone.position.z = random(5, 10);
        mediumThreeArray.push(mediumThreeClone);
        mediumThreeClone.material = liteThreeMat;
    }

    for (var i = 1; i < 10; i++) {
        var mediumThreeClone = mediumThree.clone("mediumThree-" + (i + 10));
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
        var tube = BABYLON.MeshBuilder.CreateTube("tube", {
            path: stairPath,
            radius: 0.01,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            updatable: true
        }, scene);
        var tube2 = BABYLON.MeshBuilder.CreateTube("tube2", {
            path: stairPath,
            radius: 0.01,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            updatable: true
        }, scene);
        var bar = BABYLON.MeshBuilder.CreateTube("bar", {
            path: barsPath,
            radius: 0.01,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            updatable: true
        }, scene);
        var bar2 = BABYLON.MeshBuilder.CreateTube("bar2", {
            path: barsPath,
            radius: 0.01,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            updatable: true
        }, scene);
        var bar3 = BABYLON.MeshBuilder.CreateTube("bar3", {
            path: barsPath,
            radius: 0.01,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            updatable: true
        }, scene);

        tube.position = new BABYLON.Vector3(0.25, 0, 0);
        tube2.position = new BABYLON.Vector3(-0.25, 0, 0);
        bar.position = new BABYLON.Vector3(-0.25, 0, 0);
        bar2.position = new BABYLON.Vector3(-0.25, -0.25, 0);
        bar3.position = new BABYLON.Vector3(-0.25, -0.5, 0);

        tube2.rotation.y = tube.rotation.y = -Math.PI / 2;
        tube2.rotation.y = tube.rotation.y = -Math.PI / 2;

        tube.position.z = -(poolActualSizeZ / 2) + 0.15;
        tube2.position.z = -(poolActualSizeZ / 2) + 0.15;
        bar.position.z = -(poolActualSizeZ / 2) + 0.65;
        bar2.position.z = -(poolActualSizeZ / 2) + 0.65;
        bar3.position.z = -(poolActualSizeZ / 2) + 0.65;

        staircase = true;

    };

    var addCircularPool = function (d, h) {

        updatePoolSizeMat();

        var circularSwimmingPool = BABYLON.MeshBuilder.CreateCylinder("circle-PoolBase", {
            diameterTop: d,
            diameterBottom: d,
            height: h,
            tessellation: 96
        }, scene);
        var circularSwimmingPool2 = BABYLON.MeshBuilder.CreateCylinder("circle-PoolBase-2", {
            diameterTop: d,
            diameterBottom: d,
            height: h,
            tessellation: 96
        }, scene);
        var circularSwimmingPoolSubtract = BABYLON.MeshBuilder.CreateCylinder("circle-SubPool", {
            diameterTop: (d - 0.5),
            diameterBottom: (d - 0.5),
            height: h,
            tessellation: 96
        }, scene);
        circularSwimmingPoolSubtract.position.y = 0.1;
        circularSwimmingPool.isVisible = circularSwimmingPool2.isVisible = circularSwimmingPoolSubtract.isVisible = false;

        //SUBSTRACT POOL
        var swimmingPoolCSG = BABYLON.CSG.FromMesh(circularSwimmingPool);
        [circularSwimmingPoolSubtract].forEach(function (decMesh) {
            swimmingPoolCSG.subtractInPlace(BABYLON.CSG.FromMesh(decMesh));
        });

        var pool = swimmingPoolCSG.toMesh("circle-Pool", circularSwimmingPool.material, scene, false);
        pool.position.y = circularSwimmingPool2.position.y = -((h / 2) - 0.1);
        pools.push(pool);
        poolSwitchMat(poolActualMat);

        shape = false;

        if (staircase) {
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
        water.addToRenderList(skybox);
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
        var swimmingPoolSubtract = BABYLON.MeshBuilder.CreateBox("rect-SubPool", {
            height: h,
            width: (w - 0.5),
            depth: (d - 0.5)
        }, scene);
        swimmingPoolSubtract.position.y = 0.1;
        swimmingPoolSubtract.isVisible = swimmingPool.isVisible = swimmingPool2.isVisible = false;

        //SUBSTRACT POOL
        var swimmingPoolCSG = BABYLON.CSG.FromMesh(swimmingPool);
        [swimmingPoolSubtract].map(function (decMesh) {
            swimmingPoolCSG.subtractInPlace(BABYLON.CSG.FromMesh(decMesh));
        });

        var pool = swimmingPoolCSG.toMesh("rect-Pool", swimmingPool.material, scene, false);
        pool.position.y = swimmingPool2.position.y = -((h / 2) - 0.1);
        pools.push(pool);
        poolSwitchMat(poolActualMat);

        shape = true;

        if (staircase) {
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
        water.addToRenderList(skybox);
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

        var groundTexture = new BABYLON.Texture("assets/img/grass.jpg", scene);
        groundTexture.uScale = 15;
        groundTexture.vScale = 30;

        var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseTexture = groundTexture;

        if (groundActualMat == "oui") {
            ground.material = groundMat;
        } else {
            ground.material = groundFlatMat;
        }

        updatePoolSizeMat();

    };

    addRectangularPool(poolActualSizeX, poolActualSizeY, poolActualSizeZ);

    console.log(pools);

    // EQUADOR

    var equador = function (rad) {
        var equadorPoints = [];
        if (rad > 9) {
            rad = 9
        } else {
        }
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
    updateStaircase(staircaseActualMat);

    //LIST SCENE MESHES
    console.log(scene.meshes);

    //ENGINE RENDER

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
