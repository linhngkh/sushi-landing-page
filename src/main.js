import * as THREE from "three";
import gsap from "gsap";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// scene
const scene = new THREE.Scene();

//CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// render == draw
renderer.render(scene, camera);
//heart shape
const x = 5,
  y = 5;

const heartShape = new THREE.Shape();

heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

const geometry = new THREE.ShapeGeometry(heartShape);
// material : wrapping paper for an object
const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
const heart = new THREE.Mesh(geometry, material);
scene.add(heart);

const pointLight = new THREE.PointLight(0xfff);
pointLight.position.set(4, 4, 4);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xfff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  heart.rotation.x += 0.005;
  heart.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// scene background
const spaceTexture = new THREE.TextureLoader().load("milky-way.jpeg");
scene.background = spaceTexture;
