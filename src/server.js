import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import handleErrors from './middleware/handleError.js';
import './config.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json());
app.use('/', router);
app.use(handleErrors);


var server = app.listen(8000, function () {

    console.log("Listening to Port", port)
})