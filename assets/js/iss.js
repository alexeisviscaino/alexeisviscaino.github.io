import {
    OrbitControls
} from './OrbitControls.js';

import {
    OBJLoader
} from './OBJLoader.js';

import {
    MTLLoader
} from './MTLLoader.js';

import {
    Lensflare,
    LensflareElement
} from './Lensflare.js';

import {
    TWEEN
} from './tween.js';

class Canvas {
    constructor(selector) {
        this.selector = selector;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.frameEvent = new Event('frame');
        this.textureLoader = new THREE.TextureLoader();
        this.fontLoader = new THREE.FontLoader();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    setScene() {
        this.scene = new THREE.Scene();
        this.scenary = new THREE.Object3D;
        
        this.scenary.rotation.y = 5.85;
        this.scene.add(this.scenary);
    }

    setCamera() {
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera2 = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);

        this.camera.position.z = 3;
        this.camera.position.y = 0;
        this.camera2.position.x = 0;
        this.camera2.position.y = 0.6;
        this.camera2.position.z = 1.30;

        this.activeCamera = this.camera2;
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(this.width, this.height);
        this.canvas = document.querySelector(this.selector).appendChild(this.renderer.domElement);
    }

    setControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1.35;
        this.controls.maxDistance = 10;
    }

    addLights() {
        this.light = new THREE.HemisphereLight(0x8ed4ff, 0x2020b9, 0.7);
        this.scene.add(this.light);
        this.pointLight = new THREE.PointLight(0xffffff, 1, 0, 2);
        this.scene.add(this.pointLight);

        this.lensflare = new Lensflare();
        this.textureFlare1 = this.textureLoader.load("./assets/img/star.png");
        this.lensflare.addElement(new LensflareElement(this.textureFlare1, 512, 0, new THREE.Color(0.3, 0.3, 0.4)));
        this.pointLight.add(this.lensflare);
    }

    render() {
        this.renderer.render(this.scene, this.activeCamera);
        this.canvas.dispatchEvent(this.frameEvent);
        this.frameRequest = window.requestAnimationFrame(this.render.bind(this));
    }

    setJsonRequest() {
        this.getJSON = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function () {
                var status = xhr.status;
                if (status === 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status, xhr.response);
                }
            };
            xhr.send();
        };
    }

    addSky() {
        this.skydomeGemotry = new THREE.SphereGeometry(1000, 25, 25);
        this.skydomeMaterial = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load("./assets/img/galaxy-starfield.png")
        });
        this.skydome = new THREE.Mesh(this.skydomeGemotry, this.skydomeMaterial);
        this.skydome.material.side = THREE.BackSide;
        this.scene.add(this.skydome);
    }

    addEarth() {
        let radius = 1,
            segments = 50;
        this.earthGeometry = new THREE.SphereGeometry(radius, segments, segments);
        this.dayNightUniforms = {
            sunDirection: {
                value: new THREE.Vector3(0, 0, 0)
            },
            dayTexture: {
                value: this.textureLoader.load('./assets/img/earth-texture.jpg')
            },
            nightTexture: {
                value: this.textureLoader.load('./assets/img/earth-night.jpg')
            }
        }

        this.shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.dayNightUniforms,
            vertexShader: this.dayNightShader.vertex,
            fragmentShader: this.dayNightShader.fragment
        });
        this.earth = new THREE.Mesh(this.earthGeometry, this.shaderMaterial);
        this.earth.rotation.y = Math.PI;
        this.scenary.add(this.earth);
    }

    addEquador() {
        let equadorPoints = [];
        let scopeRadius = 1;
        let equadorRadius = 1.01;
        let theta = 0;
        let Y = 0;

        this.lineMaterial = new THREE.LineDashedMaterial({
            color: 0xffffff,
            linewidth: 0.1,
            scale: 1,
            dashSize: 0.05,
            gapSize: 0.05,
            transparent: true,
            opacity: 0.5
        });

        this.lineGeometry = new THREE.Geometry();
        for (var i = 0; i < 64; i++) {
            this.lineGeometry.vertices.push(new THREE.Vector3(equadorRadius * Math.cos(theta), 0, equadorRadius * Math.sin(theta)));
            theta += 0.1;
        }

        this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);
        this.line.computeLineDistances();
        this.scenary.add(this.line);
    }

    addClouds() {
        this.skyGeometry = new THREE.SphereGeometry(1.01, 48, 32)
        this.skyMaterial = new THREE.MeshPhongMaterial({
            map: this.textureLoader.load('./assets/img/cloudimage.png'),
            transparent: true,
            opacity: 0.8
        });

        this.skyMesh = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
        this.scenary.add(this.skyMesh);
    }

    addIss() {
        this.mtlLoader = new MTLLoader();
        this.mtlLoader.setPath("./assets/meshes/");
        let that = this;
        this.mtlLoader.load('iss.mtl', function (materials) {

            materials.preload();

            that.objLoader = new OBJLoader();
            that.objLoader.setMaterials(materials);
            that.objLoader.setPath("./assets/meshes/");

            that.objLoader.load('iss.obj', function (object) {
                that.ISS = object;
                that.ISS.scale.set(0.03, 0.03, 0.03);
                that.scenary.add(that.ISS);
            });
        });
    }

    addIssScope() {
        let scopeRadius = 0.3;
        let theta = 0;

        let scopeMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 0.1,
            transparent: true,
            opacity: 0.5
        });

        let scopeGeometry = new THREE.Geometry();

        for (var i = 0; i < 64; i++) {
            scopeGeometry.vertices.push(new THREE.Vector3(scopeRadius * Math.cos(theta), 0, scopeRadius * Math.sin(theta)));
            theta += 0.1;
        }

        scopeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));

        this.scopeLine = new THREE.Line(scopeGeometry, scopeMaterial);
        this.scopeLine.rotation.y = Math.PI / 2;
        this.scenary.add(this.scopeLine);
    }

    addText() {
        let that = this;
        this.fontLoader.load('./assets/fonts/helvetiker_regular.typeface.json', function (font) {
            let xMid;
            let matLite = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide
            });
            let title = "ISS FROM SPACE";
            let button = "ENTER"

            that.titleShapes = font.generateShapes(title, 30);
            that.titleGeometry = new THREE.ShapeBufferGeometry(that.titleShapes);
            that.titleGeometry.computeBoundingBox();
            xMid = -0.5 * (that.titleGeometry.boundingBox.max.x - that.titleGeometry.boundingBox.min.x);
            that.titleGeometry.translate(xMid, 0, 0);
            that.mainText = new THREE.Mesh(that.titleGeometry, matLite);
            that.mainText.position.z = -160;
            that.mainText.position.y = 47;
            that.scene.add(that.mainText);

            that.buttonShapes = font.generateShapes(button, 0.03);
            that.buttonGeometry = new THREE.ShapeBufferGeometry(that.buttonShapes);
            that.buttonGeometry.computeBoundingBox();
            xMid = -0.5 * (that.buttonGeometry.boundingBox.max.x - that.buttonGeometry.boundingBox.min.x);
            that.buttonGeometry.translate(xMid, 0, 0);
            that.buttonText = new THREE.Mesh(that.buttonGeometry, matLite);
            that.buttonText.position.z = 1;
            that.buttonText.position.y = 0.5;
            that.scene.add(that.buttonText);

        });
    }

    addPlaneMeshClick() {
        this.planeGeo = new THREE.PlaneGeometry(0.25, 0.1, 32);
        this.planeMat = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0
        });
        this.clickPlane = new THREE.Mesh(this.planeGeo, this.planeMat);
        this.clickPlane.position.x = 0;
        this.clickPlane.position.y = 0.5;
        this.clickPlane.position.z = 0.95;
        this.scene.add(this.clickPlane);
    }

    addSun() {
        this.sunGeometry = new THREE.SphereGeometry(25, 48, 32);
        this.sunMaterial = new THREE.MeshPhongMaterial({
            map: this.textureLoader.load('./assets/img/sunmap2k.jpg'),
            emissive: 0xffffff,
            emissiveIntensity: 0.7
        });
        this.sunMaterial.map.minFilter = THREE.LinearFilter;

        this.sunMesh = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
        this.sunMesh.position.set(0, 0, 500);
        this.scene.add(this.sunMesh);
    }

    get dayNightShader() {
        return {
            vertex: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vSunDir;

                uniform vec3 sunDirection;

                void main() {
                    vUv = uv;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

                    vNormal = normalMatrix * normal;
                    vSunDir = mat3(viewMatrix) * sunDirection;

                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragment: `
                uniform sampler2D dayTexture;
                uniform sampler2D nightTexture;

                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vSunDir;

                void main(void) {
                    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
                    vec3 nightColor = texture2D(nightTexture, vUv).rgb;

                    float cosineAngleSunToNormal = dot(normalize(vNormal), normalize(vSunDir));

                    cosineAngleSunToNormal = clamp(cosineAngleSunToNormal * 5.0, -1.0, 1.0);

                    float mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;

                    vec3 color = mix(nightColor, dayColor, mixAmount);

                    gl_FragColor = vec4(color, 1.0);
                }
            `
        }
    }

    callApi() {
        let that = this;
        this.getJSON('http://api.open-notify.org/iss-now.json', function (err, data) {
            if (err != null) {
                alert("une erreur est survenue sur l'api");
            } else {

                var lat = parseInt(data['iss_position']['latitude'], 10);
                var long = parseInt(data['iss_position']['longitude'], 10) * -1;

                that.issCoord = that.geodeticToCartesian(lat, long, 1.2);
                that.scopeCoord = that.geodeticToCartesian(lat, long, 0.967);

            }
        });
    }

    geodeticToCartesian(lat, long, rad) {
        let phi = (90 - lat) * (Math.PI / 180);
        let theta = (long + 180) * (Math.PI / 180);

        let X1 = ((rad) * Math.sin(phi) * Math.cos(theta));
        let Z1 = ((rad) * Math.sin(phi) * Math.sin(theta));
        let Y1 = ((rad) * Math.cos(phi));

        var coordArray = [X1, Y1, Z1];

        return coordArray;
    }

    onDocumentMouseDown(event) {
        event.preventDefault();

        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera2);

        let meshObjects = [this.buttonText, this.clickPlane];
        let intersects = this.raycaster.intersectObjects(meshObjects);

        let that = this;

        if (intersects.length > 0) {
            this.buttonText.material.transparent = true;
            //this.titleAnimation(this);
            this.cameraAnimation(this);
        }

    }

    onDocumentMouseMove(event) {
        event.preventDefault();

        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera2);
        if (this.buttonText != undefined && this.clickPlane != undefined) {
            this.intersects = this.raycaster.intersectObjects([this.buttonText, this.clickPlane]);
        }
        var canvas = document.body.getElementsByTagName('canvas')[0];

        if (this.buttonText != undefined && this.clickPlane != undefined && this.intersects.length > 0) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "default";
        }

    }

    cameraAnimation(that) {
        let camera2Coords = that.camera2.position;
        let camTween = new TWEEN.Tween(camera2Coords)
            .to({
                x: that.camera.position.x,
                y: that.camera.position.y,
                z: that.camera.position.z
            }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete(function () {
                that.activeCamera = that.camera;
                that.setControls();
            })
            .onStart(function () {
                new TWEEN.Tween(that.buttonText.material).to({
                    opacity: 0
                }, 1000).easing(TWEEN.Easing.Quadratic.Out).start();
            })
            .start();

        let opacity = 1;
        let targetOpacity = 0;
    }

    animate() {
        this.canvas.addEventListener('frame', () => {
            let t = Date.now() / (-13752636);
            this.sunMesh.position.x = Math.sin(t) * 1000;
            this.sunMesh.position.z = Math.cos(t) * 1000;

            this.pointLight.position.x = Math.sin(t) * 950;
            this.pointLight.position.z = Math.cos(t) * 950;

            this.dayNightUniforms.sunDirection.value.copy(this.sunMesh.position);
            this.dayNightUniforms.sunDirection.value.normalize();

            if (this.ISS != undefined && this.issCoord != undefined) {
                this.ISS.position.set(this.issCoord[0], this.issCoord[1], this.issCoord[2]);
                this.ISS.lookAt(new THREE.Vector3(0, 0, 0));

                this.scopeLine.position.set(this.scopeCoord[0], this.scopeCoord[1], this.scopeCoord[2]);
                this.scopeLine.lookAt(new THREE.Vector3(0, 0, 0));
            }

            this.skyMesh.rotation.y += 0.0001;
            if (this.controls) {
                this.controls.update();
            }

            TWEEN.update();
            this.renderer.render(this.scene, this.activeCamera);
        });
    }

    init() {
        let that = this;

        this.setScene();
        this.setCamera();
        this.setRenderer();
        this.addLights();
        this.render();
        this.addSky();
        this.addEquador();
        this.addEarth();
        this.addPlaneMeshClick();
        this.addText();
        this.addIss();
        this.addIssScope();
        this.addClouds()
        this.addSun();
        this.animate();
        this.setJsonRequest();
        this.callApi();

        document.addEventListener('mousedown', function () {
            that.onDocumentMouseDown(event);
        });
        document.addEventListener('mousemove', function () {
            that.onDocumentMouseMove(event);
        });
        setInterval(function () {
            that.callApi();
        }, 5000);
    }

}

let canvas = new Canvas('#container');
canvas.init();
