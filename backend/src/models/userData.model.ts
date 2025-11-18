import mongoose from "mongoose";
import { IuserData } from "../interface/userData.interface";



const userdataSchema= new mongoose.Schema ({
    

    name: {
        type: String, 
        required: true, 
        trim: true},

    email: {
        type: String, 
        required: true, 
        trim: true
    },

    password: {
        type: String, 
        required: true, 
        trim: true
    }
}, {timestamps: true});

const userData = mongoose.model<IuserData>("UserData", userdataSchema);
export default userData;
