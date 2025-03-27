const mongoose = require('mongoose');
const config = require('./config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ensureAdminAccount } = require('./util/EnsureAdminAccount');

const bookRoute = require('./routes/bookRoute');
const AuthRoute = require("./routes/AuthRoute");
const AdminRoute = require("./routes/AdminRoute");

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
app.use("/admin", AdminRoute);
app.use("/auth", AuthRoute);

//connect to db
mongoose.connect(config.mongoUrl)
    .then(async () => {
        await ensureAdminAccount();

        //listen
        app.listen(config.port, () => {
            console.log("Listening");
        });
    })
    .catch(err => console.log(err));