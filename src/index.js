const express=require('express');
const ServerConfig=require('./Config/ServerConfig');
const app=express();
app.listen(ServerConfig.PORT,()=>{
    console.log(`Server is running at port ${ServerConfig.PORT}...!!`);
});