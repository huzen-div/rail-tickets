const jwt = require('jsonwebtoken');
require("dotenv").config();

const AuthService = {
    jwtGenerate: (user) => {
        const accessToken = jwt.sign(
            { userEmail: user.userEmail, role: '' },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5h", algorithm: "HS256" }
        )
        return accessToken;
    },
    jwtRefreshTokenGenerate: (user) => {
        const refreshToken = jwt.sign(
            { userEmail: user.userEmail, role: '' },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "10d", algorithm: "HS256" }
        )
        return refreshToken;
    },
    jwtVerify: (refreshToken) => {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return decoded;
    },
}
module.exports = AuthService;