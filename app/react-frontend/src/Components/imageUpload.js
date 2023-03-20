import React, { useState } from "react";
import {Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const history = useNavigate();
  const port = 5000;

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:" + port + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(response.data);
      history("/gallery");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="image-upload">
      <input className="file-upload" type="file" onChange={handleImageChange} />
      <Button variant = "primary" onClick={handleImageUpload}>Upload Image</Button>
    </div>
  );
};

export default ImageUpload;