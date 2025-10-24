import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSounds } from './SoundManager';

const InteractiveButton = ({ 
  children, 
  href, 
  className = '', 
  variant = 'primary',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const sounds = useSounds();

  const variants = {
    primary: {
      base: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-2 border-transparent',
      hover: 'from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25',
    },
    secondary: {
      base: 'bg-transparent text-orange-300 border-2 border-orange-300',
      hover: 'bg-orange-300 text-black shadow-lg shadow-orange-300/25',
    },
    accent: {
      base: 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-2 border-transparent',
      hover: 'from-orange-400 to-red-400 shadow-lg shadow-orange-500/25',
    }
  };

  const currentVariant = variants[variant];

  const buttonMotion = {
    rest: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    },
    hover: { 
      scale: 1.05,
      rotateX: -5,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.95,
      rotateX: 5,
      rotateY: -5,
    }
  };

  const glowMotion = {
    rest: { 
      opacity: 0,
      scale: 0.8,
    },
    hover: { 
      opacity: 0.8,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonContent = (
    <motion.div
      className="relative perspective-1000"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => {
        setIsHovered(true);
        sounds.playHover();
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-lg blur-xl ${currentVariant.base} opacity-0`}
        variants={glowMotion}
      />
      
      {/* Main button */}
      <motion.button
        className={`
          relative font-bold py-3 px-6 rounded-lg transition-all duration-300 
          transform-gpu preserve-3d backdrop-blur-sm
          ${currentVariant.base} 
          hover:${currentVariant.hover}
          ${className}
        `}
        variants={buttonMotion}
        onClick={(e) => {
          sounds.playClick();
          if (onClick) onClick(e);
        }}
        {...props}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Button face */}
        <span className="relative z-10 block transform translate-z-2">
          {children}
        </span>
        
        {/* Button side (3D effect) */}
        <span 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-lg transform translate-z-neg-2"
        />
        
        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: '50%', 
                  y: '50%',
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.button>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default InteractiveButton;