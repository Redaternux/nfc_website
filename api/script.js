const express = require('express');
const mysql = require('mysql');
const app = express();
const middleware=require("./middleware")
const port = 5000;
const cors = require('cors');
const crypto = require('crypto');
const routes = require('./routes');

function generateId(id) {
  const car="0123456789abcdefghijk"
  let randomNumber = 0
  let newstr=""
  for (let i = 0; i < 10; i++) {
    let currentChar = car[Math.floor(Math.random() * car.length)];
    newstr+=currentChar
  }
  return newstr+"-"+id;
}

app.use(middleware.corsMiddleware());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//req Format Validator
app.use(middleware.reqFormatMiddleware);
//=============ROUTES===============================



routes(app);








app.get('/:id', (req, res) => {
  console.log(req.params)
const hashValue = generateId(req.params.id);
  res.send(`
    <html>
      <head>
        <title>User Data</title>
      </head>
      <body>
        <h1>${hashValue}</h1>
      </body>
    </html>
  `);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




//===================================================================================================================================

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });


// app.post('/api/user', async (req, res) => {
//   const userData = req.body;

//   try {
//     // Generate a hash of the ID using bcrypt
//     const hashedId = await bcrypt.hash(userData.id, 10);

//     // Store the hashed ID in the database
//     connection.query('INSERT INTO users (id, name, email, phone) VALUES (?, ?, ?, ?)', [hashedId, userData.name, userData.email, userData.phone], (error, results) => {
//       if (error) {
//         console.error('Error inserting user into database: ', error);
//         res.status(500).json({ message: 'Internal server error' });
//         return;
//       }

//       const userId = results.insertId;
//       res.json({ userId });
//     });
//   } catch (error) {
//     console.log('Error hashing ID: ', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// app.post('/api/user', (req, res) => {
//   const userData = req.body;
//   connection.query('INSERT INTO users SET ?', userData, (error, results) => {
//     if (error) {
//       console.error('Error inserting user into database: ', error);
//       res.status(500).json({ message: 'Internal server error' });
//       return;
//     }
//     const userId = results.insertId;
//     res.json({ userId });
//   });
// });



// app.get('/api/user/:id', (req, res) => {
//   const userId = req.params.id;
//   connection.query('SELECT * FROM users WHERE id = ?', userId, (error, results) => {
//     if (error) {
//       console.error('Error retrieving user from database: ', error);
//       res.status(500).json({ message: 'Internal server error' });
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     const user = results[0];
//     res.json({ user });
//   });
// });