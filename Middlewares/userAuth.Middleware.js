import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const userAuthentication = async (req, res, next) => {
  const { userToken } = req.cookie;
  try {
    if (!userToken) {
      console.log("User token not found");
      return res.status(401).json({ message: "User Token Not Found" });
    }
    const userVerification = jwt.verify(userToken, process.env.USER_TOKEN_KEY);
    res.send = userVerification;
    next();
  } catch (error) {
    console.log("There is some issues in user verification middleware plz fix the bug first ", error);
  }
};
