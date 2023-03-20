import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './dashboard.css'

function TableBody(props) {
  const [images, setImages] = useState([]);
  const port = 5000;

  useEffect(() => {
    axios.get('http://localhost:' + port + '/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  function getImage(id) {
    for (let i = 0; i < images.length; i++) {
      if (images[i]._id === id) {
        return images[i];
      }
    }
    return "";
  }

  const library = props.libraryData.map((task, index) => {
    return (
      <Row key={index} md={3} className="card-row">
        <Link to={`/lists/${task._id}`}>
          <Card className="card">
            <Card.Img variant="top" src={`data:${getImage(task.image).contentType};base64,${getImage(task.image).data}`} className="card-img" />
            <Card.Body>
              <Card.Title >{task.title}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Row>
    );
  });

  return (
    <div className="library">
      {library}
    </div>
  );
}

function Dashboard(props) {
  return (
    <div className="id">
      <h1 className="title">Library</h1>
      <TableBody libraryData={props.libraryData} />
    </div>
  );
}

export default Dashboard;
