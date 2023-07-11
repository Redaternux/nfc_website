import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const [userData, setUserData] = useState(null);
    const { id } = useParams();

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${id}`);
        setUserData(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    if (userData === null) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>User Data</h1>
        {/* <p>ID: {userData.id}</p> */}
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
      </div>
    );
  };

export default UserPage