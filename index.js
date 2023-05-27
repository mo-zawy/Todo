require('dotenv').config();
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/db');
const port = process.env.PORT || 7000;

app.use(express.json());
app.use('/api/todos',todoRoutes);


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
    connectDB();
})