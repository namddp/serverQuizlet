import jwt from "jsonwebtoken";

const authRouterMDWController = {

    // xác thực accessToken
    verifyAccessToken: (req, res, next) => {

        const accessToken = req.header('Authorization')?.replace("Bearer ", "");

        if (!accessToken) {
            return res.status(401).json({
                error: "Người dùng chưa đăng nhập, chưa có access token!"
            })
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error) {
                if (error.name === "TokenExpiredError") {
                    return res.status(401).json({
                        error: "Access token đã hết hạn!"
                    });
                } else {
                    return res.status(401).json({
                        error: "Access token không hợp lệ!"
                    });
                }
            }

            req.user = user;
            next();
        });
    },
}

export default authRouterMDWController;