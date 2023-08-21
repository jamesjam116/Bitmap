import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function NFT() {
    const texture = useLoader(TextureLoader, '/img/avatar.png');
    return (
        <mesh>
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}
