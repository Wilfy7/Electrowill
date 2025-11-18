import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import userData from "./models/userData.model";



export const validate = (Schema: any) => 
    (req: Request, res: Response, next: NextFunction)=> {
    const result = Schema.safeParse(req.body);
     if (!result.success) {
        return res.status(400).json(result.error.format());
        
        }
        next();
     }



export const validateQuery = 
   (schema: ZodObject) => 
    (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse(req.query);
        req.query = parsed as any;
        next();
    } catch (error: any) {
       return res.status(400).json({
        message: "Querry validation failed",
        errors: error.errors,
       })
    }
};

