import React from 'react';
import './Settings.css';
import Navigation from '../common/Navigation';
import Upload from './upload/Upload';

const Settings: React.FC = () => {
  return (
    <div className="App">
      <Navigation/>
      <Upload 
      message='Hello'
      />
      <p>
      mosquitto_sub -h localhost -t error
      </p>
    </div>
  );
}

export default Settings;
