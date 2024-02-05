import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginType {
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: LoginType = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter all the fields", success: false },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User is not Present" },
        { status: 500 }
      );
    } else {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return NextResponse.json(
          { success: false, message: "UserName or Password Invalid" },
          { status: 500 }
        );
      }

      const tokenData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      const response = NextResponse.json(
        {
          success: true,
          message: "User Logged in successfully",
          user: tokenData,
        },
        { status: 201 }
      );
      response.cookies.set("token", token, { httpOnly: true });

      return response;
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
