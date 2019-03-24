import * as THREE from 'three';
import OrbitControlsFunc from 'three-orbit-controls';
const OrbitControls = OrbitControlsFunc(THREE);
import { AxisHelper } from './Utils/Axis';

export class LoaderBase {
    constructor() {
        this.dom = {
            html: document.documentElement,
            container: document.querySelector('.loader'),
            sidebar: document.querySelector('#js-sidebar'),
        };
        this.dom.html.classList.add('loading');
        this.raf = null;
        this.setup();
    }
    setup() {
        this.setupDebug();
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupHelpers();
        this.listen();
        this.onResize();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    stop() {
        cancelAnimationFrame(this.raf);
    }
    loop() {
        this.updateBase();
        this.update();
        this.render();
        this.raf = window.requestAnimationFrame(() => this.loop());
    }
    updateBase() {
        if (this.isOrbit) {
            this.controls.update();
        }
    }
    setupDebug() {
        this.isGrid = true;
        this.isOrbit = true;
    }
    setupScene() {
        this.scene = new THREE.Scene();
    }
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(45, 0, 0.0001, 10000);
        this.cameraBaseX = this.isGrid ? -20 : 0;
        this.cameraBaseY = this.isGrid ? 15 : 0;
        this.cameraBaseZ = this.isGrid ? 20 : 30;

        this.camera.position.x = this.cameraBaseX;
        this.camera.position.y = this.cameraBaseY;
        this.camera.position.z = this.cameraBaseZ;
    }
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        this.dom.container.appendChild(this.renderer.domElement);
    }
    setupControls() {
        if (this.isOrbit) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.9;
            this.controls.enableKeys = false;
            this.controls.enablePan = false;
            this.controls.minDistance = 4;
            this.controls.maxDistance = 500;
        }
    }
    setupHelpers() {
        if (this.isGrid) {
            this.gridOpacityMap = [
                0.4, // 1
                0.2, // 2
                0.2, // 3
                0.2, // 4
                0.1, // 5
                0.2, // 6
                0.1, // 7
                0.1, // 8
            ];
            this.gridHelper = new THREE.GridHelper(300, 60, 0xffffff, 0xffffff);
            this.gridHelper.material.transparent = true;
            this.gridHelper.material.opacity = this.gridOpacityMap[3];
            this.scene.add(this.gridHelper);

            this.axisOpacityMap = [
                1, // 1
                0.6, // 2
                0.6, // 3
                0.6, // 4
                0.3, // 5
                0.6, // 6
                0.3, // 7
                0.3, // 8
            ];
            this.axisHelper = new AxisHelper(150, this.axisOpacityMap[3]);
            this.scene.add(this.axisHelper);
            this.camera.lookAt(new THREE.Vector3());
        }
    }
    listen() {
        window.addEventListener('resize', e => this.onResize(e));
    }
    onResize() {
        this.width = window.innerWidth - this.dom.sidebar.offsetWidth;
        this.height = window.innerHeight;
        this.dpr = window.devicePixelRatio > 1 ? 2 : 1;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setPixelRatio(this.dpr);
        this.renderer.setSize(this.width, this.height);
        this.updateBase();
    }
}
