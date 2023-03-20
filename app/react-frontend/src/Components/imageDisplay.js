import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageDisplay = () => {
  const [images, setImages] = useState([]);
  const port = 5000;

  useEffect(() => {
    axios.get("http://localhost:" + port + "/images")
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  function deleteImage(id) {
    axios.delete("http://localhost:" + port + "/images/" + id);
    window.location.reload(true);
  }

  return (
    <div>
      <h1 className="imageGallery-title">Image Gallery (click to delete)</h1>
      <div className="image-gallery" style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map(image => (
          <button key={image._id} onClick={() => deleteImage(image._id)} style={{ margin: "5px", border: "none", background: "none" }}>
            <img  className="images"
              src={`data:${image.contentType};base64,${image.data}`}
              alt={image.filename}
              style={{ objectFit: "cover"}}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
