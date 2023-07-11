import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import UserPage from './UserPage';

// const UserPage = ({ userId }) => {
//   const [userData, setUserData] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
//       setUserData(response.data.user);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (userData === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>User Data</h1>
//       <p>ID: {userData.id}</p>
//       <p>Name: {userData.name}</p>
//       <p>Email: {userData.email}</p>
//       <p>Phone: {userData.phone}</p>
//     </div>
//   );
// };

const Main = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user', formData);
      const userId = response.data.userId;
      navigate(`/user/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div>
        <h1>NFC Card Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>

        {/* <Routes>
          <Route
            path="/user/:id"
            element={<UserPage />}
          />
        </Routes> */}
      </div>
  );
};

export default Main;
