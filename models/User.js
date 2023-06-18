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
        unique: true
    },
    accountType: {
        type: String,
        default: "student",
    },
    avatar: {
        type: String,
        default: null
    },
    classes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Class',
        }
    ],
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;