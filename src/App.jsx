import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import NFT from './components/NFT';
import { Scene } from 'three';
import Polyhedron from './Polyhedron';
import { useThree } from '@react-three/fiber';
import Sphere from "./Sphere.Component";

function GridCell(props) {
  const ref = useRef();
  const handleClick = async (event) => {
    const position = ref.current.position;
    const cell = [position.x, position.z];

    await fetch("https://global.oasis.world/service/game/bitmap/detail?bitNumber=0")
      .then(async (res) => {
        let data = await res.json();
        console.log(data.data.contentUrl)
        return data;
      })
      .then((url) => {
        return new Promise((resolve, reject) => {
          fetch(url)
            .then((res) => {
              console.log(res);
              resolve(res);
            })
            .catch((err) => {
              console.log(err)
              reject(err);
            });
        });
      })
      .then((res) => {
        // do something with the second response
        console.log(res, "------------->")
      })
      .catch((err) => {
        console.error(err);
      });

    // Add your code to create an image on the clicked cell
    const texture = new THREE.TextureLoader().load('https://ordinals.com/content/c52d5be04fc1cbb3c3f5f8f5be1d70e5afc7d8699e18d088f5d192e55f8191f5i0');
    // Create a material from the texture
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    // Create a mesh with the material and position it on the clicked cell
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    mesh.position.x = position.x;
    mesh.position.y = 0.1; // Set the y position slightly above the grid
    mesh.position.z = position.z;
    // Face the image towards the camera
    mesh.quaternion.copy(event.camera.quaternion); // Set the mesh's quaternion to the camera's quaternion
    // Add the mesh to the scene
    ref.current.parent.add(mesh);
  };
  return (
    <mesh ref={ref} onClick={handleClick} position={[props.x, 0, props.y]}>
      <boxBufferGeometry attach="geometry" args={[0.9, 0.1, 0.9]} />
    </mesh>
  );
}

function Grid(props) {
  const cells = [];
  for (let x = 0; x < props.size; x++) {
    for (let y = 0; y < props.size; y++) {
      cells.push(<GridCell key={`${x},${y}`} x={x} y={y} />);
    }
  }
  return <>{cells}</>;
}
function CameraControls() {
  const { camera, gl } = useThree();

  const controlsRef = useRef();

  useFrame(() => {
    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} enableRotate={false} mouseButtons={{ LEFT: THREE.MOUSE.PAN }} />;
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 10, 0] }}
      style={{
        width: "80%",
        height: "80%",
        marginLeft: "10%"
      }}
    >
      <CameraControls />
      <Grid size={10} />
    </Canvas>
  )
}
