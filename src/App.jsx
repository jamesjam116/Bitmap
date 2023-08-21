
import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'


export default function App() {
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398)
  ]

  return (
    <Canvas camera={{ position: [0, 1000, 0] }}

    >
      <OrbitControls enableRotate={false} />
      <mesh
        onPointerDown={(e) => {
          const x = e.clientX;
          const y = e.clientY;
          console.log(`Mouse down at (${x}, ${y})`);
        }}
        onPointerUp={(e) => {
          const x = e.clientX;
          const y = e.clientY;
          console.log(`Mouse up at (${x}, ${y})`);
        }}
      >
        <gridHelper args={[1000, 1000]} />
      </mesh>
    </Canvas >
  )
}
