import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import admin from '../../configs/firebase.js';

const authRouterController = {

    //Đăng ký
    register: async (req, res) => {
        try {

            const { email, username, password } = req.body;

            // Kiểm tra input
            if (!email || !username || !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin đăng ký' });
            }

            //Kiểm tra username trùng
            const duplicatedName = await User.findOne({ username: username });

            if (duplicatedName) {
                return res.status(409).json({ message: 'Tên người dùng này đã được sử dụng!' });
            }

            // Kiểm tra email trùng
            const duplicatedEmail = await User.findOne({ email: email });

            if (duplicatedEmail) {
                return res.status(409).json({ message: 'Email này đã được sử dụng!' });
            }

            // Thêm user mới vào DB
            const hashedPW = bcrypt.hashSync(password, 10);

            const registerInfo = new User({
                username: username,
                email: email,
                password: hashedPW,
            });

            const newUser = await registerInfo.save();
            // Dùng method save() thay vì insertOne() để tạo document mới với toàn bộ các trường dữ liệu đã định nghĩa trong schema User

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

    // Tạo access token (JWT) cho user đăng nhập bằng email & pw
    genAccessToken: (user) => {
        return jwt.sign(
            {
                userID: user.userID,
                username: user.username,
                email: user.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
    },

    // Tạo refresh token (JWT) cho user login bằng email & pw
    genRefreshToken: (user) => {
        return jwt.sign(
            {
                userID: user.userID,
                username: user.username,
                email: user.email,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "14d" }
        );
    },

    //Đăng nhập bằng email & pw
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Kiểm tra input
            if (!email || !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Email và Mật khẩu' });
            };


            // Kiểm tra user có trong DB hay không
            const user = await User.findOne({
                email: email,
            });

            if (!user) {
                return res.status(400).json({ message: 'Không tìm thấy người dùng!' });
            };

            // Kiểm tra mật khẩu
            const isValidPW = bcrypt.compareSync(password, user.password);

            if (!isValidPW) {
                return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
            };

            if (user && isValidPW) {
                // Đăng nhập thành công, cấp tokens
                const accessToken = authRouterController.genAccessToken(user);
                const refreshToken = authRouterController.genRefreshToken(user);

                const { password, ...othersInfo } = user._doc;
                // loại bỏ password trước khi trả thông tin người dùng trong response.
                // user._doc = lấy ra các trường dữ liệu có giá trị do dev define, lược bỏ các trường metadata do DB thêm khi tạo doc.

                // trả response thông tin người dùng vừa đăng nhập và các token
                res.status(200).json({
                    ...othersInfo,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
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