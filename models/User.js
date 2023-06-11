import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    //Auth data    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },
    accountType: {
        type: String,
        default: "guest",
        required: true
    },
    // Profile data
    realName: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    age: {
        type: Number,
        default: null
    },
    dateOfBirth: {
        type: Date,
        default: null
    }
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;