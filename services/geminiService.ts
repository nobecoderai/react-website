import { GoogleGenAI } from "@google/genai";

export const getShoppingAdvice = async (query: string, products: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a helpful shopping assistant for "Luxurious Cart". 
      Based on the following list of products: ${products}. 
      Answer this user query concisely: ${query}. 
      Focus on recommending the best product and explain why.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my AI brain. Please try again later!";
  }
};