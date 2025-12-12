/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import type { Theme } from './types';

function App() {
  
  // Theme state
  const [theme, setTheme] = useState<Theme>('light');
  
  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('christmas-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  // Save theme and update body styling
  useEffect(() => {
    localStorage.setItem('christmas-theme', theme);
    
    // Set Christmas-themed background colors
    document.body.style.backgroundColor = theme === 'dark' 
      ? '#1a1a1a'  // Dark winter night
      : '#fffaf0';  // Snow white
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
  }, [theme]);
  
  // Toggle theme
  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <Dashboard 
      theme={theme} 
      onThemeToggle={handleThemeToggle} 
    />
  );
}

export default App;