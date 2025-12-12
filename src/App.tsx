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
    document.body.className = theme === 'dark' ? 'bg-dark' : 'bg-light';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <div className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
        <button
          onClick={toggleTheme}
          className={`btn btn-lg shadow ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <div className="container py-5">
        <Dashboard theme={theme} onThemeToggle={toggleTheme} />
      </div>
    </div>
  );
}

export default App;