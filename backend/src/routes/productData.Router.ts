import { Router } from "express";
import { 
        createProduct, 
        deletedProduct, 
        getAllProducts, 
        getSingleProduct,
        updateProduct

       } from "../controllers/ProductData.controllers";




const productDataRouter = Router();

productDataRouter.post("/create/product", createProduct);
productDataRouter.get("/product/:id", getSingleProduct);
productDataRouter.get("/products/all", getAllProducts);
productDataRouter.put("/product/update/:id", updateProduct);
productDataRouter.delete("/product/delete/:id", deletedProduct);

export default productDataRouter;