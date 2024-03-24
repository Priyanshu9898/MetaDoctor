import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const api_key: string = process.env.GEMINI_API_KEY || "";

console.log(api_key);

const genAI = new GoogleGenerativeAI(api_key);

const fileToGenerativePart = (data: string, mimeType: any) => {
  return {
    inlineData: {
      data: data,
      mimeType,
    },
  };
};


export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.formData();
    
    const image: File | null = body.get("image") as unknown as File;
    const mimeType: string | null = body.get("mimeType") as string;
    console.log(mimeType);

    if (!image) {
      return NextResponse.json(
        {
          message: "Please Upload a Image.",
          success: false,
        },
        { status: 401 }
      );
    }
    const bytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(bytes);
    const imageBase64String = imageBuffer.toString("base64");

    // const { image, mimeType } = body;

    const input_prompt = `
    As a recognized expert in nutritional analysis, your task involves meticulously examining food items displayed in an image and calculating their total caloric content accurately. It is imperative that your response adheres strictly to a structured JSON format to ensure the data is precise and easily interpretable. Furthermore, based on your analysis of the food items, you are tasked with creating a comprehensive meal plan that offers balanced and nutritious meal recommendations for each day of the upcoming week. Each suggested meal must align with dietary guidelines and consider an optimal caloric intake to promote health and well-being.

    Your response must include the following elements:
    1. A detailed enumeration of each food item's caloric content as identified from the image.
    2. The aggregate caloric value of all the food items combined.
    3. A seven-day India strict Vegetarian meal plan that includes recommendations for breakfast, lunch, dinner, and two snacks for each day, designed to maintain a balanced diet.

    Please ensure your response is formatted as structured JSON, adhering to the example format provided below. Note: The ellipsis ("...") symbol is used here to indicate continuation or the presence of additional items or days in the meal plan. These symbols should not be included in your actual JSON response. Ensure no markdown syntax (such as backticks) or additional characters that would invalidate the JSON format are included in your response.

    Example format for your JSON response:

    {
      "image_analysis": {
        "total_calories": "<Total calculated calories>",
        "items": [
          {"name": "Item 1", "calories": "<number of calories>"},
          {"name": "Item 2", "calories": "<number of calories>"}
        ]
      },
      "weekly_meal_plan": {
        "Day 1": {
          "breakfast": "<meal suggestion>",
          "lunch": "<meal suggestion>",
          "dinner": "<meal suggestion>",
          "snacks": [
            "<snack 1 suggestion>",
            "<snack 2 suggestion>"
          ]
        },
        "Day 7": {
          "breakfast": "<meal suggestion>",
          "lunch": "<meal suggestion>",
          "dinner": "<meal suggestion>",
          "snacks": [
            "<snack 1 suggestion>",
            "<snack 2 suggestion>"
          ]
        }
      }
    }

    Please replace placeholders (e.g., "<Total calculated calories>", "<meal suggestion>") with actual data values based on your analysis. The JSON response must be free of syntax errors and should not include characters or formatting that would prevent it from being parsed correctly as valid JSON.
    `;
    // // Note: When using this prompt in your application, ensure to parse the JSON response correctly and handle any potential exceptions that might arise from invalid JSON syntax.

    const imageData = fileToGenerativePart(imageBase64String, mimeType);

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    console.log(model);

    const result = await model.generateContent([input_prompt, imageData]);

    const response = await result.response;
    const text = response.text();

    console.log(JSON.parse(text));

    const finaltext = JSON.parse(text);

    console.log(finaltext);

    return NextResponse.json(
      {
        message: "Response generated successfully",
        success: true,
        response: finaltext,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};


// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI();

// export const POST = async (req: NextRequest, res: NextResponse) => {
//   try {
//     const body = await req.formData();
    
//     const image: File | null = body.get("image") as unknown as File;
//     const mimeType: string | null = body.get("mimeType") as string;
//     console.log(mimeType);

//     if (!image) {
//       return NextResponse.json(
//         {
//           message: "Please Upload a Image.",
//           success: false,
//         },
//         { status: 401 }
//       );
//     }
//     const bytes = await image.arrayBuffer();
//     const imageBuffer = Buffer.from(bytes);
//     const imageBase64String = imageBuffer.toString("base64");

//     // const { image, mimeType } = body;

//     const input_prompt = `
//     As a recognized expert in nutritional analysis, your task involves meticulously examining food items displayed in an image and calculating their total caloric content accurately. It is imperative that your response adheres strictly to a structured JSON format to ensure the data is precise and easily interpretable. Furthermore, based on your analysis of the food items, you are tasked with creating a comprehensive meal plan that offers balanced and nutritious meal recommendations for each day of the upcoming week. Each suggested meal must align with dietary guidelines and consider an optimal caloric intake to promote health and well-being.

//     Your response must include the following elements:
//     1. A detailed enumeration of each food item's caloric content as identified from the image.
//     2. The aggregate caloric value of all the food items combined.
//     3. A seven-day India strict Vegetarian meal plan that includes recommendations for breakfast, lunch, dinner, and two snacks for each day, designed to maintain a balanced diet.

//     Please ensure your response is formatted as structured JSON, adhering to the example format provided below. Note: The ellipsis ("...") symbol is used here to indicate continuation or the presence of additional items or days in the meal plan. These symbols should not be included in your actual JSON response. Ensure no markdown syntax (such as backticks) or additional characters that would invalidate the JSON format are included in your response.

//     Example format for your JSON response:

//     {
//       "image_analysis": {
//         "total_calories": "<Total calculated calories>",
//         "items": [
//           {"name": "Item 1", "calories": "<number of calories>"},
//           {"name": "Item 2", "calories": "<number of calories>"}
//         ]
//       },
//       "weekly_meal_plan": {
//         "Day 1": {
//           "breakfast": "<meal suggestion>",
//           "lunch": "<meal suggestion>",
//           "dinner": "<meal suggestion>",
//           "snacks": [
//             "<snack 1 suggestion>",
//             "<snack 2 suggestion>"
//           ]
//         },
//         "Day 7": {
//           "breakfast": "<meal suggestion>",
//           "lunch": "<meal suggestion>",
//           "dinner": "<meal suggestion>",
//           "snacks": [
//             "<snack 1 suggestion>",
//             "<snack 2 suggestion>"
//           ]
//         }
//       }
//     }

//     Please replace placeholders (e.g., "<Total calculated calories>", "<meal suggestion>") with actual data values based on your analysis. The JSON response must be free of syntax errors and should not include characters or formatting that would prevent it from being parsed correctly as valid JSON.
//     `;
//     // // Note: When using this prompt in your application, ensure to parse the JSON response correctly and handle any potential exceptions that might arise from invalid JSON syntax.

//     let headers = {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     };

    

//     const payload = {
//       "model": "gpt-4-vision-preview",
//       "messages": [
//         {
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": "What’s in this image?"
//             },
//             {
//               "type": "image_url",
//               "image_url": {
//                 "url": `data:${mimeType};base64,${imageBase64String}`
//               }
//             }
//           ]
//         }
//       ],
//       "max_tokens": 2000
//     };

//     console.log(payload);

//     response = axios.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

//     print(response.json())

//     return NextResponse.json(
//       {
//         message: "Response generated successfully",
//         success: true,
//         response: finaltext,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error },
//       { status: 500 }
//     );
//   }
// };



