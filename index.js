const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/authMiddleware');
const path = require('path')

const app = express();
const port = 5000;

app.use("/files", express.static("files"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://dwivedirohit7905:lB8bVUNIGXs4PlTY@cluster0.nc2vy6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

  


// Routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/search', userController.search);
app.get('/user/:userId', authMiddleware.verifyToken, userController.getUserById);

app.post('/send-otp',userController.sendOtp);
app.post('/forgotpassword', userController.resetPassword);
app.use(express.static(path.join(__dirname,'/react_app/build')));

//render the index.html file created in build folder 
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/react_app/build/index.html'));
 });

