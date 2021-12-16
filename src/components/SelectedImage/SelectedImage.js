import React, {useEffect, useRef, useState} from "react";
import {detectFaces, drawResults} from "../../helpers/faceApi";

import "./SelectedImage.css";
import Results from "../Results/Results";

const SelectedImage = ({img}) => {
  const selected = useRef();
  const canvas = useRef();

  const [processing, setProcessing] = useState(true);
  const [results, setResults] = useState([]);

  const getFaces = async () => {
    setProcessing(true);
    const faces = await detectFaces(selected.current);
    setResults(faces);
    drawResults(selected.current, canvas.current, faces, "box");
    drawResults(selected.current, canvas.current, faces, "landmarks");

    setProcessing(false);
  };

  useEffect(() => {
    getFaces();
  }, [img]);

  return (
    <div className="selected-image">
      <div className="selected-image__wrapper">
        <img
          ref={selected}
          src={img}
          alt="selected"
          className="selected-image__image"
        />
        <canvas className="selected-image__overlay" ref={canvas} />
      </div>
      <div className="results__container">
        <Results results={results} processing={processing} />
      </div>
    </div>
  );
};

export default SelectedImage;
