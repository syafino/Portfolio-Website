import React from 'react';
import { motion } from 'framer-motion';

const SimpleInteractiveSkills = () => {
  const skills = [
    // Programming Languages
    { name: 'Python', color: '#3776AB' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'Java', color: '#ED8B00' },
    { name: 'C++', color: '#00599C' },
    { name: 'C', color: '#A8B9CC' },
    { name: 'HTML5', color: '#E34F26' },
    { name: 'CSS', color: '#1572B6' },
    { name: 'SQL', color: '#336791' },
    
    // Frameworks & Tools
    { name: 'React.js', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Flutter', color: '#02569B' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'Git', color: '#F05032' },
    { name: 'TensorFlow', color: '#FF6F00' },
    { name: 'PyTorch', color: '#EE4C2C' },
    
    // Hardware & Systems
    { name: 'Linux', color: '#FCC624' },
    { name: 'MacOS', color: '#000000' },
    { name: 'Windows', color: '#0078D4' },
    { name: 'Raspberry Pi', color: '#A22846' },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 max-w-6xl mx-auto">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="relative group cursor-pointer"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1, 
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.1,
            rotateY: 10,
            rotateX: 10,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Main skill circle */}
          <div 
            className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-2xl transition-all duration-300 group-hover:shadow-xl relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
              boxShadow: `0 8px 25px ${skill.color}44, 0 0 0 1px ${skill.color}22`
            }}
          >
            {/* Animated background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${skill.color}, transparent)`
              }}
            />
            
            {/* Skill name */}
            <span className="relative z-10 text-center leading-tight">
              {skill.name}
            </span>
            
            {/* Rotating border */}
            <div 
              className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-60 transition-all duration-500"
              style={{ 
                borderColor: skill.color,
                animation: 'spin 3s linear infinite'
              }}
            />
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: skill.color }}
                animate={{
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                initial={{
                  x: 12 + Math.random() * 48,
                  y: 12 + Math.random() * 48,
                }}
              />
            ))}
          </div>

          {/* Hover glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 -z-10"
            style={{ backgroundColor: skill.color }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SimpleInteractiveSkills;