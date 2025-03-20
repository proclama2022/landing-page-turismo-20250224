interface SuggestedQuestionsResponse {
  result: string;
  data: string[];
}

interface Window {
  difyChatbotConfig?: {
    token: string;
    baseUrl: string;
  };
}
