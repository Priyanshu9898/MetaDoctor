import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prismadb";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  const body = await req.json();

  const { email, subject, message } = body;

  if (!email || !subject || !message) {
    return NextResponse.json(
      { message: "Please fill all the details", success: false },
      { status: 400 }
    );
  }

  try {
    const contact = await prisma.contact.create({
      data: {
        email: email,
        subject: subject,
        message: message,
      },
    });

    if (!contact) {
      return NextResponse.json(
        { message: "Error sending message", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Your Query sent Successfully, We will get back to you!",
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error sending message", success: false },
      { status: 500 }
    );
  }
};
