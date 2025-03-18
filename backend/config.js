const dotenv = require('dotenv');

dotenv.config();

const config = {
    port: process.env.PORT,
    mongoUrl: process.env.mongoUrl,
    TOKEN_KEY: process.env.TOKEN_KEY
}

module.exports = config