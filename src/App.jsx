
import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
import { Text } from '@react-three/drei'

export default function App() {
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398)
  ]
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <Canvas camera={{ position: [0, 100, 0] }}
      style={{
        width: "80%",
        height: "80%",
        marginLeft: "10%"
      }}
    >
      <OrbitControls enableRotate={false} mouseButtons={{ LEFT: THREE.MOUSE.PAN }} />
      <mesh>
        <gridHelper args={[100, 100]} material={new THREE.LineBasicMaterial({ color: 'white' })} backgroundColor="#3b71db" />
        {Array.from({ length: 100 }, (_, i) => (
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
        ))}
      </mesh>

    </Canvas >
  )
}
