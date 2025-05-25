import { Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config(); // Ensure API key is loaded

let openai: OpenAIApi | null = null;

if (process.env.OPENAI_API_KEY) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(configuration);
} else {
  console.warn('OPENAI_API_KEY not found. AI features will be disabled.');
}

// @desc    Example AI-powered task (e.g., generate test case ideas)
// @route   POST /api/ai/generate-test-ideas
// @access  Private (or could be specific to certain challenges)
const generateTestIdeas = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!openai) {
    res.status(503);
    throw new Error('AI service is not available. OPENAI_API_KEY might be missing.');
  }

  const { context, numIdeas } = req.body;

  if (!context) {
    res.status(400);
    throw new Error('Context for test idea generation is required.');
  }

  const prompt = `Based on the following context, generate ${numIdeas || 3} test case ideas:\n\nContext: ${context}\n\nTest Ideas:`;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003", // Or a newer/cheaper model like gpt-3.5-turbo via chat completions
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      temperature: 0.7,
    });

    const ideas = completion.data.choices[0].text?.trim().split('\n').filter((idea: string) => idea.length > 0);
    res.json({ ideas });

  } catch (error: any) {
    console.error('OpenAI API error:', error.response ? error.response.data : error.message);
    res.status(500);
    throw new Error('Failed to generate test ideas from AI service.');
  }
});

// Add more AI-related controller functions as needed
// e.g., for prompt evaluation, AI test generation challenges

export { generateTestIdeas }; 