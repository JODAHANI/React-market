const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
require('dotenv').config()


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

app.get('/', (req, res) => {
    return res.send('하이')
})

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = 8080

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});