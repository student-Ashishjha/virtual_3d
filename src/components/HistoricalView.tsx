import React, { useState } from 'react';
import { Clock, Image, Loader, Sparkles } from 'lucide-react';

interface HistoricalViewProps {
  placeName: string;
}

function HistoricalView({ placeName }: HistoricalViewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [historicalImage, setHistoricalImage] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('100-years');

  const periods = [
    { value: '50-years', label: '50 Years Ago', year: '1975' },
    { value: '100-years', label: '100 Years Ago', year: '1925' },
    { value: '200-years', label: '200 Years Ago', year: '1825' },
    { value: 'original', label: 'Original Era', year: 'As Built' }
  ];

  const generateHistoricalImage = () => {
    setIsGenerating(true);
    
    // Simulate AI image generation
    setTimeout(() => {
      // In real implementation, this would call your AI image generation API
      // For now, we'll use a placeholder
      setHistoricalImage('https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white/90 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-800">Historical View</h3>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label} ({period.year})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {!historicalImage ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-amber-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Time Travel to {periods.find(p => p.value === selectedPeriod)?.year}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Generate an AI-powered visualization of how {placeName} looked{' '}
                {periods.find(p => p.value === selectedPeriod)?.label.toLowerCase()}. 
                Experience history through cutting-edge AI technology.
              </p>

              <button
                onClick={generateHistoricalImage}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 transition-colors mx-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Image className="w-5 h-5" />
                    <span>Generate Historical View</span>
                  </>
                )}
              </button>

              {/* API Setup Notice */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-700 text-sm">
                  <strong>Setup Required:</strong> Connect your AI image generation API 
                  (DALL-E, Midjourney, or Stable Diffusion) to enable historical visualizations.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={historicalImage}
                alt={`${placeName} - ${periods.find(p => p.value === selectedPeriod)?.label}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                {placeName} - {periods.find(p => p.value === selectedPeriod)?.label}
              </h4>
              <p className="text-gray-600 text-sm">
                This AI-generated image shows how {placeName} might have appeared 
                during the {periods.find(p => p.value === selectedPeriod)?.year} period, 
                based on historical records and architectural analysis.
              </p>
              
              <button
                onClick={() => setHistoricalImage(null)}
                className="mt-3 text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                Generate Different Period →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoricalView;