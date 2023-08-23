import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls, Text } from '@react-three/drei'

function NumbersGrid() {
  const numbersGeometry = new THREE.BufferGeometry();
  const numbersMaterial = new THREE.MeshBasicMaterial({ vertexColors: true }); // Enable vertex colors
  const numbersVertices = [];
  const numbersColors = [];

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const x = i - 49.5;
      const z = j - 49.5;
      numbersVertices.push(x, 0, z);
      numbersColors.push(1, 1, 1); // White color for each vertex
    }
  }

  numbersGeometry.setAttribute('position', new THREE.Float32BufferAttribute(numbersVertices, 3));
  numbersGeometry.setAttribute('color', new THREE.Float32BufferAttribute(numbersColors, 3)); // Assign colors
  const numbersMesh = new THREE.Mesh(numbersGeometry, numbersMaterial);

  return <primitive object={numbersMesh} />;
}

export default function App() {
  const textureLoader = new THREE.TextureLoader();
  const bg = textureLoader.load('/img/map.png');

  function handleScroll(event) {
    const scrollVal = event.deltaY;
    console.log(scrollVal);
  }

  return (
    <Canvas
      camera={{ position: [0, 100, 0] }}
      style={{
        width: '80%',
        height: '80%',
        marginLeft: '10%',
      }}
      onWheel={handleScroll}
    >
      <OrbitControls enableRotate={false} mouseButtons={{ LEFT: THREE.MOUSE.PAN }} />
      <scene>
        <gridHelper args={[100, 100]} material={new THREE.LineBasicMaterial({ color: 'white' })} />

        {/* Render the custom NumbersGrid component */}
        <NumbersGrid />

        {/* Render block numbers */}
        {Array.from({ length: 100 }, (_, i) =>
          Array.from({ length: 100 }, (_, j) => (
            <Text
              key={`text-${i}-${j}`}
              position={[i - 49.5, 0.1, j - 49.5]} // Raise the position slightly to avoid overlapping with grid
              fontSize={0.1}
              rotation-x={-Math.PI / 2}
              color="white"
            >
              {`${j * 100 + i}`}
            </Text>
          ))
        )}
      </scene>
    </Canvas>
  );
}
