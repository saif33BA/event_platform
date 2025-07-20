import { NextRequest, NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai/AIService';
import { ChatMessage } from '@/lib/ai/types';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Create user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    // Prepare conversation history with the new message
    const messages: ChatMessage[] = [
      ...conversationHistory.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
      userMessage,
    ];

    // Get AI service and generate response
    const aiService = getAIService();
    const responseText = await aiService.generateResponse(messages);

    // Create assistant message
    const assistantMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };

    return NextResponse.json({
      response: responseText,
      conversationId: uuidv4(),
      userMessage,
      assistantMessage,
      modelName: aiService.getModelName(),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Chat API is running',
    model: getAIService().getModelName(),
  });
}
