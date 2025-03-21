export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  created_at: string;
}

export interface DifyResponse {
  answer: string;
  conversation_id: string;
  id: string;
  suggested_questions?: string[];
}

export interface SuggestedQuestionsResponse {
  result: string;
  data: string[];
}

export interface StreamChunk {
  event: string;
  message_id?: string;
  conversation_id?: string;
  answer?: string;
  created_at?: number;
  metadata?: {
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
      prompt_unit_price?: string;
      prompt_price_unit?: string;
      prompt_price?: string;
      completion_unit_price?: string;
      completion_price_unit?: string;
      completion_price?: string;
      total_price?: string;
      currency?: string;
      latency?: number;
    };
    retriever_resources?: Array<{
      position: number;
      dataset_id: string;
      dataset_name: string;
      document_id: string;
      document_name: string;
      segment_id: string;
      score: number;
      content: string;
    }>;
  };
  id?: string;
  task_id?: string;
  message?: string;
  status?: number;
  code?: string;
}

export class DifyService {
  private difyUrl = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://dify-e9toe-u35360.vm.elestio.app/v1';
  private apiKey = process.env.DIFY_API_KEY || 'app-7nBQvpz0HlwgbmMnyLSzSp7l';
  private proxyUrl = '/api/dify-proxy';

  async sendMessage(message: string, conversationId?: string, onChunk?: (chunk: StreamChunk) => void) {
    try {
      console.log('Sending message to Dify via proxy:', {
        message,
        conversationId
      });

      const payload = {
        inputs: {},
        query: message,
        response_mode: onChunk ? "streaming" : "blocking",
        conversation_id: conversationId,
        user: "website-user",
        stream: true,
        streaming_function_call: true
      };

      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: '/chat-messages',
          method: 'POST',
          payload
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }

      if (onChunk) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        if (!reader) {
          throw new Error('Response body reader not available');
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              console.log('Stream completed');
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            console.log('Received raw chunk:', chunk);
            
            buffer += chunk;
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.trim() === '') continue;
              if (line.startsWith('data: ')) {
                try {
                  const chunkData = JSON.parse(line.slice(6)) as StreamChunk;
                  console.log('Parsed chunk:', chunkData);
                  onChunk(chunkData);
                } catch (e) {
                  console.error('Error parsing chunk:', e, 'Line:', line);
                }
              }
            }
          }
        } catch (error) {
          console.error('Error reading stream:', error);
          throw error;
        } finally {
          reader.releaseLock();
        }
        return null;
      } else {
        const data = await response.json() as DifyResponse;
        console.log('Blocking mode response:', data);
        return data;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getConversationHistory(conversationId: string) {
    try {
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: `/messages?conversation_id=${conversationId}&user=website-user`,
          method: 'GET'
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting conversation history:', error);
      throw error;
    }
  }

  async getSuggestedQuestions(messageId: string): Promise<SuggestedQuestionsResponse> {
    try {
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: `/messages/${messageId}/suggested?user=website-user`,
          method: 'GET'
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json() as SuggestedQuestionsResponse;
    } catch (error) {
      console.error('Error getting suggested questions:', error);
      throw error;
    }
  }

  async getFeedback(messageId: string, rating: 'like' | 'dislike', feedback?: string) {
    try {
      const payload = {
        rating,
        feedback,
        user: "website-user"
      };
      
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: `/messages/${messageId}/feedbacks`,
          method: 'POST',
          payload
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error;
    }
  }
}
