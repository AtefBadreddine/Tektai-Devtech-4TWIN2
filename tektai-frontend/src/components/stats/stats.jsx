import React, { useState, useEffect } from 'react';

function Stats() {
  const [theme, setTheme] = useState(() => {
    // Retrieve theme from local storage or default to 'transparent'
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'transparent';
  });

  // Function to handle theme change
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme); // Store the selected theme in local storage
  };

  // Effect to set the theme on component mount
  useEffect(() => {
    document.body.classList.add(theme); // Add the selected theme class to the body
    return () => {
      document.body.classList.remove(theme); // Remove the theme class on component unmount
    };
  }, [theme]);

  return (
    <div className="container mx-auto px-4">
      {/* Dropdown menu */}
      Current theme:
      <select 
        value={theme} 
        onChange={handleThemeChange} 
        className="my-4 w-full sm:w-1/3 lg:w-auto p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md transition-all duration-500"
      >
        <option value="nord_bright">Nord Bright</option>
        <option value="vue">Vue</option>
        <option value="radical">Radical</option>
        <option value="zenburn">Zenburn</option>
        <option value="default">Default</option>
        <option value="solarized">Solarized</option>
        <option value="date_night">Date Night</option>
        <option value="gruvbox">Gruvbox</option>
        <option value="jolly">Jolly</option>
        <option value="monokai">Monokai</option>
        <option value="react">React</option>
        <option value="rose_pine">Rose_pine</option>
      </select>

      {/* Images with the selected theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="w-full p-2 transition-all duration-500">
          <a href="https://github.com/vn7n24fzkq/github-profile-summary-cards">
            <img src={`https://raw.githubusercontent.com/Armi64bit/armi64bit/master/profile-summary-card-output/${theme}/2-most-commit-language.svg`} alt="Most Commit Language" className="w-full h-auto" />
          </a>
        </div>
        <div className="w-full p-2 transition-all duration-500">
          <a href="https://github.com/vn7n24fzkq/github-profile-summary-cards">
            <img src={`https://raw.githubusercontent.com/Armi64bit/armi64bit/master/profile-summary-card-output/${theme}/3-stats.svg`} alt="Stats" className="w-full h-auto" />
          </a>
        </div>
        <div className="w-full p-2 transition-all duration-500">
          <a href="https://github.com/vn7n24fzkq/github-profile-summary-cards">
            <img src={`https://raw.githubusercontent.com/Armi64bit/armi64bit/master/profile-summary-card-output/${theme}/4-productive-time.svg`} alt="Productive Time" className="w-full h-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Stats;
