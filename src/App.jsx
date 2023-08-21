import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
export default function App() {
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
      </mesh>
    </Canvas >
  )
}
