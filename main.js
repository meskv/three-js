import * as THREE from 'three';
import "./style.css"
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create Scene
const scene = new THREE.Scene();

// Create Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff83,
  roughness: 0.35,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Create Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Create Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// Resizing
window.addEventListener('resize', () => {
  // Update Sizes
  // console.log(window.innerWidth, window.innerHeight)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});


// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const loop = () => {
  // Update Objects
  controls.update();
  light.position.x += 0.1;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

// Timeline Animation
const tl = gsap.timeline({ defaults: { ease: 'power1.out', duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 });
// tl.fromTo("nav", { opacity: 0 }, { opacity: 1 }, "-=1");
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 }, "-=1");


// Mouse Animation Color
let mouseDown = false;
let rgb = [0, 0, 0];
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    const moveX = e.movementX;
    const moveY = e.movementY;

    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150
    ];
    // lets animate the color
    gsap.to(mesh.material.color, {
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
      duration: 0.5,
    });
  }
});