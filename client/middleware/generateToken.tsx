import jwt from "jsonwebtoken";

interface tokenData {
  id: string;
  name: string;
  email: string;
}

export const generateJWTToken = async (tokenData: tokenData) => {
  try {
    return jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "15d" });
  } catch (err) {
    return "";
  }
};
