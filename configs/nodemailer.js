import dotenv from 'dotenv';
dotenv.config();

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const mailConfigs = {
    registrationSuccess: (email) => {
        return {
            from: transporter.user,
            to: email,
            subject: 'Đăng ký thành công',
            text: 'Chúc mừng bạn đã đăng ký tài khoản thành công!',
        };
    },

    forgotPassword: (email) => {
        // Implementation for the "forgotPassword" mail type
    },

    changeEmail: (email) => {
        // Implementation for the "changeEmail" mail type
    },

    examReminder: (email) => {
        // Implementation for the "examReminder" mail type
    },

    examResult: (email) => {
        // Implementation for the "examResult" mail type
    },
};

export const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
};


