// import { GEMINI_KEY } from "./constants";

import {
  HarmBlockThreshold,
  HarmCategory,
  GoogleGenerativeAI,
} from "@google/generative-ai";

// ...

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: safetySettings,
});
console.log("Gemini API Key:", process.env.REACT_APP_GEMINI_KEY);

export default model;
