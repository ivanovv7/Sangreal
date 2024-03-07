
import { mongo_connection } from "./mongoConnection";
import express from "express";
import { router } from "./router";

const app = express();

app.use(express.json())

app.use("/products",router)



app.listen(4321, () => {
  mongo_connection();
  console.log("Server is live");
});
