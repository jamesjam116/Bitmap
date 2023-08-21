import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { TextureLoader } from "three";
const Sphere = () => {
    const textureLoader = new TextureLoader();
    const yourImageTexture = textureLoader.load("/img/avatar.png");
    return (
        <mesh position={[0, 0.2, 0]}>
            <sphereGeometry attach="geometry" args={[0.3, 20, 20]} />
            <meshBasicMaterial attach="material" color="white" />
        </mesh>
    );
};

export default Sphere;
