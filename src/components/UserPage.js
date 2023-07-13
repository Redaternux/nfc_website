import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    // const imageUrl = `http://localhost:3000/api/uploads/${user.fileName}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${id}`);
        const user = response.data.user;
        setUserData(user);
        setImageUrl(`http://localhost:5000/api/uploads/${user.filename}`);
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
        <img src={imageUrl} alt='User Image' />
      </div>
    );
  };

export default UserPage