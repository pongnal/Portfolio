import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly ollamaHost = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';

  async chat(message: string, model: string = 'llama2') {
    try {
      const response = await axios.post(`${this.ollamaHost}/api/chat`, {
        model,
        messages: [{ role: 'user', content: message }],
        stream: false,
      });

      console.log('API Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error communicating with Ollama:', error);
      throw new Error('Failed to communicate with Ollama service');
    }
  }
} 