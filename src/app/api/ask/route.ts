import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { aiConfig, isAIConfigured } from "@/lib/ai-config";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Check if AI is configured
    if (!isAIConfigured()) {
      return NextResponse.json({
        response:
          "I'm sorry, but I'm not currently configured to respond. Please check your AI configuration.",
      });
    }

    // Generate AI response
    const { text } = await generateText({
      ...aiConfig,
      prompt: `You are a helpful AI assistant. Please respond to the following message in a friendly, informative, and helpful way. Keep your response concise but thorough.

User message: ${message}

Your response:`,
    });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error in ask API:", error);
    return NextResponse.json(
      {
        response:
          "I'm sorry, but I encountered an error while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

