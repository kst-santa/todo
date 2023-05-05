import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext(false);

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.outerWidth < 768);
  const toggleDarkMode = () => setDarkMode((mode) => !mode);

  const setVh = (e) => {
    const vh = window.innerHeight / 100;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setIsMobile((e ? e.target.outerWidth : window.outerWidth) < 768);
  };

  useEffect(() => {
    setVh();

    window.addEventListener('resize', (e) => {
      setVh(e);
    });

    return () => {
      window.removeEventListener('resize');
    };
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, isMobile }}>
      {children}
    </DarkModeContext.Provider>
  );
}
