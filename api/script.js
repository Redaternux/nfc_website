const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;
const cors = require('cors');
const multer = require('multer');
const path = require('path');


app.use(express.json());
app.use(cors());

// MySQL configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nfc_card',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Specify the folder where the uploaded files will be stored
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + '-' + file.originalname; // Generate a unique filename
//     cb(null, fileName);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Specify the correct path to the uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Generate a unique filename
  }
});



const upload = multer({ storage });

app.post('/api/user', upload.single('image'), (req, res) => {
  const userData = req.body;
  const image = req.file; // The uploaded image file

  // Perform image processing or validation if needed

  connection.query('INSERT INTO users (name, email, phone, image) VALUES (?, ?, ?, ?)', [userData.name, userData.email, userData.phone, image.filename], (error, results) => {
    if (error) {
      console.error('Error inserting user into database: ', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const userId = results.insertId;
    res.json({ userId });
  });
});


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

app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', userId, (error, results) => {
    if (error) {
      console.error('Error retrieving user from database: ', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const user = results[0];
    res.json({ user });
  });
});

app.get('/user/:id', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>User Data</title>
      </head>
      <body>
        <h1>User Data</h1>
        <p>ID: ${req.params.id}</p>
        <p>Name: ${req.query.name}</p>
        <p>Email: ${req.query.email}</p>
        <p>Phone: ${req.query.phone}</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


