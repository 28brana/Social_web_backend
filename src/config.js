const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = 'mongodb+srv://28brana:%40Keerat28@cluster0.k23a3eh.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is Connected ...");
}).catch((err) => {
    console.log("Database Error : ", err);
})


module.exports = mongoose;