import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import InteractiveButton from "./InteractiveButton";
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
          
          {/* Interactive Call-to-Action Buttons */}
          <motion.div 
            className="flex flex-col gap-4 mt-12 relative z-30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-4">
              <InteractiveButton 
                href="#contact"
                variant="primary"
              >
                Let's Work Together
              </InteractiveButton>
              
              <InteractiveButton 
                href="#work"
                variant="secondary"
              >
                View My Work
              </InteractiveButton>
            </div>
            <div>
              <InteractiveButton 
                href="/Resume.pdf"
                variant="accent"
                onClick={() => window.open('/Resume.pdf', '_blank')}
              >
                Download Resume
              </InteractiveButton>
            </div>
          </motion.div>
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
