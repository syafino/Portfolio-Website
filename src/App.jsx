import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, StarsCanvas, Tech, Works, ParticleSystem } from './components';

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="relative z-0 bg-primary">
        {/* Interactive particle cursor follower */}
        <ParticleSystem />
        
        <div 
          className="bg-cover bg-no-repeat bg-center bg-fixed min-h-screen hero-background-override"
          style={{
            backgroundImage: `url('/bgblackhole.png')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Cosmic particles */}
          <div className="cosmic-particles">
            <div className="particle large"></div>
            <div className="particle"></div>
            <div className="particle small"></div>
            <div className="particle"></div>
            <div className="particle large"></div>
            <div className="particle small"></div>
            <div className="particle"></div>
            <div className="particle large"></div>
            <div className="particle small"></div>
            <div className="particle"></div>
            <div className="particle large"></div>
            <div className="particle small"></div>
          </div>
          
          {/* Energy waves */}
          <div className="energy-wave"></div>
          <div className="energy-wave"></div>
          <div className="energy-wave"></div>
          
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
