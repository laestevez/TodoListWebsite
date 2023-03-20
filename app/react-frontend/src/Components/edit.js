import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './Form.css'

function Edit(props) {
    const { id } = props;
    const [pics, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showDiv, setShowDiv] = useState(false);
    const [formData, setFormData] = useState({
    title: '',
    items: [''],
    status: ['0'],
    priority: [''],
    image: ''
    });

    const [libraryData, setLibraryData] = useState(null);
    //const id = '6412b23ad30c34f9793474ee'

    const port = 5000;

    async function fetchLibraryData(_id) {
        try {
            const response = await axios.get("http://localhost:" + port + `/lists/${_id}`);
            //console.log(response.data.tasks_list)
            return response.data.tasks_list;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        axios.get('http://localhost:' + port + '/images')
        .then(res => {
            setImages(res.data);
        })
        .catch(err => {
            console.error(err);
         });
    }, []);

    useEffect(() => {
        fetchLibraryData(id).then(result => {
          if (result) {
            setLibraryData(result);
            setLoading(false);
          }
        });
      }, [id]);

    const convertForm = () => {
        setFormData({
            title: libraryData.title,
            items: libraryData.items,
            status: libraryData.status,
            priority: libraryData.priority,
            image: libraryData.image,
          });
        setShowDiv(true);
    }

    const handleImageChange = (event) => {
        setFormData({ ...formData, image: event.target.value });
    }

    const handleTitleChange = (event) => {
        setFormData({ ...formData, title: event.target.value });
    };
    
      const handleItemChange = (index, event) => {
        const newItems = [...formData.items];
        newItems[index] = event.target.value;
        setFormData({ ...formData, items: newItems });
    };
    
    const handleAddItem = () => {
        setFormData({ ...formData, items: [...formData.items, ''], status: [...formData.status, '0'] });
    };
    
    const handleDeleteItem = (index) => {
        const newItems = [...formData.items];
        newItems.splice(index, 1);
        const newStatus = [...formData.status];
        newStatus.splice(index, 1);
        setFormData({ ...formData, items: newItems, status: newStatus });
    };
    
    const handlePriorityChange = (index, event) => {
        const newPriorities = [...formData.priority];
        newPriorities[index] = event.target.value;
        setFormData({ ...formData, priority: newPriorities });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(formData);
        setFormData({ title: '', items: [''], image: '', status: ['0'], priority: [''] });
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
      }

    return (
        <div>
          {showDiv ? <div>
          <h2 className="newForm-title">Editing: "{libraryData.title}"</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="image">
              <Form.Label>Image:</Form.Label>
              <Row>
                {pics.map((images) => (
                  <Col key={images._id} xs={4}>
                    <Form.Check
                      type="radio"
                      id={`image-${images._id}`}
                      name="image"
                      value={images._id}
                      checked={formData.image === images._id}
                      onChange={handleImageChange}
                      label={
                        <img
                          src={`data:${images.contentType};base64,${images.data}`}
                          alt={images.filename}
                          style={{ width: 100, height: 100, padding: "10px" }}
                        />
                      }
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Control type="text" value={formData.title} onChange={handleTitleChange} placeholder="My Library Title" />
            </Form.Group>
            {formData.items.map((item, index) => (
              <Form.Group controlId={`item-${index}`} key={index}>
                <Row>
                  <Col>
                    <Form.Control type="text" value={item} onChange={(event) => handleItemChange(index, event)} placeholder="Task" />
                  </Col>
                  <Col xs={2}>
                    <Form.Control as="select" onChange={(event) => handlePriorityChange(index, event)}>
                      <option>Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Form.Control>
                  </Col>
                  <Col xs={1}>
                    <Button className="dangerBtn" variant="danger" type="button" onClick={() => handleDeleteItem(index)}>Delete</Button>
                  </Col>
                </Row>
              </Form.Group>
            ))}
            <Button className="primaryBtn" variant="primary" type="button" onClick={handleAddItem}>Add Item</Button>
            <Button className="primaryBtn" variant="primary" type="submit">Submit</Button>
          </Form>
          </div> : <Button className="primaryBtn" variant="primary" type="button" onClick={convertForm}>Start editing</Button>}
        </div>
      );    

}

export default Edit;
