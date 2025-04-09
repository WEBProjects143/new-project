require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// Task1
const route=require('./routes/userRoutes')

//task2
const imageRoutes = require('./routes/imageRoutes');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

app.use('/images', express.static('images'));

//Task1 and Task 2 routes
app.use('/api/users',route);
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async(req,res) =>{
    try {
        await connectDB() // Connecting Mongodb Database
        console.log(`Server started on port ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
});