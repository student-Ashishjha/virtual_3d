import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Play, Pause, Settings } from 'lucide-react';

interface VoiceAssistantProps {
  isActive: boolean;
  placeName: string;
  placeInfo: any;
}

function VoiceAssistant({ isActive, placeName, placeInfo }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  // Placeholder for voice assistant functionality
  const startListening = () => {
    setIsListening(true);
    setTranscript('Listening for your question...');
    
    // Simulate listening
    setTimeout(() => {
      setIsListening(false);
      setTranscript('Tell me about the architecture of this monument');
      generateResponse('Tell me about the architecture of this monument');
    }, 3000);
  };

  const generateResponse = (question: string) => {
    // This is where you'll integrate your AI API
    setIsSpeaking(true);
    const sampleResponse = `The ${placeName} showcases magnificent ${placeInfo.materials.toLowerCase()} architecture. Built in ${placeInfo.yearBuilt} by ${placeInfo.architect}, it represents the pinnacle of craftsmanship of its era. The intricate details and proportions make it one of India's most remarkable monuments.`;
    
    setResponse(sampleResponse);
    
    // Simulate speaking duration
    setTimeout(() => {
      setIsSpeaking(false);
    }, 5000);
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    // Add logic to stop text-to-speech
  };

  if (!isActive) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MicOff className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Voice Assistant</h3>
        <p className="text-gray-600 text-sm">
          Click the voice button in the header to activate the AI assistant
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">AI Voice Assistant</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-600">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Voice Controls */}
      <div className="flex space-x-2">
        <button
          onClick={startListening}
          disabled={isListening || isSpeaking}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isListening 
              ? 'bg-red-100 text-red-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{isListening ? 'Listening...' : 'Ask Question'}</span>
        </button>

        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Pause className="w-4 h-4" />
            <span>Stop</span>
          </button>
        )}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Mic className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Your Question:</span>
          </div>
          <p className="text-gray-800 text-sm">{transcript}</p>
        </div>
      )}

      {/* AI Response */}
      {response && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">AI Assistant:</span>
            </div>
            {isSpeaking && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-xs text-blue-600">Speaking...</span>
              </div>
            )}
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">{response}</p>
        </div>
      )}

      {/* API Setup Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Settings className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Setup Required</span>
        </div>
        <p className="text-yellow-700 text-xs">
          Connect your AI API keys to enable real voice interaction and text-to-speech functionality.
        </p>
      </div>

      {/* Sample Questions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Sample Questions:</h4>
        <div className="grid grid-cols-1 gap-2">
          {[
            'What is the historical significance?',
            'Who built this monument?',
            'What materials were used?',
            'Tell me about the architecture'
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => generateResponse(question)}
              className="text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VoiceAssistant;