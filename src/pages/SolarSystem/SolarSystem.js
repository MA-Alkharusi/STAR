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
import saturnRingTexture from './SSimg/saturnRing.png';
import uranusTexture from './SSimg/uranus.jpg';
import uranusRingTexture from './SSimg/uranusRing.png';
import neptuneTexture from './SSimg/neptune.jpg';
import plutoTexture from './SSimg/pluto.jpg';

import mercuryImage from './SSimg/mercury3.jpg';
import venusImage from './SSimg/venus3.jpg';
import earthImage from './SSimg/Earth3.jpg';
import marsImage from './SSimg/mars3.jpg';
import jupiterImage from './SSimg/jupiter3.png';
import saturnImage from './SSimg/saturn3.webp';
import uranusImage from './SSimg/uranus3.jpg';
import neptuneImage from './SSimg/neptune3.jpg';
import plutoImage from './SSimg/pluto3.webp';
import sunImage from './SSimg/sun3.jpg';

import './SolarSystem.css';
import { useNavigate } from 'react-router-dom';

//function to call elsewhere
function SolarSystem() {

  const navigate = useNavigate(); 
  //goHome is a function that is used to navigate back to the Home page
  const goHome = () => {
    navigate('/home'); // This will navigate back to the Home page
  };

  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  useEffect(() => {
    //renderer, camera and scene declarations for three.js
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('solar-system-container').appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

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
        let planetInfo = intersects[0].object.userData?.planetInfo;
    
        // Check if the hovered object is the sun
        if (!planetInfo && intersects[0].object === sun) {
          planetInfo = {
            name: 'The Sun',
            Sinfo: 'Yellow Dwarf Star',
            Ssize: '1.39 million kilometres',
            Slocation: 'The Milky Way Galaxy',
            temperature: '5500℃',
            description: 'The Sun, residing at the solar systems core, is a blazing sphere of hot plasma, fueling life on Earth. In around 5 billion years, it will metamorphose into a Red Giant, marking the next chapter in its cosmic cycle.',
            image: sunImage, // You can use the sun texture or another suitable image
          };
        }
    
        setHoveredPlanet(planetInfo);
      } else {
        setHoveredPlanet(null);
      }
    }
    

    // Add event listener to window
    window.addEventListener('mousemove', onMouseMove);

   const sunGeo = new THREE.SphereGeometry(40, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunTexture)
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    function createPlanete(size, texture, position, ring, planetInfo) {
      const map = textureLoader.load(texture);
    map.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.SphereGeometry(size, 30, 30);
      const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture),
      });
      const mesh = new THREE.Mesh(geo, mat);
      const obj = new THREE.Object3D();
      obj.add(mesh);
      if (ring) {
        const ringMap = textureLoader.load(ring.texture);
        ringMap.colorSpace = THREE.SRGBColorSpace;
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringMap,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
      }
      scene.add(obj);
      mesh.position.x = position;

      // Set a random initial rotation angle around the sun
      obj.rotation.y = Math.random() * Math.PI * 2;

      // Store planetInfo as userData
      mesh.userData = { planetInfo };

      return { mesh, obj };
    }

   /*create planets by adding size, textures, x position and ring where applicable.
    Calculated the size of the planets by giving a value 3, then either multiplying or
    dividing by the size relative to the other planets. e.g Earth = 6, mars = half the size of Earth
    which = 1.5.*/

    const mercury = createPlanete(4, mercuryTexture, 60, null, {
      name: 'Mercury',
      info: 'Terrestrial Planet',
      distance: '58 million kilometres',
      day: '1408 hours',
      moons: '0',
      description: 'Mercury is the smallest and innermost planet in the Solar System. It has extreme temperature variations, with scorching days and freezing nights.',
      image: mercuryImage,
    });  //mercury 1/3 the size

    const venus = createPlanete(8, venusTexture, 90, null, {
      name: 'Venus',
      info: 'Terrestrial Planet',
      distance: '108 million kilometres',
      day: '5832 hours',
      moons: '0',
      description: 'Venus is often called Earth’s twin because of its similar size and composition. It has a thick atmosphere primarily composed of carbon dioxide.',
      image: venusImage,
    });    //Venus = 6km radius (slightly smaller)

    const earth = createPlanete(10, earthTexture, 120, null, {
      name: 'Earth',
      info: 'Terrestrial Planet',
      distance: '150 million kilometres',
      day: '24 hours',
      moons: '1',
      description: 'Earth is the only known planet to support life. It has a diverse environment with oceans, continents, and a life-sustaining atmosphere.',
      image: earthImage,
    });

    const mars = createPlanete(6, marsTexture, 160, null, {
      name: 'Mars',
      info: 'Terrestrial Planet',
      distance: '228 million kilometres',
      day: '25.4 hours',
      moons: '2',
      description: 'Mars is known as the Red Planet due to its reddish appearance. It has a thin atmosphere and is home to the largest volcano and canyon in the solar system.',
      image: marsImage,
    });       //mars about half the size

    const jupiter = createPlanete(20, jupiterTexture, 220, null, {
      name: 'Jupiter',
      info: 'Gas Giant',
      distance: '778 million kilometres',
      day: '10 hours',
      moons: '79',
      description: 'Jupiter is the largest planet in the Solar System and is primarily composed of hydrogen and helium. It has a strong magnetic field and numerous moons, including the largest moon, Ganymede.',
      image: jupiterImage,
    });//jupiter 11x the size

    const saturn = createPlanete(16, saturnTexture, 280, {    //saturn 9x the size
      innerRadius: 16,
      outerRadius: 30,
      texture: saturnRingTexture
    }, {
      name: 'Saturn',
      info: 'Gas Giant',
      distance: '1.4 billion kilometres',
      day: '10.7 hours',
      moons: '83',
      description: 'Saturn is known for its stunning ring system, which is made up of ice particles and debris. It is the second-largest planet in the Solar System.',
      image: saturnImage,
    });

    const uranus = createPlanete(12, uranusTexture, 350, {     //uranus 4x the size
      innerRadius: 12,
      outerRadius: 25,
      texture: uranusRingTexture
    }, {
      name: 'Uranus',
      info: 'Ice Giant',
      distance: '2.9 billion kilometres',
      day: '17 hours',
      moons: '27',
      description: 'Uranus is an ice giant with a bluish tint. It has a unique rotation axis, making it appear to roll on its side. Uranus has a system of faint rings and a set of interesting moons.',
      image: uranusImage,
    });

    const neptune = createPlanete(14, neptuneTexture, 380, null, {
      name: 'Neptune',
      info: 'Ice Giant',
      distance: '4.5 billion kilometres',
      day: '16 hours',
      moons: '14',
      description: 'Neptune is the farthest known planet from the Sun. It has a dynamic atmosphere with dark storms and is often referred to as the "windiest" planet in the Solar System.',
      image: neptuneImage,
    });     //slightly smaller than uranus

    const pluto = createPlanete(5, plutoTexture, 400, null, {
      name: 'Pluto',
      info: 'Dwarf Planet',
      distance: '5.9 billion kilometres',
      day: '153 hours',
      moons: '5',
      description: 'Pluto is considered a dwarf planet and is located in the Kuiper Belt. It has a complex and varied surface with icy plains and mountains.',
      image: plutoImage,
    });       //slightly larger than 1/6 the size

    const pointLight = new THREE.PointLight(0xFFFFFF, 40000, 0);
    scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0x404040, 0.1);
    scene.add(hemisphereLight);

    function animate() {
      sun.rotateY(0.004);
      mercury.mesh.rotateY(0.007);
      venus.mesh.rotateY(0.005);
      earth.mesh.rotateY(0.003);
      mars.mesh.rotateY(0.003);
      jupiter.mesh.rotateY(0.001);
      saturn.mesh.rotateY(0.001);
      uranus.mesh.rotateY(0.001);
      neptune.mesh.rotateY(0.001);
      pluto.mesh.rotateY(0.007);

      mercury.obj.rotateY(0.002834723782);
      venus.obj.rotateY(0.0022634728);
      earth.obj.rotateY(0.0018454728);
      mars.obj.rotateY(0.001284647328);
      jupiter.obj.rotateY(0.00091634738);
      saturn.obj.rotateY(0.00082342948);
      uranus.obj.rotateY(0.0009781565949);
      neptune.obj.rotateY(0.000646274738);
      pluto.obj.rotateY(0.00093617568938);

      pointLight.position.copy(sun.position);
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);


    return () => {
      // Remove event listener on cleanup
      window.removeEventListener('mousemove', onMouseMove);
  
      const container = document.getElementById('solar-system-container');
      if (container && container.parentNode) {
          container.parentNode.removeChild(container);
      }
  
      renderer.dispose();
  };
  
  }, []);

  return (
    <div>
      <div id="solar-system-container" className="solar-system-container" />
  
      <button className="home-button" onClick={goHome}> Return Home</button>
  
      {hoveredPlanet && (
        <div className="planet-info">
          <h2>{hoveredPlanet.name}</h2>
          {hoveredPlanet.name === 'The Sun' && (
            <>
              <p><strong>Star Type:</strong> {hoveredPlanet.Sinfo}</p>
              <p><strong>Diameter:</strong> {hoveredPlanet.Ssize}</p>
              <p><strong>Location:</strong> {hoveredPlanet.Slocation}</p>
              <p><strong>Surface Temperature:</strong> {hoveredPlanet.temperature}</p>
            </>
          )}
          {hoveredPlanet.name !== 'The Sun' && (
            <>
              <p><strong>Type:</strong> {hoveredPlanet.info}</p>
              <p><strong>Distance From Sun:</strong> {hoveredPlanet.distance}</p>
              <p><strong>Day Length:</strong> {hoveredPlanet.day}</p>
              <p><strong>Moons:</strong> {hoveredPlanet.moons}</p>
            </>
          )}
          <p><strong>General Info:</strong> {hoveredPlanet.description}</p>
          <div className="picture">
            <p><strong></strong> <img src={hoveredPlanet.image} alt={hoveredPlanet.name} /></p>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default SolarSystem;


