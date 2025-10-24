import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { close, menu } from '../assets';
import { navLinks } from '../constants';
import { styles } from '../styles';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  const toggleResume = () => {
    const resumeUrl = '/Resume.pdf';
    window.open(resumeUrl);
  };

  useEffect(() => {
    if (toggle) {
      setActive('');
    }
  }, [toggle]);

  const renderNavLinks = (isSecondary) => (
    <ul className={`list-none ${isSecondary ? 'flex flex-col' : 'flex flex-row'} gap-4`}>
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`${
            active === link.title ? 'text-white bg-white/10' : 'text-gray-200'
          } hover:text-white hover:bg-white/10 text-sm font-medium cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
            isSecondary ? 'w-full text-center' : ''
          }`}
          onClick={() => {
            setActive(link.title);
            if (isSecondary) {
              setToggle(false);
            }
          }}
        >
          <a href={`#${link.id}`}>{link.title}</a>
        </li>
      ))}
      <li
        className={`text-gray-200 hover:text-white hover:bg-white/10 text-sm font-medium cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
          isSecondary ? 'w-full text-center' : ''
        }`}
      >
        <button onClick={toggleResume}>Resume</button>
      </li>
    </ul>
  );

  return (
    <>
      <nav className="w-full flex items-center justify-center py-4 fixed top-0 z-20">
        {/* iPhone Dynamic Island Style Container */}
          <div className="w-full flex justify-between items-center">
            {/* Desktop Navigation - Left */}
            <div className="hidden sm:flex flex-1">
              <ul className="flex flex-row gap-4">
                {navLinks.slice(0, 2).map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? 'text-white bg-white/10' : 'text-gray-200'
                    } hover:text-white hover:bg-white/10 text-sm font-medium cursor-pointer px-4 py-2 rounded-full transition-all duration-300`}
                    onClick={() => setActive(link.title)}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Centered Logo */}
            <Link
              to="/"
              className="flex items-center justify-center flex-1 sm:flex-none"
              onClick={() => {
                setActive('');
                window.scrollTo(0, 0);
              }}
            >
              <p className="text-white text-lg font-bold cursor-pointer text-center">
                Syafino Yunalfian
              </p>
            </Link>

            {/* Desktop Navigation - Right */}
            <div className="hidden sm:flex flex-1 justify-end">
              <ul className="flex flex-row gap-4">
                {navLinks.slice(2).map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? 'text-white bg-white/10' : 'text-gray-200'
                    } hover:text-white hover:bg-white/10 text-sm font-medium cursor-pointer px-4 py-2 rounded-full transition-all duration-300`}
                    onClick={() => setActive(link.title)}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ))}
                <li className="text-gray-200 hover:text-white hover:bg-white/10 text-sm font-medium cursor-pointer px-4 py-2 rounded-full transition-all duration-300">
                  <button onClick={toggleResume}>Resume</button>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-6 h-6 object-contain cursor-pointer filter invert"
                onClick={() => setToggle(!toggle)}
              />
            </div>
          </div>

        {/* Mobile Menu - Glass Style */}
        {toggle && (
          <div className="sm:hidden absolute top-20 right-4 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 min-w-[200px] glass-card">
            {renderNavLinks(true)}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
