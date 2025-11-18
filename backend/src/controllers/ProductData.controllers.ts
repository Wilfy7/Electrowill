import { Request, Response } from "express";
import logger from "../config/logger"
import productsData from "../models/productsData.model";




export const createProduct = async(req: Request, res: Response) => {
    try {
        
        const {name, image, description, price, category}= req.body;

        if (!name || !image || !description || !price || !category) {
            res.status(400).json({
                message: "All fields are required"
            });
        }

        // Create a new product
        const newProduct = new productsData({
            name,
            image,
            description,
            price,
            category
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ 
            message: "Product created successfully",
            data: savedProduct
        })

    } catch (error) {
       logger.error("Error creating product:", error);
        res.status(500).json({
            message: "Error creating product"
        })
    }
}


export const getSingleProduct = async(req: Request, res:Response) => {
    try {
        
        const productId = req.params.id;
        const product = await productsData.findById(productId)
        
        if(!product) {
            res.status(404).json({
                message: "Product not found"
            })
        } else {
            res.status(200).json({
              message: "Product fetched successfully",
              data: product
})        }
        
    } catch (error) {
       logger.error("Error fetching product:", error);
       res.status(500).json({
        message: "Error fetching product"
       }) 
    }
}


export const getAllProducts = async(req: Request, res: Response) => {
    try {
        
        const products = await productsData.find();

        res.status(200).json({
            message: "Products fetched successfully",
            data: products
        })

    } catch (error) {
       logger.error("Error fetching all products", error);
       res.status(500).json({
        message: "Error fetching all products"
       }) 
    }
}


export const updateProduct = async(req: Request, res: Response) => {
    try {
        
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await productsData.findByIdAndUpdate(
            productId,
            updateData,
            {new: true}
        )
        
        if (!updatedProduct) {
            res.status(404).json({
             message: "Product not updated"
            });
        }
        else {
            res.status(200).json({
                message: "Product updated succefully",
                data: updatedProduct
            })
        }

    } catch (error) {
       logger.error("Error updating product:", error);
       res.status(500).json({
        message: "Error updating product"
       });
    }
}

export const deletedProduct = async(req: Request, res: Response) => {
    try {

        const productId = req.params.id;
        const deletedProduct = await productsData.findByIdAndDelete(productId);

        if(!deletedProduct) {
            res.status(404).json({
            message: "Product not found"
            })
        } 
        else {
            res.status(200).json({
                message: "Product deleted successfully"
            })
        }
        
    } catch (error) {
       logger.error("Error deleting product:", error);
       res.status(500).json({
        message: "Error deleting product"
       }); 
    }
}