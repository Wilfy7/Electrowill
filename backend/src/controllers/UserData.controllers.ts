import { Request, Response } from "express";
import userData from "../models/userData.model";
import logger from "../config/logger";



export const createUser = async (req: Request, res: Response) => {
    try {
        logger.info(`Body received: ${JSON.stringify(req.body)}`);


        const { name, email, password } = req.body;


        //Check if user already exists
        const existingUser = await userData.findOne({
            email: email
        })

        if(existingUser) {
            return res.status(403).json({
            message: "User already exists"
            })
        }


        //Create a user
        const user = await userData.create({name, email, password});

        res.status(201).json({
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        logger.error("Error creating user:", error);
        res.status(500).json({
            message: "Error creating user"
        });        


    }};



export const getSingleUser = async (req: Request, res: Response) => {
    try {

        const userId = req.params.id;
        const user = await userData.findById(userId);

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });

        } else {
            res.status(200).json({
                message: "User fetched successfully",
                data: user
            });
        };
        
    
    }catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).json({
            message: "Error fetching the user"
        });
    }};



export const getAllUsers = async (req: Request, res: Response) => {
    try {
       const {page, limit, sort} = req.query as {
        page: any;
        limit: any;
        sort?: string;
       };

        const users = await userData.find()
            .sort(sort || "createdAt")
            .skip((page -1) * limit)
            .limit(limit);

      
           return res.status(200).json({
                message: "Users fetched successfully",
                data: users,
            });
         
    } catch (error) {
        logger.error("Error fetching users:", error);
        res.status(500).json({
        message: "Error fetching users"
        });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await userData.findByIdAndUpdate(userId, updateData, 
            { 
              new: true 
            });

            if (!updatedUser) {
                res.status(404).json({
                    message: "User not found"
                })
                }else {
                    res.status(200).json({
                        message: "User updated successfully",
                        data: updatedUser
                    })
                
            };

    } catch (error) {
        logger.error("Error updating user");
        res.status(500).json({
            message: "Error updating user"
        });
    }
};

export const deleteUser = async(req: Request, res: Response) => {
    try {

        const userId = req.params.id;
        
        const deletedUser = await userData.findByIdAndDelete(userId);

        if (!deletedUser) {
            res.status(404).json({
                message: "User not found"
            });
        } 
           else {
            res.status(200).json({
                message: "User deleted"
            });           
        };
        
        
    } catch (error) {
        logger.error("Error deleting user")
        res.status(500).json({
            message: "Error deleting user"
        });
    };
};
