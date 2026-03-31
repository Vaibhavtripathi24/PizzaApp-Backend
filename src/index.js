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
});

app.post('/photo',uploader.single('incomingFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'No file uploaded',
            success: false,
            data: {},
            error: { message: 'incomingFile is required' }
        });
    }

    try {
        const result = await cloudinaryConfig.uploader.upload(req.file.path);
        console.log("result from cloudinary", result);
        await fs.unlink(req.file.path);

        return res.json({
            message: "ok",
            success: true,
            data: { imageUrl: result.secure_url },
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to upload photo',
            success: false,
            data: {},
            error: { message: error.message }
        });
    }
});

app.listen(ServerConfig.PORT, () => {
    connectDB()
        .then(() => {
            console.log(`Server started at port ${ServerConfig.PORT}...!!`);
        })
        .catch(() => {
            process.exit(1);
        });
});
