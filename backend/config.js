import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT,
    mongoUrl: process.env.mongoUrl
}

export default config;