import React, { useEffect, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { IoIosSunny } from 'react-icons/io';
import { IoMoon } from 'react-icons/io5';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // This ensures the component is mounted before applying animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleThemeWithAnimation = () => {
    if (isMounted) {
      document.documentElement.classList.add('theme-transition');
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
    }
    toggleTheme();
  };

  return (
    <button
      onClick={toggleThemeWithAnimation}
      className={`toggleTheme ${isMounted ? 'mounted' : ''} ${theme === 'dark' ? 'dark' : 'light'}`}
    >
      <div className="theme-toggle-inner">
        {theme === 'dark' ? (
          <><IoIosSunny className="toggleThemeIcon sunIcon" style={{color:"yellow", fontSize:"23px"}}/></>
        ) : (
          <><IoMoon className="toggleThemeIcon moonIcon" style={{color:"white", fontSize:"18px"}}/></>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
