import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./config/logger";
import connectDB from "./config/connectDB";
import devApp from "./config/index.config";
import userDataRouter from "./routes/userData.Router";
import productDataRouter from "./routes/productData.Router";




const app = express(); 
const port = devApp.dev.port || 5004;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1", userDataRouter);
app.use("/api/v1", productDataRouter);


app.get("/",  (req: express.Request, res:express.Response):any => {

    try {
        return res.status(200).json({
            message: "ElectroWill Dev Server"
        })
    } catch (error) {
      return res.status(500).json({
        message: "Server Error" 
      }) 
    }  
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`)


try {
    
} catch (error) {
   logger.error('Failed to connect to DB', error);
   process.exit(1);  
}

connectDB();

//Handle unknown routes
app.use((req: express.Request, res: express.Response):any => {
    return res.status(400).json({
    message: "Page not found"
  });
});
});


export default app;