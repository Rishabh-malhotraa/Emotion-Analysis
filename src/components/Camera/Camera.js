import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { detectFaces, drawResults } from '../../helpers/faceApi';

import Button from '../Button/Button';
import Gallery from '../Gallery/Gallery';
import Results from '../Results/Results';
import Webcam from 'react-webcam';

import './Camera.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Camera = ({ photoMode }) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [photo, setPhoto] = useState(undefined);
  const [showGallery, setShowGallery] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [results, setResults] = useState([]);

  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      await drawResults(camera.current.video, cameraCanvas.current, faces, 'boxLandmarks');
      setResults(faces);
    }
  };

  const clearOverlay = (canvas) => {
    canvas.current.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!photoMode && camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 80);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }, [photoMode]);

  const toggleGallery = () => setShowGallery(!showGallery);

  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    const newPhotos = [...photos, imgSrc];
    setPhotos(newPhotos);
    setPhoto(imgSrc);
    setShowGallery(true);
  };
  const reset = () => {
    setPhoto(undefined);
    setPhotos([]);
    setShowGallery(false);
  };
  const deleteImage = (target) => {
    const newPhotos = photos.filter((photo) => {
      return photo !== target;
    });
    setPhotos(newPhotos);
  };

  return (
    <div className="camera">
      <p className="scroll_down">Scroll down for results ↓</p>
      <div className="camera__wrapper">
        <Webcam audio={false} ref={camera} width="100%" height="auto" />
        <canvas className={classnames('webcam-overlay', photoMode && 'webcam-overlay--hidden')} ref={cameraCanvas} />
      </div>

      {photoMode ? (
        <>
          <div className="camera__button-container">
            {photos.length > 0 && <Button onClick={toggleGallery}>{showGallery ? 'Hide ' : 'Show '} Gallery</Button>}
            <Button onClick={capture} className="camera__button--snap">
              <FontAwesomeIcon icon="camera" size="lg" />
            </Button>
            {photos.length > 0 && <Button onClick={reset}>Reset</Button>}
          </div>

          {photos.length > 0 && <Gallery photos={photos} selected={photo} show={showGallery} deleteImage={deleteImage} />}
        </>
      ) : (
        <>
          <div className="results__container">
            <Results results={results} />
          </div>
        </>
      )}
    </div>
  );
};

export default Camera;
