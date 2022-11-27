// import * as jwt from 'jsonwebtoken';


// import catchError from '../utils/catchAsync';
// import { JWT_SECRETE_KEY } from '../config';

const jwtAuth = async (req, res, next) => {
    const isAuth = false;
    if (isAuth) {
        next();
    } else {
        res.status(401).json("You are not Authenicated");
    }
};

export default jwtAuth;
