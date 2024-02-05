import { verifyJWTToken } from "@/middleware/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logout Successfully" },
      { status: 201 }
    );
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
