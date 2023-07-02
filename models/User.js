import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({  
    userID: {
        type: String,
        // set: (objectID) => objectID.toString(),
        unique: true,
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // dateOfBirth: {
    //     type: Date,
    //     required: true
    // },
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            default: []
        }
    ],
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },
},
    { timestamps: true }
);

// middleware để lấy giá trị _id (do mongo gen mặc định) gán cho userID (dùng để tham chiếu data)
userSchema.pre('save', function (next) {
    if (!this.userID) {
        this.userID = this._id.toString();
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;