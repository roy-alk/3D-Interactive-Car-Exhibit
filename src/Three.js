import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import React, { useState, useEffect } from 'react';

const Three = ({popup, setPopup, obj, setObj}) => {

	useEffect(() => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

	var container = document.getElementById('1');
	var w = container.clientWidth;
	var h = container.clientHeight;

	const renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0x000000, 0);

	renderer.setSize(w, h);
	//renderer.setSize( window.innerWidth, window.innerHeight );
	
	container.appendChild( renderer.domElement );

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.update();

	camera.position.set(-1,4,12);

	const boxGeometry1 = new THREE.BoxGeometry(3.5,1,5.5);
	const boxGeometry = new THREE.BoxGeometry(3.5,1.5,5);

	const boxGeometry4 = new THREE.BoxGeometry(3.5,1.5,7);
	const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

	const boxMesh = new THREE.Mesh(boxGeometry1, boxMaterial);

	const boxMesh2 = new THREE.Mesh(boxGeometry, boxMaterial);
	const boxMesh3 = new THREE.Mesh(boxGeometry, boxMaterial);
	const boxMesh4 = new THREE.Mesh(boxGeometry4, boxMaterial);

	boxMesh.position.set(-6,0,5.5);	
	boxMesh.rotation.y = Math.PI *1.5;
	boxMesh.name = 'boxMesh1';


	boxMesh2.position.set(-2,0,-0.5	);	
	boxMesh2.rotation.y = Math.PI*1.25;
	boxMesh2.name = 'boxMesh2';


	boxMesh3.position.set(5.5,0,0.5);
	boxMesh3.rotation.y = Math.PI;
	boxMesh3.name = 'boxMesh3';


	boxMesh4.position.set(14,-0.6,2);
	boxMesh4.rotation.y = -Math.PI/3.5;
	boxMesh4.name = 'boxMesh4';
	
	//outline of light hitboxes
	boxMesh.visible = false;
	boxMesh2.visible = false;
	boxMesh3.visible = false;
	boxMesh4.visible = false;

	scene.add(boxMesh);
	scene.add(boxMesh2);
	scene.add(boxMesh3);
	scene.add(boxMesh4);
	



	const loader = new GLTFLoader();
	loader.load(
	'src/assets/futuristic_benz.glb', 
	(gltf) => {
		const model = gltf.scene;
		model.scale.set(1.5, 1.5, 1.5);

		model.name = "mercedes benz biome";

		model.rotation.y = Math.PI / 2;
		model.position.set(-6,-1,5);
		scene.add(model);

  },
	undefined,
	(error) => {
	  console.error('An ERROR!!!!! occurred while loading the model:', error);
	}
);

loader.load(
	'src/assets/lambo_v12_vision_gran_turismo_2020.glb', 
	(gltf) => {
		const model = gltf.scene;
		model.scale.set(2, 2, 2);
		model.name = "lambo v12 vision";
		
		model.rotation.y = Math.PI /4;
		model.position.set(-1,-1,0);

		scene.add(model);
	}
);

loader.load(
	'src/assets/mazda_rx-vision_gt3_concept.glb', 
		(gltf) => {
			const model = gltf.scene;
			model.scale.set(0.3, 0.3, 0.3);

			model.rotation.y = -Math.PI;
			model.name = "mazda rx vision gt3";
	
			model.position.set(1,-0.75,6);
			scene.add(model);

		}
);

loader.load(
	'src/assets/pagani_huayra_r.glb', 
		(gltf) => {
			const model = gltf.scene;
			model.scale.set(170, 170, 170);
			model.rotation.y = -Math.PI/3;	
			model.name = "pagani huayra r";
			
			model.position.set(15,-1.9,2);
			scene.add(model);
		}
);



//whole scene lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, Intensity
scene.add(ambientLight);

//lighting for car and shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
directionalLight.position.set(1, 1, 1); 
scene.add(directionalLight);






function animate() {
	requestAnimationFrame( animate );
	controls.update();
	
	renderer.render( scene, camera );
}

animate();


const raycaster = new THREE.Raycaster();

let currentPointLight = null;
// Add point lights to specific box mesh positions
function addPointLight(boxMesh) {
	if (currentPointLight) {
		scene.remove(currentPointLight);
	}
	const pointLight = new THREE.PointLight(0x00FFFF, 30, 10);
	pointLight.position.copy(boxMesh.position);
	pointLight.position.y += 2; // Place the light 2 units above the boxMesh
	scene.add(pointLight);
	currentPointLight = pointLight;
  }


function onMouseDown(event) {
  
	const rect = renderer.domElement.getBoundingClientRect();
  	const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  	const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  	const mouse = new THREE.Vector2(x, y);
  	raycaster.setFromCamera(mouse, camera);

	const intersects = raycaster.intersectObjects([boxMesh, boxMesh2, boxMesh3, boxMesh4], true);

  	if (intersects.length > 0) {
		const intersectedObject = intersects[0].object;
		//zoom in to mesh when clicked and zoom out with cancel button
		controls.target.copy(intersectedObject.position);

		//props to call in app for descriptions
		setPopup(true);
		setObj(intersectedObject.name);

		// Update camera position and look at the clicked object
		controls.enabled = true;
		controls.minDistance = 3; 
		controls.maxDistance = 9;

		controls.target.copy(intersectedObject.position);
  	}else{
		setPopup(false);
		controls.enabled = false;
	}
}

function removePointLight() {
	if (currentPointLight) {
	  scene.remove(currentPointLight);
	  currentPointLight = null;
	}
  }

function onPointerMove(event) {

  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  const mouse = new THREE.Vector2(x, y);
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([boxMesh, boxMesh2, boxMesh3, boxMesh4], true);

  if (intersects.length > 0) {
	addPointLight(intersects[0].object)
  } else {
    removePointLight();
  }
}






	function onMouseUp(event) {
		controls.enabled = true;
  }



  	document.addEventListener('mousedown', onMouseDown,false);

	document.addEventListener('mouseup', onMouseUp,false);

	document.addEventListener('pointermove', onPointerMove, false);


// Cleanup on unmount
	return () => {
		renderer.domElement.remove();
		// Any additional cleanup code
		renderer.domElement.removeEventListener('mousedown', onMouseDown,false);
		renderer.domElement.removeEventListener('mouseup', onMouseUp,false);
		renderer.domElement.removeEventListener('pointermove', onPointerMove,false);

	};
	}, []);

}



export default Three;