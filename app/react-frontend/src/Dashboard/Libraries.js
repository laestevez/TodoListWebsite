import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
import Userfront from '@userfront/react';

function Libraries(props) {
  const [libraryData, setLibraryData] = useState([]);
  const port = 5000;

  useEffect(() => {
    fetchAll().then(result => {
      if (result) {
        setLibraryData(result);
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

  return (
    <div>
      <Dashboard libraryData={libraryData} />
    </div>
  );
}

export default Libraries;
