import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const FloatingSkillSphere = ({ position, skill, color }) => {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
        <Text
          ref={textRef}
          position={[0, 0, 0.9]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
      </mesh>
    </Float>
  );
};

// Fallback 2D skills display
const FallbackSkills = ({ skills }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-300 group-hover:shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
              boxShadow: `0 0 20px ${skill.color}44`
            }}
          >
            {skill.name}
          </div>
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
};

const InteractiveSkillsCanvas = ({ skills }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <FallbackSkills skills={skills} />;
  }

  return (
    <Suspense fallback={<FallbackSkills skills={skills} />}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} onError={() => setHasError(true)}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
        
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 3;
          const position = [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.5,
            Math.sin(angle * 2) * 2
          ];
          
          return (
            <FloatingSkillSphere
              key={skill.name}
              position={position}
              skill={skill.name}
              color={skill.color}
            />
          );
        })}
      </Canvas>
    </Suspense>
  );
};

const InteractiveSkills = () => {
  const skills = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Python', color: '#3776AB' },
    { name: 'AI/ML', color: '#FF6B6B' },
    { name: 'Three.js', color: '#000000' },
    { name: 'NLP', color: '#4ECDC4' },
    { name: 'Web Dev', color: '#45B7D1' },
  ];

  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <InteractiveSkillsCanvas skills={skills} />
    </motion.div>
  );
};

export default InteractiveSkills;