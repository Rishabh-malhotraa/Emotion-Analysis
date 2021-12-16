import React, {useState, useEffect} from "react";
import classnames from "classnames";
import SelectedImage from "../SelectedImage/SelectedImage";

import "./Gallery.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Gallery = props => {
  const [selected, setSelected] = useState(props.selected);
  const [photos, setPhotos] = useState(props.photos);

  useEffect(() => {
    if (photos.length !== props.photos.length) {
      setSelected(props.selected);
      setPhotos(props.photos);
    }
  }, [photos.length, props.photos.length, props.photos, props.selected]);

  if (photos.length < 1) {
    return null;
  } else {
    return (
      <div className="gallery__container">
        {selected && <SelectedImage img={selected} />}
        {props.show && (
          <>
            <h2>Gallery</h2>
            <div className="gallery">
              {photos.map((photo, i) => (
                <div className="gallery__image-wrapper" key={i}>
                  <img
                    src={photo}
                    alt={`image_${i}`}
                    onClick={() => {
                      setSelected(photo);
                    }}
                    className={classnames(
                      "gallery__photo",
                      photo === selected && "gallery__photo--selected"
                    )}
                  />
                  <FontAwesomeIcon
                    icon="times-circle"
                    size="sm"
                    className="gallery__photo-delete"
                    onClick={() => props.deleteImage(photo)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default Gallery;
