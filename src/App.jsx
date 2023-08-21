import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import NFT from './components/NFT';
import { Scene } from 'three';
import Polyhedron from './Polyhedron';
import Sphere from "./Sphere.Component";

export default function App() {
  const map = new THREE.TextureLoader().load('/img/avatar.png');

  return (
    <Canvas camera={{ position: [0, 10, 0] }}
      style={{
        width: "80%",
        height: "80%",
        marginLeft: "10%"
      }}
    >
      <OrbitControls enableRotate={false} mouseButtons={{ LEFT: THREE.MOUSE.PAN }} />
      <mesh>
        <gridHelper args={[10, 10]} material={new THREE.LineBasicMaterial({ color: 'white' })} backgroundColor="#3b71db" />
        <Sphere />
      </mesh>
    </Canvas>
  )
}
