import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto" style={{ background: 'transparent' }}>
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-20`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#fed7aa]" />
          <div className="w-1 sm:h-80 h-40 orange-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-white font-bold">Fino</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I do
            <Typewriter
              options={{
                strings: ["AI & ML", "Web Development","NLP"],
                autoStart: true,
                loop: true,
                loopCount: Infinity,
                deleteSpeed: "natural",
                pauseFor: 1000,
              }}
            />
          </p>
          
          {/* Call-to-Action Buttons with better contrast and positioning */}
          <div className="flex flex-col gap-4 mt-12 relative z-30">
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="bg-black bg-opacity-80 hover:bg-opacity-90 text-orange-300 border border-orange-300 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
              >
                Let's Work Together
              </a>
              <a 
                href="#work"
                className="bg-gray-900 bg-opacity-80 hover:bg-opacity-90 border-2 border-orange-400 text-orange-300 hover:bg-orange-400 hover:text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                View My Work
              </a>
            </div>
            <div>
              <a 
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 bg-opacity-90 hover:bg-opacity-100 border-2 border-orange-500 text-white hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
        <ComputersCanvas />
      </div> */}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-30">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
