import React, { useState, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';

// Simple 3D-like effect using CSS transforms - no Three.js dependencies
const CSS3DSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  const skills = [
    // Core Programming (inner circle)
    { name: 'Python', color: '#3776AB', ring: 0, angle: 0 },
    { name: 'JavaScript', color: '#F7DF1E', ring: 0, angle: 90 },
    { name: 'Java', color: '#ED8B00', ring: 0, angle: 180 },
    { name: 'C++', color: '#00599C', ring: 0, angle: 270 },
    
    // Web & Frameworks (middle circle)
    { name: 'React.js', color: '#61DAFB', ring: 1, angle: 0 },
    { name: 'Node.js', color: '#339933', ring: 1, angle: 60 },
    { name: 'HTML5', color: '#E34F26', ring: 1, angle: 120 },
    { name: 'CSS', color: '#1572B6', ring: 1, angle: 180 },
    { name: 'Flutter', color: '#02569B', ring: 1, angle: 240 },
    { name: 'SQL', color: '#336791', ring: 1, angle: 300 },
    
    // Tools & Systems (outer circle)
    { name: 'Docker', color: '#2496ED', ring: 2, angle: 0 },
    { name: 'AWS', color: '#FF9900', ring: 2, angle: 45 },
    { name: 'Git', color: '#F05032', ring: 2, angle: 90 },
    { name: 'Linux', color: '#FCC624', ring: 2, angle: 135 },
    { name: 'TensorFlow', color: '#FF6F00', ring: 2, angle: 180 },
    { name: 'PyTorch', color: '#EE4C2C', ring: 2, angle: 225 },
    { name: 'OpenCV', color: '#5C3EE8', ring: 2, angle: 270 },
    { name: 'Raspberry Pi', color: '#A22846', ring: 2, angle: 315 },
  ];

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
    setIsRotating(false);
    setTimeout(() => setIsRotating(true), 3000); // Resume rotation after 3 seconds
  };

  return (
    <div className="w-full h-96 relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden">
      {/* 3D Scene Container */}
      <div 
        className="w-full h-full flex items-center justify-center relative"
        style={{ perspective: '1000px' }}
      >
        {/* Skills Universe */}
        <motion.div
          className="relative w-80 h-80"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(10deg)'
          }}
          animate={{ 
            rotateY: isRotating ? 360 : 0 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Central Core */}
          <div className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 bg-orange-400 rounded-full shadow-lg z-20"
               style={{ 
                 boxShadow: '0 0 20px rgba(251, 146, 60, 0.8)',
                 transform: 'translateZ(0px)' 
               }} />

          {/* Skill Orbs */}
          {skills.map((skill, index) => {
            const radius = [80, 140, 200][skill.ring]; // Different radii for rings
            const radian = (skill.angle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            const z = skill.ring * 30; // Depth for 3D effect
            
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <motion.div
                key={skill.name}
                className="absolute cursor-pointer group"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isSelected ? 1.3 : 1, 
                  opacity: 1 
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSkillClick(skill)}
              >
                {/* Skill Sphere */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xl relative overflow-hidden group-hover:shadow-2xl transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${skill.color}, ${skill.color}88)`,
                    boxShadow: `0 4px 15px ${skill.color}44, 0 0 0 2px ${skill.color}22`,
                    transform: 'translateZ(0)'
                  }}
                >
                  {/* Glossy effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                  
                  {/* Skill abbreviation */}
                  <span className="relative z-10 text-center leading-tight">
                    {skill.name.length > 6 ? skill.name.substring(0, 4) : skill.name.substring(0, 6)}
                  </span>

                  {/* Pulsing ring for selected */}
                  {isSelected && (
                    <div 
                      className="absolute inset-0 rounded-full border-2 animate-pulse"
                      style={{ borderColor: skill.color }}
                    />
                  )}

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        animate={{
                          x: [0, Math.random() * 20 - 10],
                          y: [0, Math.random() * 20 - 10],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        initial={{
                          x: Math.random() * 48,
                          y: Math.random() * 48,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Skill Label */}
                <div 
                  className={`
                    absolute top-14 left-1/2 transform -translate-x-1/2 
                    px-2 py-1 rounded text-xs font-semibold whitespace-nowrap
                    transition-all duration-300 pointer-events-none
                    ${isSelected || 'group-hover:' ? 
                      'bg-black/80 text-white scale-110' : 
                      'bg-black/50 text-gray-300 scale-100'
                    }
                  `}
                >
                  {skill.name}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Ring Labels */}
        <div className="absolute bottom-4 left-4 text-white text-sm space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>Core Programming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Web & Frameworks</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>Tools & Systems</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <h4 className="font-bold mb-1">🌟 3D Skills Universe</h4>
          <p className="text-xs opacity-75">Click any skill orb to explore!</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => {
            setSelectedSkill(null);
            setIsRotating(!isRotating);
          }}
          className="bg-orange-500/80 hover:bg-orange-500 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
        >
          {isRotating ? 'Pause' : 'Rotate'}
        </button>
      </div>

      {/* Selected Skill Info */}
      {selectedSkill && (
        <motion.div
          className="absolute bottom-4 right-4 z-10 max-w-xs"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
            <h3 className="text-lg font-bold mb-2">{selectedSkill.name}</h3>
            <p className="text-sm opacity-75 mb-1">
              {selectedSkill.ring === 0 ? '🔵 Core Programming Language' :
               selectedSkill.ring === 1 ? '🟢 Web Technology & Framework' :
               '🟡 Development Tool & System'}
            </p>
            <div className="text-xs opacity-50">
              Ring {selectedSkill.ring + 1} of 3
            </div>
          </div>
        </motion.div>
      )}

      {/* Instruction overlay for first time */}
      <motion.div
        className="absolute inset-0 bg-black/50 flex items-center justify-center z-30 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-bold mb-2">🚀 Welcome to Skills Universe!</h3>
            <p className="text-sm opacity-75">Click any floating skill to explore</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CSS3DSkills;