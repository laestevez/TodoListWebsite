import Userfront from "@userfront/react";
import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

const Profile = () => {
  const userData = Userfront.user;

  const [link, setLink] = useState(userData.image);
  const [bState, setButton] = useState(false);
  const [bText, setBText] = useState("Edit");

  function updateLink(link) {
    userData.update({image: link});
    console.log(link);
  }

  function toggleShowImageData() {
    setButton(!bState);
    if(bText === "Edit")
      setBText("Close");
    else
      setBText("Edit");
  }

  function SelectiveRender() {
    if(bState === true) {
      return (
        <Form.Group controlId="imglink">
          <Form.Label>Link To Profile Image:</Form.Label>
          <Form.Control type="text" value={link} onChange={d => setLink(d.target.value)} />
          <Button variant="primary" onClick={() => updateLink(link)}>Submit</Button>
        </Form.Group>
      )
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="text-center">
        <Image
          src={link}
          alt="User profile"
          style={{width: 200, height: 200, margin: 5}}
          roundedCircle
        />
        <h2>
          <Button variant="primary" onClick={toggleShowImageData}>{bText}</Button>
        </h2>
        <SelectiveRender></SelectiveRender>
        <h2>{userData.name}</h2>
        <p>@{userData.username}</p>
        <p>{userData.email}</p>
        <Button variant="danger" onClick={Userfront.logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Profile;
