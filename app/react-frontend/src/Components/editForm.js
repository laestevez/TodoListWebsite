import React, { useState, useEffect } from 'react';
import Edit from './edit';
import axios from 'axios';
import Userfront from '@userfront/react';
import { useParams } from "react-router-dom";

function EditForm() {
  const { id } = useParams();
  const port = 5000;
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    fetchAll().then(result => {
      if (result) {
        setLibrary(result);
      }
    });
  }, []);

  async function fetchAll() {
    const user = Userfront.user;
    try {
      const response = await axios.get('http://localhost:' + port + '/lists', {
        params: {
          userUuid: user.userUuid,
        },
      });
      return response.data.tasks_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(item) {
    const user = Userfront.user;
    const library = {
      ...item,
      userUuid: user.userUuid, // include the user's UUID in the Library
    };
    try {
      const response = await axios.post('http://localhost:' + port + '/lists', library);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function deleteLibrary(id) {
    try {
      const response = await axios.delete("http://localhost:" + port + `/lists/${id}`);
      if (response.status === 204) {
        return true;
      }
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateLibrary(item) {
    makePostCall(item).then(result => {
      if (result && result.status === 201) {
        deleteLibrary(id);
        setLibrary([...library, result.data]);
      }
    });
    deleteLibrary(id);
    window.location.href = '/dashboard';
  }

  return (
    <div className="container">
      <Edit handleSubmit={updateLibrary} id = {id}/>
    </div>
  );
}

export default EditForm;