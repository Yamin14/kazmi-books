import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.mongoUrl || 'mongodb+srv://syalikazmi:6Cjy4ia3qwjs8Fk@books.tbigg.mongodb.net/?retryWrites=true&w=majority&appName=Books'
}

export default config;