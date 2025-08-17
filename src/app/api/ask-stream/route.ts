import { NextRequest } from "next/server";
import { streamText } from "ai";
import { aiConfig, isAIConfigured } from "@/lib/ai-config";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt is required and must be a string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if AI is configured
    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({
          error:
            "I'm sorry, but I'm not currently configured to respond. Please check your AI configuration.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate streaming AI response
    const result = streamText({
      ...aiConfig,
      prompt: getChatPrompt(prompt),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in ask stream API:", error);
    return new Response(
      JSON.stringify({
        error:
          "I'm sorry, but I encountered an error while processing your request. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// get prompet from the user
const getChatPrompt = (prompt: string) => {
  return `You are a helpful AI assistant. Please respond to the following message in a friendly, informative, and helpful way. Keep your response concise but thorough.
  User message: ${prompt}
  Your response:`;
};
