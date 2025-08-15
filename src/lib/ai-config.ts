import { openai } from "@ai-sdk/openai";

// Configure the AI model
export const aiConfig = {
  model: openai("gpt-4.1-nano"),
  apiKey: process.env.OPENAI_API_KEY || process.env.AI_SDK_OPENAI_API_KEY,
};

// Helper function to check if AI is configured
export function isAIConfigured() {
  return !!aiConfig.apiKey;
}
