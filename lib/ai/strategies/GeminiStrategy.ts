import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { AIStrategy, ChatMessage } from "../types";

export class GeminiStrategy implements AIStrategy {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = "gemini-1.5-flash") {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateResponse(
    messages: ChatMessage[],
    context: string
  ): Promise<string> {
    try {
      const systemPrompt = `You are a helpful AI assistant for Evently, an event management platform. 

IMPORTANT INSTRUCTIONS:
- Only answer questions related to the company information provided in the context below
- If a question is not related to the context or company information, respond with exactly: "Dunno"
- Be helpful, friendly, and professional
- Keep responses concise but informative
- Focus on information about Evently's services, features, and company details

CONTEXT:
${context}

Please respond based only on the information provided in the context above.`;

      const conversationMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const { text } = await generateText({
        model: google(this.model),
        system: systemPrompt,
        messages: conversationMessages,
        maxTokens: 500,
        temperature: 0.7,
      });

      return text;
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("Failed to generate response from Gemini");
    }
  }

  getModelName(): string {
    return `Gemini (${this.model})`;
  }
}
