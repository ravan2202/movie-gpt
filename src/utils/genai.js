import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from './constants';

const genAI = new GoogleGenerativeAI(GEMINI_KEY);


// const openai = new OpenAI({
//   apiKey: OPENAI_KEY, 
//   dangerouslyAllowBrowser: true
// });


export default genAI