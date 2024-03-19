import { userModel } from "../mongoose/authSchema";
import { userDB } from "./authInterfaces";

export const getUserByUsername = async (username: string):Promise<userDB | null> => {
  const foundUser = await userModel.findOne({ username: username });

  if(!foundUser){
    return null
  }
    const parsedUser = foundUser?.toObject();
  return parsedUser
};
