import React, { useState, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

interface AIChatProps {
  placeName: string;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ placeName, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const describeImage = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    try {
      const base64DataUrl = await fileToBase64(uploadedImage);
      const base64 = base64DataUrl.split(',')[1];
      const mimeType = base64DataUrl.split(';')[0].split(':')[1];
      const prompt = 'Describe this image in detail, focusing on historical and architectural aspects if applicable.';

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64
                  }
                }
              ]
            }],
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`API request failed: ${res.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      const description = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No description available';

      const newMessage: Message = { role: 'assistant', content: description };
      setMessages(prev => [...prev, newMessage]);
      speak(description);
    } catch (error) {
      console.error('Error describing image:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: `Sorry, I couldn't describe the image. Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  const generateHistoricalImage = async () => {
    setIsLoading(true);
    try {
      const prompt = `Describe in detail how ${placeName} might have looked 200 years ago, including architectural features, surroundings, and historical context. Provide a vivid description as if painting a picture with words.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`API request failed: ${res.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available';

      const newMessage: Message = {
        role: 'assistant',
        content: `Historical Description of ${placeName} 200 years ago:\n\n${text}`
      };
      setMessages(prev => [...prev, newMessage]);
      speak(text);
    } catch (error) {
      console.error('Error generating historical description:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: `Sorry, I couldn't generate the historical description. Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const userMessage: Message = { 
        role: 'user', 
        content: `Uploaded image: ${file.name}`, 
        image: URL.createObjectURL(file) 
      };
      setMessages(prev => [...prev, userMessage]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    setIsLoading(true);
    try {
      const contextualPrompt = `You are an expert guide for ${placeName}. Answer this question: ${currentInput}`;
      
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: contextualPrompt }] }],
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`API request failed: ${res.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available';

      const assistantMessage: Message = { role: 'assistant', content: text };
      setMessages(prev => [...prev, assistantMessage]);
      speak(text);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: `Sorry, I couldn't respond. Please check:\n1. Your API key is correct\n2. Billing is enabled on your Google Cloud project\n3. The Gemini API is enabled\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-3/4 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">AI Assistant for {placeName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p>Ask me anything about {placeName}!</p>
              <p className="text-sm mt-2">Try uploading an image or asking about its history.</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}>
                {msg.image && <img src={msg.image} alt="Uploaded" className="max-w-full h-auto mb-2 rounded" />}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                <div className="animate-pulse">AI is thinking...</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t space-y-2">
          <div className="flex space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
            >
              Upload Image
            </button>
            <button
              onClick={describeImage}
              disabled={!uploadedImage || isLoading}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50 text-sm"
            >
              Describe Image
            </button>
            <button
              onClick={generateHistoricalImage}
              disabled={isLoading}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50 text-sm"
            >
              Historical View
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything about this heritage site..."
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;