const express = require('express');
const cookieParser = require('cookie-parser');


const ServerConfig = require('./Config/ServerConfig');
const connectDB = require('./Config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinaryConfig = require('./Config/cloudinaryConfig');  
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute');
// const User = require('./schemas/userSchema');

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Routing middleware
// if your req route starts with users then handle it using userRouter
app.use('/users', userRouter); // connects the router to the server
app.use('/carts', cartRouter); // we can also directly import the router here without storing it in a variable
app.use('/auth', authRouter); // we can also directly import the router here without storing it in a variable
app.use('/products', productRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"});
})

app.post('/photo',uploader.single('incomingFile'), async (req, res) => {
    const result = await cloudinaryConfig.uploader.upload(req.file.path);
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path); //deleting the file from local storage after uploading to cloudinary
    return res.json({message: "ok"});
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
