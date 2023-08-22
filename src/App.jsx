import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

function GridCell(props) {
  const ref = useRef();
  let bitmap;
  const clickevent = async () => {
    const position = ref.current.position;

  }
  const fetchNFT = async () => {
    const position = ref.current.position;
    const cell = [position.x, position.z];
    // await fetch(`https://global.oasis.world/service/game/bitmap/detail?bitNumber=${(position.z) * 10 + position.x}`)
    //   .then(async (res) => {
    //     let data = await res.json();
    //     console.log(position, data.data.contentUrl)
    //     bitmap = data.data.contentUrl;
    //     return data;
    //   })
    //   .then((url) => {
    //     return new Promise((resolve, reject) => {
    //       fetch(url)
    //         .then((res) => {
    //           resolve(res);
    //         })
    //         .catch((err) => {
    //           reject(err);
    //         });
    //     });
    //   })
    //   .then((res) => {
    //   })
    //   .catch((err) => {
    //   });


    // https://ordinals.com/content/c52d5be04fc1cbb3c3f5f8f5be1d70e5afc7d8699e18d088f5d192e55f8191f5i0
    // Add your code to create an image on the clicked cell
    let texture;
    // if (bitmap == undefined) {
    // texture = new THREE.TextureLoader().load('/img/avatar.png');
    // } else {
    // texture = new THREE.TextureLoader().load('https://ordinals' + bitmap.slice(16))
    // }
    // Create a material from the texture
    texture = new THREE.TextureLoader().load('/img/avatar.png');
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    // Create a mesh with the material and position it on the clicked cell
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    mesh.position.x = position.x;
    mesh.position.y = 0.1; // Set the y position slightly above the grid
    mesh.position.z = position.z;
    mesh.rotation.x = -Math.PI / 2;
    // Face the image towards the camera
    // Add the mesh to the scene
    ref.current.parent.add(mesh);
  };
  useEffect(() => {
    // fetchNFT();
  }, [])
  return (
    <mesh ref={ref} onClick={clickevent} position={[props.x, 0, props.y]}>
      <boxBufferGeometry attach="geometry" args={[0.9, 0.1, 0.9]} />
    </mesh>
  );
}

// function Grid(props) {
//   const cells = [];
//   for (let x = 0; x < props.size.x; x++) {
//     for (let y = 0; y < props.size.y; y++) {
//       cells.push(<GridCell key={`${x},${y}`} x={x} y={y} />);
//     }
//   }
//   return <>{cells}</>;
// }

function Grid(props) {
  const cells = [];
  const lines = [];
  for (let x = 0; x < props.size.x; x++) {
    for (let y = 0; y < props.size.y; y++) {
      cells.push(<GridCell key={`${x},${y}`} x={x} y={y} />);
      if (x < props.size.x - 1) {
        lines.push(
          <mesh key={`x${x},${y}`} position={[x + 0.5, 0, y]}>
            <boxBufferGeometry attach="geometry" args={[1, 0.2, 0.05]} />
            {/* <meshBasicMaterial attach="material" color={0xff0000} /> */}
          </mesh>
        );
      }
      if (y < props.size.y - 1) {
        lines.push(
          <mesh key={`y${x},${y}`} position={[x, 0, y + 0.5]}>
            <boxBufferGeometry attach="geometry" args={[0.05, 0.2, 1]} />
            {/* <meshBasicMaterial attach="material" color={0xff0000} /> */}
          </mesh>
        );
      }
    }
  }
  return (
    <>
      {cells}
      {lines}
    </>
  );
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
      <Grid size={{ x: 800, y: 100 }} />
    </Canvas>
  )
}
