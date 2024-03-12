
import { mongo_connection } from "./mongoConnection";
import express from "express";
import { router } from "./router";
import cors from "cors"

const app = express();


app.use(express.json())
app.use(cors())

app.use("/products",router)



app.listen(4321, () => {
  mongo_connection();
  console.log("Server is live");
});
