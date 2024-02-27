import React, { Suspense, useRef } from 'react';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import Header from '../../layout/Header';

export default function Cow() {
  const { scene } = useGLTF('/src/components/Cow/Cow.glb');
  const controls = useRef();

  return (<div>
    <Header></Header>
    <Suspense fallback={null}>
      <Canvas style={{ height: '100vh', width: '100%', position: 'absolute' }}>
        <Stage>
          <primitive object={scene} />
          <OrbitControls ref={controls} />
        </Stage>
      </Canvas>
    </Suspense></div>
  );
}
