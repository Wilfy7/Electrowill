import dotenv from "dotenv";
import mongoose from "mongoose";
import  logger from "./logger";
import devApp from "./index.config";





dotenv.config()


const connectDB = async () => {
    const uri = devApp.dev.db.uri as string; 

    try {
        const db = await mongoose.connect(uri);
        logger.info({ message: `MongoDB connected: ${db.connection.host}` });
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
        throw error;
    }
    };

export default connectDB;