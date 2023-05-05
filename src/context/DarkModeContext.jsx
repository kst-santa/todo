import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext(false);

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.outerWidth < 768);

  const toggleDarkMode = () =>
    setDarkMode((mode) => {
      const isDark = !mode;

      updateDarkMode(isDark);

      return isDark;
    });

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(isDark);
    updateDarkMode(isDark);
    setVh();
    setIsMobile(window.outerWidth < 768);

    window.addEventListener('resize', (e) => {
      setVh();
      setIsMobile(e.target.outerWidth < 768);
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

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}

function setVh() {
  const vh = window.innerHeight / 100;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
