import {GoogleGenerativeAI} from "@google/generative-ai";

const api_key: string = process.env.GEMINI_API_KEY || "";

console.log(api_key);

const genAI = new GoogleGenerativeAI(api_key);

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Hello, I have 2 dogs in my house.",
        },
        {
          role: "model",
          parts: "Great to meet you. What would you like to know?",
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
  
    const msg = "How many paws are in my house?";
  
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();