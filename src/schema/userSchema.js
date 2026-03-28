const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [5, "First name must be at least 5 characters long"],
        lowercase: true,
        trim: true, //if the user gives extra spaces then it will automatically remove it
        maxlength: [20, "First name must be less than or equal to 20 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [5, "Last name must be at least 5 characters long"],
        lowercase: true,
        trim: true,
        maxlength: [20, "Last name must be less than or equal to 20 characters long"]
    },
    mobileNumber: {
        type: String,
        trim: true,
        maxlength: [10, "Phone number should be of lenghth 10"],
        minlength: [10, "Phone number should be of lenghth 10"],
        unique: [true, "Phone number is already in use"],
        required: [true, "Phone number should be provided"]

    },
    email: {
        type: String,
        trim: true, 
        unique: [true, "Email is already in use"],
        required: [true, "Email should be provided"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum 6 characters long"],
    }
}, {
    timestamps: true    
});

userSchema.pre('save', async function() {
    //here u can modify your user before it i saved in mongodb
    console.log("Executing pre save hook");
    console.log(this); // this will give you the details of user which is going to be saved in the db.
    console.log("Existing pre save hook and now creating user");
})    

userSchema.pre('save', async function() {
    //here u can modify your user before it is saved in mongodb
    console.log("Executing pre save hook");
    console.log(this);
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
}) 

const User = mongoose.model('User', userSchema);  //collection

module.exports = User;