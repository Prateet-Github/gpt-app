import {OpenAI} from "openai";

// console.log('Gemini API Key loaded:', process.env.GEMINI_API_KEY ? 'Yes' : 'No')

const openai = new OpenAI({
    apiKey: "AIzaSyAU_Uok_Bmc0cEp6bIs1fBcj8RRqYWfiJU",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default openai;