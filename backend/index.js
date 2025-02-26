
import mongoose from "mongoose";
import config from "./config.js";
import express from "express";
import cors from  "cors";
import bookRoute from './routes/bookRoute.js';

//app
const app = express();

//cors and json
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static("uploads"));

//endpoints
app.get("/", (req, res) => {
    return res.status(234).send("Welcome");
});

app.use("/books", bookRoute);

//connect to db
mongoose.connect(config.mongoUrl)
    .then(() => {
        //listen
        app.listen(config.port, () => {
            console.log("Listening");
        });
    })
    .catch(err => console.log(err));