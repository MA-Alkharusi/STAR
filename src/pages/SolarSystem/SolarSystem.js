

//imports
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//image imports for the planets' wraps
import starsTexture from './SSimg/stars.jpg';
import sunTexture from './SSimg/sun.jpg';
import mercuryTexture from './SSimg/mercury.jpg';
import venusTexture from './SSimg/venus.jpg';
import earthTexture from './SSimg/earth.jpg';
import marsTexture from './SSimg/mars.jpg';
import jupiterTexture from './SSimg/jupiter.jpg';
import saturnTexture from './SSimg/saturn.jpg';
import saturnRingTexture from './SSimg/saturnRing.jpg';
import uranusTexture from './SSimg/uranus.jpg';
import uranusRingTexture from './SSimg/uranusRing.jpg';
import neptuneTexture from './SSimg/neptune.jpg';
import plutoTexture from './SSimg/pluto.jpg';

import './SolarSystem.css';

//function to call elsewhere
function SolarSystem() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  useEffect(() => {
    //renderer, camera and scene declarations for three.js
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('solar-system-container').appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    const orbit = new OrbitControls(camera, renderer.domElement);

    camera.position.set(-90, 140, 140);
    orbit.update();

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture]);

    const textureLoader = new THREE.TextureLoader();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Listen to mousemove event
    function onMouseMove(event) {
      // Calculate normalized coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const planetInfo = intersects[0].object.userData?.planetInfo;
        setHoveredPlanet(planetInfo);
      } else {
        setHoveredPlanet(null);
      }
    }

    // Add event listener to window
    window.addEventListener('mousemove', onMouseMove);

    const sunGeo = new THREE.SphereGeometry(16, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunTexture)
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    function createPlanete(size, texture, position, ring, planetInfo) {
      const geo = new THREE.SphereGeometry(size, 30, 30);
      const mat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture),
      });
      const mesh = new THREE.Mesh(geo, mat);
      const obj = new THREE.Object3D();
      obj.add(mesh);
      if (ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ring.texture),
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
      }
      scene.add(obj);
      mesh.position.x = position;

      // Store planetInfo as userData
      mesh.userData = { planetInfo };

      return { mesh, obj };
    }

   /*create planets by adding size, textures, x position and ring where applicable.
    Calculated the size of the planets by giving a value 3, then either multiplying or
    dividing by the size relative to the other planets. e.g Earth = 6, mars = half the size of Earth
    which = 1.5.*/

    const mercury = createPlanete(3, mercuryTexture, 20, null, {
      name: 'Mercury',
      info: 'Terrestrial Planet',
    });  //mercury 1/3 the size

    const venus = createPlanete(6, venusTexture, 25, null, {
      name: 'Venus',
      info: 'Terrestrial Planet',
    });    //Venus = 6km radius (slightly smaller)

    const earth = createPlanete(6.2, earthTexture, 30, null, {
      name: 'Earth',
      info: 'Terrestrial Planet',
    });

    const mars = createPlanete(4, marsTexture, 78, null, {
      name: 'Mars',
      info: 'Terrestrial Planet',
    });       //mars about half the size

    const jupiter = createPlanete(12, jupiterTexture, 100, null, {
      name: 'Jupiter',
      info: 'Gas Giant',
    });//jupiter 11x the size

    const saturn = createPlanete(10, saturnTexture, 138, {    //saturn 9x the size
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexture
    }, {
      name: 'Saturn',
      info: 'Gas Giant',
    });

    const uranus = createPlanete(7, uranusTexture, 176, {     //uranus 4x the size
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexture
    }, {
      name: 'Uranus',
      info: 'Ice Giant',
    });

    const neptune = createPlanete(7, neptuneTexture, 200, null, {
      name: 'Neptune',
      info: 'Ice Giant',
    });     //slightly smaller than uranus

    const pluto = createPlanete(2.8, plutoTexture, 216, null, {
      name: 'Pluto',
      info: 'Dwarf Planet',
    });       //slightly larger than 1/6 the size

    const pointLight = new THREE.PointLight(0xffffff, 10, 1000);
    pointLight.position.set(-200, 250, 250);
    scene.add(pointLight);

    function animate() {
      sun.rotateY(0.004);
      mercury.mesh.rotateY(0.004);
      venus.mesh.rotateY(0.002);
      earth.mesh.rotateY(0.005);
      mars.mesh.rotateY(0.005);
      jupiter.mesh.rotateY(0.001);
      saturn.mesh.rotateY(0.038);
      uranus.mesh.rotateY(0.03);
      neptune.mesh.rotateY(0.032);
      pluto.mesh.rotateY(0.008);

      mercury.obj.rotateY(0.01);
      venus.obj.rotateY(0.015);
      earth.obj.rotateY(0.001);
      mars.obj.rotateY(0.003);
      jupiter.obj.rotateY(0.005);
      saturn.obj.rotateY(0.0009);
      uranus.obj.rotateY(0.0005);
      neptune.obj.rotateY(0.0003);
      pluto.obj.rotateY(0.0006);

      pointLight.position.copy(sun.position);
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);


    return () => {
      // Remove event listener on cleanup
      window.removeEventListener('mousemove', onMouseMove);

      const container = document.getElementById('solar-system-container');
      container.parentNode.removeChild(container);

      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <div id="solar-system-container" className="solar-system-container" />
      {hoveredPlanet && (
        <div className="planet-info">
          <h2>{hoveredPlanet.name}</h2>
          <p>{hoveredPlanet.info}</p>
        </div>
      )}
    </div>
  );
}

export default SolarSystem;


