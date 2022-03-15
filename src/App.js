import React, { useState } from 'react';

import { loadModels } from './helpers/faceApi';
import { createFaLibrary } from './helpers/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import Camera from './components/Camera/Camera';

import './App.css';
createFaLibrary();
loadModels();
function App() {
  const [mode, setMode] = useState(false); //true = photo mode; false = video mode

  return (
    <div className="App">
      <header>
        <div className="App__header">
          <h1>
            <span>Emotion-Analysis</span>
          </h1>
          <div className="App__switcher">
            <FontAwesomeIcon icon="camera" color={mode ? '#007c6c' : '#cccccc'} />
            <Switch
              onChange={() => setMode(!mode)}
              uncheckedIcon={false}
              checkedIcon={false}
              checked={!mode}
              className="App__switcher-switch"
            />
            <FontAwesomeIcon icon="video" color={!mode ? '#007c6c' : '#cccccc'} />
          </div>
        </div>
      </header>
      <Camera photoMode={mode} />
      <p>
        Made with{' '}
        <span role="img" aria-label="heart-emoji">
          ❤️
        </span>{' '}
        by Rishabh.
      </p>
    </div>
  );
}

export default App;
