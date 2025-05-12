import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { Resume, Skill, WorkExperience, Education, ParsingError } from './types/resume';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is not set. Please add it to your .env file');
  console.error('Create a .env file in the root directory with the following content:');
  console.error('GEMINI_API_KEY=your_gemini_api_key_here');
  console.error('PORT=5000');
}
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


async function parseResumeWithGemini(text: string): Promise<Resume> {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{
          parts: [{
            text: `
              Given the following resume text, extract structured data in JSON format for skills (with proficiency levels), work experience (company, role, dates, description), and education (institution, degree, major, graduation year). Standardize dates to YYYY-MM format and normalize degree names (e.g., "BS" to "Bachelor of Science"). If any information is ambiguous or missing, note it as an error.

              Resume Text:
              ${text}

              Output:
              {
                "skills": [{ "name": string, "proficiency": "Beginner|Intermediate|Advanced|Expert", "context"?: string }],
                "workExperience": [{ "company": string, "role": string, "startDate": string, "endDate": string|"Present", "description": string }],
                "education": [{ "institution": string, "degree": string, "major": string, "graduationYear": number }],
                "errors": [{ "field": string, "message": string }]
              }
            `
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract text from Gemini response which has a different structure
    const responseText = response.data.candidates[0].content.parts[0].text;
    // Find the JSON part in the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    return JSON.parse(jsonMatch[0]) as Resume;
  } catch (error) {
    console.error('Gemini API error:', error);
    // Log specific error details for better debugging
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Response error data:', error.response.data);
        console.error('API Response error status:', error.response.status);
      } else if (error.request) {
        console.error('No response received from API');
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
    return { skills: [], workExperience: [], education: [], errors: [{ field: 'general', message: 'Failed to parse resume' }] };
  }
}

function validateResume(resume: Resume): Resume {
  const errors: ParsingError[] = [...resume.errors];

  // Validate skills
  resume.skills.forEach((skill: Skill, index: number) => {
    if (!['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(skill.proficiency)) {
      errors.push({ field: `skills[${index}].proficiency`, message: `Invalid proficiency level: ${skill.proficiency}` });
      skill.proficiency = 'Beginner';
    }
  });

  // Validate work experience
  resume.workExperience.forEach((exp: WorkExperience, index: number) => {
    if (!exp.startDate.match(/^\d{4}-\d{2}$/)) {
      errors.push({ field: `workExperience[${index}].startDate`, message: `Invalid date format: ${exp.startDate}` });
      exp.startDate = '1970-01';
    }
    if (exp.endDate !== 'Present' && !exp.endDate.match(/^\d{4}-\d{2}$/)) {
      errors.push({ field: `workExperience[${index}].endDate`, message: `Invalid date format: ${exp.endDate}` });
      exp.endDate = '1970-01';
    }
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    if (start > end) {
      errors.push({ field: `workExperience[${index}]`, message: `Start date after end date` });
    }
  });

  // Validate education
  const degreeMap: { [key: string]: string } = {
    'BS': 'Bachelor of Science',
    'B.Sc.': 'Bachelor of Science',
    'BA': 'Bachelor of Arts',
  };
  resume.education.forEach((edu: Education, index: number) => {
    if (degreeMap[edu.degree]) {
      edu.degree = degreeMap[edu.degree];
    }
    if (edu.graduationYear < 1900 || edu.graduationYear > new Date().getFullYear()) {
      errors.push({ field: `education[${index}].graduationYear`, message: `Invalid graduation year: ${edu.graduationYear}` });
      edu.graduationYear = new Date().getFullYear();
    }
  });

  return { ...resume, errors };
}

const router = express.Router();

// @ts-ignore
router.post('/parse', (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Resume text is required' });
  }

  parseResumeWithGemini(text)
    .then(resume => {
      const validatedResume = validateResume(resume);
      res.json(validatedResume);
    })
    .catch(error => {
      console.error('Error processing resume:', error);
      res.status(500).json({ error: 'Failed to process resume' });
    });
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));