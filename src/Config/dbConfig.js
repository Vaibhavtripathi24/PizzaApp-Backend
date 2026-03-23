const mongoose = require('mongoose');
const ServerConfig = require('./ServerConfig');

async function connectDB() {
    try {
        await mongoose.connect(ServerConfig.DB_URL);
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.log("Not able to connect to MongoDB...!!");
        console.error(error);
    }
}

module.exports = connectDB;                       
        