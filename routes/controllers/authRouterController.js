import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import admin from '../../configs/firebase.js';

const authRouterController = {

    //Register
    register: async (req, res) => {
        try {

            const { email, username, password } = req.body;

            // Check input
            if (!email || !username|| !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin đăng ký' });
            }

            // Check if email is already reigestered
            const duplicatedEmail = await User.findOne({ email: email });

            if (duplicatedEmail) {
                return res.status(409).json({ message: 'Email này đã được sử dụng!' });
            }

            //Check if usernameis already taken
            const duplicatedName = await User.findOne({ username: username});

            if (duplicatedName) {
                return res.status(409).json({ message: 'Tên người dùng này đã được sử dụng!' });
            }

            //add new user to db
            const hashedPW = bcrypt.hashSync(password, 10);
            
            const registerInfo = new User({
                email: email,
                username: username,
                password: hashedPW,
            });

            const newUser = await registerInfo.save();
            //using save() instead of insertOne() to apply the schema template for new doc

            if (!newUser) {
                return res.status(500).json({ message: "Đăng ký không thành công!" });
            };
            
            res.status(201).json({
                message: "Đăng ký thành công.",
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },

//Login with account
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check input
            if (!email || !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Email và Mật khẩu' });
            };

            // Check if user is already existed in DB or not
            const user = await User.findOne({
                email: email,
            });

            if (!user) {
                return res.status(400).json({ message: 'Không tìm thấy người dùng!' });
            };

            // Check password
            const isValidPW = bcrypt.compareSync(password, user.password);

            if (!isValidPW) {
                return res.status(400).json({ message: 'Mật khẩu không đúng!' });
            };

            if (user && isValidPW) {

                const accessToken = authRouteController.genAccessToken(user);
                const refreshToken = authRouteController.genRefreshToken(user);

                //storing refresh token to check if the same user is requesting to refresh
                refreshTokens.push(refreshToken);

                //storing refresh token in cookies to generate new access token when old one is expired
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                });

                const { password, ...othersInfo } = user._doc;
                //exclude sensitive data from the user document before sending it in the response.
                //user._doc = only get stored value (user object includes User model and other structural values/metadata that is unneccessory to send to client)

                //handle CORS - allow refresh token to be shown on req header so client side can access the refresh token
                res.setHeader("refreshToken", refreshToken);
                res.setHeader('Access-Control-Expose-Headers', 'refreshToken');

                //response to user, do not expose password here
                res.status(200).json({ ...othersInfo, accessToken });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

// Login with Google (Firebase)
    // loginWithGoogle: async (req, res) => {
    
    //     // Function to create a new user without the password field
    //     const createNewUserWithoutPassword = async (email, name) => {
    //         const newUser = {
    //             email: email,
    //             : name,
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