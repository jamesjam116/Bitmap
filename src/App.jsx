
import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'


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
      <OrbitControls enableRotate={false} />
      <mesh
        onPointerDown={(e) => {
          setIsDragging(true);
          setLastX(e.clientX);
          setLastY(e.clientY);
        }}
        onPointerUp={(e) => {
          setIsDragging(false);

        }}
        onPointerMove={(e) => {
          if (isDragging) {
            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;
            setPosition((prevPosition) => ({
              x: prevPosition.x + deltaX,
              y: prevPosition.y + deltaY,
            }));
            setLastX(e.clientX);
            setLastY(e.clientY);
            console.log(position)
          }
        }}

      >
        <gridHelper args={[100, 100]} material={new THREE.LineBasicMaterial({ color: 'white' })} backgroundColor="#3b71db" />
      </mesh>
    </Canvas >
  )
}
