const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();


createServer();
connectDB();

function createServer () {
    const app = express();
    app.use(express.json());
    app.use('/api/v1', require('../routes/index'));

    http.createServer(app).listen(process.env.PORT)
}

async function connectDB(){
   
    try {
        const connected  = await  mongoose.connect(process.env.URL_MONGO);
        if(connected){
            console.log(`connnected to ${process.env.URL_MONGO}`);
        }
    } catch (error) {
        console.log(error);
    }
}