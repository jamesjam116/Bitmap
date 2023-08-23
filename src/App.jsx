
import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
import { Text } from '@react-three/drei'

export default function App() {
  const textureLoader = new THREE.TextureLoader();
  const bg = textureLoader.load('/img/map.png')
  function handleScroll(event) {
    const scrollVal = event.deltaY;
    console.log(scrollVal)
  }
  return (
    <Canvas camera={{ position: [0, 100, 0] }}
      style={{
        width: "80%",
        height: "80%",
        marginLeft: "10%",
      }}
      onWheel={handleScroll}
    >
      <OrbitControls enableRotate={false} mouseButtons={{ LEFT: THREE.MOUSE.PAN }} />
      <scene>
        <gridHelper args={[100, 100]} material={new THREE.LineBasicMaterial({ color: 'white' })} />
      </scene>
    </Canvas >
  )
}



{/* {Array.from({ length: 100 }, (_, i) => (
  Array.from({ length: 100 }, (_, j) => (
    <Text
      key={`text-${i}-${j}`}
      position={[i - 49.5, 0, j - 49.5]}
      fontSize={0.1}
      rotation-x={-Math.PI / 2}
      color="white"
    >
      {`${j * 100 + i}`}
    </Text>
  ))
))} */}
