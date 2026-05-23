import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable. Make sure it is set in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();
    console.log("Available Models:");
    data.models.forEach((m: any) => console.log(m.name));
  } catch (e) {
    console.error(e);
  }
}

listModels();
