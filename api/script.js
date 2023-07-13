const express = require('express');
const mysql = require('mysql');
const app = express();
const middleware=require("./middleware")
const port = 5000;
const cors = require('cors');
<<<<<<< HEAD
const crypto = require('crypto');
const routes = require('./routes');
=======
const multer = require('multer');
const path = require('path');
>>>>>>> 6c9260ce60463d577e1094753471d08c709135d1

function generateId(id) {
  const car="0123456789abcdefg"
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

<<<<<<< HEAD


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


=======
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

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));




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
    res.json({ userId, filename: image.filename });
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

>>>>>>> 6c9260ce60463d577e1094753471d08c709135d1
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