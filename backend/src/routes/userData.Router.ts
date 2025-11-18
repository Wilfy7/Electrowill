import { Router } from "express";
import { 
        createUser, 
         deleteUser, 
         getAllUsers, 
         getSingleUser, 
         updateUser
        } from "../controllers/UserData.controllers";
import { validate, validateQuery } from "../middleware";
import { userDataSchema, userQuerySchema } from "../validation";





const userDataRouter = Router();


userDataRouter.get("/user/:id", getSingleUser)
userDataRouter.get("/users/all", getAllUsers)
userDataRouter.put("/user/update/:id", updateUser)
userDataRouter.delete("/user/delete/:id", deleteUser)


//Validators and Queryscheming applied

userDataRouter.post("/create/user", 
    validate(userDataSchema),
    createUser)
    

userDataRouter.get(
    "/users",
   validateQuery(userQuerySchema), getAllUsers
)


export default userDataRouter; 