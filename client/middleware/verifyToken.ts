import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const verifyJWTToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    return decodedToken;
  } catch (err) {
    return NextResponse.json({ message: "Failed to Authenticate" });
  }
};
