/* eslint-disable react/no-unknown-property */
'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { GTMStage } from './types';

interface HoneycombPieceProps {
  stage: GTMStage;
  position: [number, number, number];
  color: string;
  borderColor: string;
  isActive: boolean;
  onClick: () => void;
  size: number; // New prop for size
}

const HoneycombPiece: React.FC<HoneycombPieceProps> = ({ 
  stage, 
  position, 
  color, 
  borderColor, 
  isActive, 
  onClick,
  size 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetRotationY = isActive ? Math.PI : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 5);
    }
  });

  const hexShape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = Math.cos(angle) * size;
    const y = Math.sin(angle) * size;
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, -0.01]}>
        <extrudeGeometry args={[hexShape, { depth: 0.1 * size, bevelEnabled: false }]} />
        <meshStandardMaterial color={borderColor} />
      </mesh>
      
      <mesh position={[0, 0, 0.002]}>
  <extrudeGeometry args={[hexShape, { depth: 0.08 * size, bevelEnabled: false }]} />
  <meshStandardMaterial color={color} side={THREE.FrontSide} />
</mesh>

<mesh position={[0, 0, -0.002]} rotation={[0, Math.PI, 0]}>
  <extrudeGeometry args={[hexShape, { depth: 0.08 * size, bevelEnabled: false }]} />
  <meshStandardMaterial color={color} side={THREE.BackSide} />

      </mesh>

      <group position={[0, 0, 0.06 * size]}>
  <Text 
    position={[0, 0.3 * size, 0]}
    fontSize={0.6 * size}
    color="red"
    anchorX="center"
    anchorY="middle"
  >
    {stage.icon}
  </Text>
  <Text 
    position={[0, -0.3 * size, 0]}
    fontSize={0.3 * size}
    color="red"
    anchorX="center"
    anchorY="middle"
    maxWidth={1.5 * size}
  >
    {stage.title}
  </Text>
</group>

<group position={[0, 0, -0.06 * size]} rotation={[0, Math.PI, 0]}>
  <Text 
    position={[0, 0, 0]}
    fontSize={0.15 * size}
    color="white"
    anchorX="center"
    anchorY="middle"
    maxWidth={1.6 * size}
  >
    {stage.description}
  </Text>
</group>
    </group>
  );
};

HoneycombPiece.displayName = 'HoneycombPiece';

export default HoneycombPiece;