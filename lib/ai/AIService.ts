import { AIStrategy, ChatMessage } from './types';
import { GeminiStrategy } from './strategies/GeminiStrategy';
import fs from 'fs';
import path from 'path';

export class AIService {
  private strategy: AIStrategy;
  private context: string = '';

  constructor(strategy?: AIStrategy) {
    // Default to Gemini strategy
    this.strategy = strategy || new GeminiStrategy(
      process.env.GEMINI_API_KEY || '',
      'gemini-1.5-flash'
    );
    this.loadContext();
  }

  private loadContext(): void {
    try {
      const contextPath = path.join(process.cwd(), 'context.md');
      this.context = fs.readFileSync(contextPath, 'utf-8');
    } catch (error) {
      console.error('Failed to load context:', error);
      this.context = 'No context available.';
    }
  }

  public setStrategy(strategy: AIStrategy): void {
    this.strategy = strategy;
  }

  public async generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      return await this.strategy.generateResponse(messages, this.context);
    } catch (error) {
      console.error('AI Service error:', error);
      return 'Sorry, I encountered an error while processing your request. Please try again.';
    }
  }

  public getModelName(): string {
    return this.strategy.getModelName();
  }

  public refreshContext(): void {
    this.loadContext();
  }
}

// Singleton instance
let aiServiceInstance: AIService | null = null;

export function getAIService(): AIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService();
  }
  return aiServiceInstance;
}
