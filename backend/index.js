const mongoose = require('mongoose');
const config = require('./config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bookRoute = require('./routes/bookRoute');
const AuthRoute = require("./routes/AuthRoute");

//app
const app = express();

//cors and json
app.use(cors({
    origin: true, // Allow all origins temporarily for debugging
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static("uploads"));

//endpoints
app.get("/", (req, res) => {
    return res.status(234).send("Welcome");
});

app.use("/books", bookRoute);
app.use("/auth", AuthRoute);

//connect to db
mongoose.connect(config.mongoUrl)
    .then(() => {
        //listen
        app.listen(config.port, () => {
            console.log("Listening");
        });
    })
    .catch(err => console.log(err));