
import { mongo_connection } from "./mongoConnection";
import express from "express";
import { router } from "./router";
import cors from "cors"
import { authRouter } from "./Authentication/authRouter";
import dotenv from "dotenv"

const app = express();

dotenv.config();
 

app.use(express.json())
app.use(cors())


app.use("/auth",authRouter)
app.use("/products",router)




app.listen(4321, () => {
  mongo_connection();
  console.log("Server is live");
});
