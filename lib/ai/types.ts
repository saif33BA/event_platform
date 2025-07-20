export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIModelConfig {
  name: string;
  apiKey: string;
  model: string;
}

export interface AIStrategy {
  generateResponse(messages: ChatMessage[], context: string): Promise<string>;
  getModelName(): string;
}

export interface ChatRequest {
  message: string;
  conversationHistory: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  conversationId: string;
}
