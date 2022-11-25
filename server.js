import express from 'express';
import cors from 'cors';
import router from './src/routes/routes.js';
// import { corsUrl, db, environment } from './config';
const app = express();
const port = 8000

app.use(cors())

app.use('/', router);

var server = app.listen(8000, function () {
    console.log("Listening to Port", port)
})