import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from './supabaseClient';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable. Make sure it is set in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const targetCareers = [
  "Software Engineer",
  "Data Scientist",
  "Indian Railways (RRB NTPC/Group D)",
  "UPSC Civil Services (IAS/IPS)",
  "Medical Professional (MBBS/MD)",
  "Chartered Accountant (CA)"
];

const JSON_SCHEMA = `
{
  "title": "String - the title of the career path",
  "description": "String - A short, motivating summary of what this career entails",
  "milestones": [
    {
      "step": "Integer - step number",
      "name": "String - Name of the milestone (e.g., 'High School', 'Bachelor\\'s Degree')",
      "details": "String - Detailed actions to take in this step"
    }
  ],
  "estimated_timeline": "String - e.g., '4-6 years'",
  "required_skills": ["String"]
}
`;

async function generateCareerPath(careerTitle: string) {
  console.log(`Generating data for: ${careerTitle}...`);
  
  const prompt = `You are an expert career counselor. Generate a comprehensive, step-by-step career path guide for becoming a "${careerTitle}". 
  Provide the output STRICTLY in the following JSON format without any markdown wrappers or additional text:
  ${JSON_SCHEMA}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting if the model still outputs it despite the prompt
    const cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    const parsedData = JSON.parse(cleanedText);
    return parsedData;
  } catch (error) {
    console.error(`Failed to generate data for ${careerTitle}:`, error);
    return null;
  }
}

async function main() {
  console.log("Starting AI Career Path Generation...");
  
  for (const career of targetCareers) {
    const data = await generateCareerPath(career);
    
    if (data) {
      console.log(`Successfully generated data for ${data.title}. Pushing to Supabase...`);
      
      const { error } = await supabase
        .from('career_paths')
        .insert({
          title: data.title,
          description: data.description,
          ai_generated_content: {
            milestones: data.milestones,
            estimated_timeline: data.estimated_timeline,
            required_skills: data.required_skills
          }
        });
        
      if (error) {
        console.error(`Supabase Insert Error for ${data.title}:`, error.message);
      } else {
        console.log(`✅ Successfully inserted ${data.title} into the database.\n`);
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log("Job completed.");
}

main();
