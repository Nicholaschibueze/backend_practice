    import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    phoneNumber:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        

    },

    password:{
        type: String,
        required: true,
        minlength: 11
    },


}, {timestamps: true})


const User = mongoose.model("User", userSchema);


export default User;