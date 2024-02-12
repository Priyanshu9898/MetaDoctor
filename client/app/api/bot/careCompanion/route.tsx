import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const api_key: string = process.env.GEMINI_API_KEY || "";

console.log(api_key);

const genAI = new GoogleGenerativeAI(api_key);

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();


    

  } catch (error) {}
};
