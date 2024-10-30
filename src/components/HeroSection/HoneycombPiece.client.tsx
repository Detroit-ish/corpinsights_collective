// components/HeroSection/HoneycombPiece.client.tsx

'use client';

import React, { useRef, useState, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';
import * as THREE from 'three';
import { GTMStage } from './types';

// Extend R3F to include ExtrudeGeometry
extend({ ExtrudeGeometry: THREE.ExtrudeGeometry });

interface HoneycombPieceProps {
  stage: GTMStage;
  position: [number, number, number];
  baseColor: string;
  borderColor: string;
  isActive: boolean;
  onClick: () => void;
  size: number;
}

const HoneycombPiece: React.FC<HoneycombPieceProps> = ({
  stage,
  position,
  baseColor,
  borderColor,
  isActive,
  onClick,
  size,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Idle animation variables
  const [idleOffset] = useState(() => Math.random() * 100);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate on click
      const targetRotationY = isActive ? Math.PI : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        delta * 5
      );

      // Hover scale effect
      const scale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        delta * 5
      );

      // Idle floating animation
      groupRef.current.position.y +=
        Math.sin(state.clock.getElapsedTime() * 2 + idleOffset) * 0.001;
    }
  });

  // Create the hexagon shape
  const hexShape = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const angle = (Math.PI * 2) / sides;

    shape.moveTo(size * Math.cos(0), size * Math.sin(0));
    for (let i = 1; i <= sides; i++) {
      shape.lineTo(size * Math.cos(i * angle), size * Math.sin(i * angle));
    }

    return shape;
  }, [size]);

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={onClick}
    >
      {/* Honeycomb Base with Glassmorphism Effect */}
      <mesh>
        <extrudeGeometry
          args={[
            hexShape,
            {
              depth: 0.5 * size,
              bevelEnabled: true,
              bevelThickness: 0.1 * size,
              bevelSize: 0.05 * size,
            },
          ]}
        />
        <meshPhysicalMaterial
          color={baseColor}
          transmission={0.9}
          opacity={0.5}
          transparent={true}
          roughness={0}
          metalness={0.1}
          thickness={1}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Icon Image */}
      {!isActive && (
  <group position={[0, 0, 0.26 * size]} scale={[1.5 * size, 1.5 * size, 1]}>
    <Image url={`/icons/${stage.icon}`} />
  </group>
)}

      {/* Back Text (Description) */}
      {isActive && (
        <Text
          position={[0, 0, -0.26 * size]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.3 * size}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8 * size}
          outlineWidth={0.01 * size}
          outlineColor="#000000"
        >
          {stage.description}
        </Text>
      )}

      {/* Title on Hover */}
      {hovered && !isActive && (
        <Text
          position={[0, -1.4 * size, 0.26 * size]}
          fontSize={0.35 * size}
          color="#FFFFFF"
          anchorX="center"
          anchorY="top"
          maxWidth={2 * size}
          outlineWidth={0.01 * size}
          outlineColor="#000000"
        >
          {stage.title}
        </Text>
      )}
    </group>
  );
};

export default HoneycombPiece;
