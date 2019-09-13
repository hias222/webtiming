import React from 'react';
import './Settings.css';
import Navigation from '../common/Navigation';

const Settings: React.FC = () => {
  return (
    <div className="App">
      <Navigation/>
      <header className="App-header">
        <p>
          Settings
        </p>
      </header>
    </div>
  );
}

export default Settings;
