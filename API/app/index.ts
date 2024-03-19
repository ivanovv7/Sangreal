
import { mongo_connection } from "./mongoConnection";
import express from "express";
import { router } from "./router";
import cors from "cors"
import { getUserByUsername } from "./Authentication/usersService";
import { authRouter } from "./Authentication/authRouter";

const app = express();


app.use(express.json())
app.use(cors())


app.use("/auth",authRouter)
app.use("/products",router)

getUserByUsername("ivanovv7")

app.listen(4321, () => {
  mongo_connection();
  console.log("Server is live");
});
