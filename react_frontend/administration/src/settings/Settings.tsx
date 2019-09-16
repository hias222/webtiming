import React from 'react';
import './Settings.css';
import Navigation from '../common/Navigation';
import Upload from './Upload';

const Settings: React.FC = () => {
  return (
    <div className="App">
      <Navigation/>
      <Upload 
      message='Hello'
      />
    </div>
  );
}

export default Settings;
