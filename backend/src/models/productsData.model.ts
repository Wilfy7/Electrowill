import mongoose from "mongoose";
import { IProductsData } from "../interface/productsData.interface";


const productsDataSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    image: {type: String, required: true, trim: true},
    tags: [{type: String, trim: true}],
    price: {type: Number, required:true, trim: true},
    category: {type: String, required:true, trim: true}
},
{
    timestamps: true
}
);
const productsData = mongoose.model<IProductsData>("productsData", productsDataSchema);
export default productsData;