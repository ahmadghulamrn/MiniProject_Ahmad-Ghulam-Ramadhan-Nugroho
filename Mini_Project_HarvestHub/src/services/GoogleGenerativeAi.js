import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDZuaM44G4o8ktbEYomXQLZ8Ii4HDIPvtQ");

const generateContent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Google Generative AI API:", error);
    return "Maaf, saya tidak dapat memberikan jawaban saat ini.";
  }
};

export default generateContent;
