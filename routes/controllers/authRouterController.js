import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import { usersCollection } from '../../configs/mongoDB.js';
import admin from '../../configs/firebase.js';

const authRouterController = {

    //Register
    register: async (req, res) => {
        try {

            const { username, email, password, accountType } = req.body;

            // Check input
            if (!username || !email || !password || !accountType) {
                return res.status(400).json({ message: 'Missing required registration info' });
            }

            // Check if username or email is already existed
            const isDuplicated = await User.findOne({
                $or: [{ username: username }, { email: email }],
            });

            if (isDuplicated) {
                return res.status(409).json({ message: 'Username or email is already existed' });
            }

            //add new user to db
            const hashedPW = bcrypt.hashSync(password, 10);
            
            const registerInfo = new User({
                username: username,
                email: email,
                password: hashedPW,
                accountType: accountType
            });

            const newUser = await registerInfo.save();
            //using save() instead of insertOne() to apply the schema template for new doc

            if (!newUser) {
                return res.status(500).json({ message: "Register failed" });
            };
            
            res.status(201).json({
                message: "Register success",
                data: {
                    username: newUser.username,
                    email: newUser.email,
                    accountType: accountType
                    //do not expose pw here
                }
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },

//Login with account


// Login with Google (Firebase)
    // loginWithGoogle: async (req, res) => {
    
    //     // Function to create a new user without the password field
    //     const createNewUserWithoutPassword = async (email, name) => {
    //         const newUser = {
    //             email: email,
    //             username: name,
    //             accountType: 'guest',
    //         };
    //         await usersCollection.insertOne(newUser);
    //     }

    //     try {
    //         const { idToken } = req.body;

    //         // Verify the Google ID token
    //         const decodedToken = await admin.auth().verifyIdToken(idToken);

    //         // Get the user's unique identifier and other details from the decoded token
    //         const { uid, email, name } = decodedToken;

    //         // Check if the user exists in your database using the email
    //         const user = await User.findOne({ email });

    //         if (!user) {
    //             // Create a new user in your database if it doesn't exist
    //             await createNewUserWithoutPassword(email, name);
    //         }

    //         // Generate an authentication token for the user
    //         const authToken = await admin.auth().createCustomToken(uid);

    //         // Return the authentication token to the client
    //         res.status(200).json({
    //             message: 'Login with Google successful',
    //             authToken: authToken,
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             message: error.message,
    //         });
    //     }
    // },

//Logout

//Forgot password

};

export default authRouterController;