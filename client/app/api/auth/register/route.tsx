import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJWTToken } from "@/middleware/generateToken";

interface UserRequestBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const POST = async (req: NextRequest) => {
  const body: UserRequestBody = await req.json();

  const { name, email, password, confirmPassword } = body;

  // console.log(userName, email, phone, password, confirmPassword, roleID);

  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "Please enter all the fields", success: false },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Password does not match", success: false },
      { status: 400 }
    );
  }

  const isUserPresent = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }],
    },
  });

  if (isUserPresent) {
    return NextResponse.json(
      { success: false, message: "User Already Present" },
      { status: 500 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await generateJWTToken(tokenData);

    const response = NextResponse.json(
      { message: "User created successfully", success: true, user: user },
      { status: 201 }
    );
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
};
