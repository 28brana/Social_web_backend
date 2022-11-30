import jwt from "jsonwebtoken";

const jwtAuth = async (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) { return res.status(403).json("Token is not valid!"); }
            next();
        });
    } else {
        return res.status(401).json("You are not Authenicated");
    }
};

export default jwtAuth;
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODcyNTI4YWNjZWIzMDA3YzNkODFmZSIsImlhdCI6MTY2OTgwMTMxMiwiZXhwIjoxNjcwMDYwNTEyfQ.FGz_yprOf1AZSV3DV4lvPPJ3TqkBs9Qgg6_1WmiuUig"