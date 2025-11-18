import dotenv from "dotenv";




dotenv.config();


const devApp = {
    dev: {
        port: process.env.APP_PORT,

        db: {
        uri: process.env.MONGODB_URI
        }   
    }
};

// Runtime check to prevent undefined
if (!devApp.dev.port) {
    throw new Error("APP_PORT is not defined in .env");
}
if (!devApp.dev.db.uri) {
    throw new Error("MONGODB_URI is not defined in .env");
};

export default devApp;