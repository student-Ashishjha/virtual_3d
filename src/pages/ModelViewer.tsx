import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Clock, MapPin, Calendar, ExternalLink, Bot } from 'lucide-react';
import ThreeDViewer from '../components/ThreeDViewer';
import VoiceAssistant from '../components/VoiceAssistant';
import HistoricalView from '../components/HistoricalView';
import AIChat from '../components/AIChat';

const heritagePlaces = {
  'taj-mahal': {
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    yearBuilt: '1653',
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.',
    modelPath: '/models/taj-mahal',
    hasBooking: true,
    bookingUrl: 'https://www.irctc.co.in',
    detailedInfo: 'Built over 17 years by 20,000 workers, the Taj Mahal combines elements from Islamic, Persian, Ottoman Turkish and Indian architectural styles. The main dome is 35 meters high and surrounded by four smaller domes.',
    architect: 'Ustad Ahmad Lahori',
    materials: 'White marble, Red sandstone, Precious stones'
  },
  'qutub-minar': {
    name: 'Qutub Minar',
    location: 'Delhi',
    yearBuilt: '1220',
    description: 'The Qutub Minar is a minaret and "victory tower" that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi, India.',
    modelPath: '/models/qutub-minar',
    hasBooking: false,
    detailedInfo: 'Standing at 73 meters tall, it is the tallest brick minaret in the world. The tower has five distinct storeys, each marked by a projecting balcony.',
    architect: 'Qutb-ud-din Aibak',
    materials: 'Red sandstone, Marble'
  },
  'hampi': {
    name: 'Hampi',
    location: 'Karnataka',
    yearBuilt: '1336',
    description: 'Hampi was the capital of the Vijayanagara Empire in the 14th century. Chronicles left by Persian and European travelers describe it as a prosperous, well-fortified city.',
    modelPath: '/models/hampi',
    hasBooking: false,
    detailedInfo: 'The site comprises more than 1,600 surviving remains of the last great Hindu kingdom in South India that includes forts, riverside features, royal and sacred complexes.',
    architect: 'Vijayanagara Architects',
    materials: 'Granite, Local stone'
  },
  'red-fort': {
    name: 'Red Fort',
    location: 'Delhi',
    yearBuilt: '1648',
    description: 'The Red Fort is a historic walled city in Delhi, India that was the main residence of the Mughal emperors for nearly 200 years.',
    modelPath: '/models/red-fort',
    hasBooking: false,
    detailedInfo: 'The fort represents the zenith of Mughal creativity which, under the Shah Jahan, was brought to a new level of refinement.',
    architect: 'Ustad Ahmad Lahori',
    materials: 'Red sandstone, Marble'
  },
  'ajanta-caves': {
    name: 'Ajanta Caves',
    location: 'Maharashtra',
    yearBuilt: '2nd Century BCE',
    description: 'The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments which date from the 2nd century BCE to about 480 CE.',
    modelPath: '/models/ajanta-caves',
    hasBooking: false,
    detailedInfo: 'The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.',
    architect: 'Buddhist Monks',
    materials: 'Basalt rock'
  },
  'khajuraho': {
    name: 'Khajuraho Temples',
    location: 'Madhya Pradesh',
    yearBuilt: '950-1150 CE',
    description: 'The Khajuraho Group of Monuments is a group of Hindu and Jain temples in Chhatarpur district, Madhya Pradesh, India.',
    modelPath: '/models/khajuraho',
    hasBooking: false,
    detailedInfo: 'Only about 20 temples remain; they fall into three distinct groups and belong to two different religions - Hinduism and Jainism.',
    architect: 'Chandela Dynasty Architects',
    materials: 'Sandstone'
  }
};

function ModelViewer() {
  const { placeId } = useParams();
  const place = heritagePlaces[placeId as keyof typeof heritagePlaces];
  const [showHistorical, setShowHistorical] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Place not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleVisitBooking = () => {
    if (place.hasBooking && (place as any).bookingUrl) {
      window.open((place as any).bookingUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Explore</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHistorical(!showHistorical)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showHistorical
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Historical View</span>
              </button>
              <button
                onClick={() => setShowAIChat(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span>AI Assistant</span>
              </button>
              {place.hasBooking && (
                <button
                  onClick={handleVisitBooking}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Book Visit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{place.name}</h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{place.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Built: {place.yearBuilt}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVoiceActive(!isVoiceActive)}
                    className={`p-3 rounded-full transition-colors ${
                      isVoiceActive 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isVoiceActive ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                  </button>
                </div>
              </div>
              
              <div className="relative" style={{ height: '500px' }}>
                {showHistorical ? (
                  <HistoricalView placeName={place.name} />
                ) : (
                  <ThreeDViewer modelPath={place.modelPath} placeName={place.name} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 mb-4">{place.description}</p>
              <p className="text-gray-600 mb-4">{place.detailedInfo}</p>
              
              <div className="space-y-2 text-sm">
                <div><strong>Architect:</strong> {place.architect}</div>
                <div><strong>Materials:</strong> {place.materials}</div>
              </div>
            </div>

            {/* Voice Assistant */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <VoiceAssistant 
                isActive={isVoiceActive} 
                placeName={place.name}
                placeInfo={place}
              />
            </div>
          </div>
        </div>
      </div>
      {showAIChat && <AIChat placeName={place.name} onClose={() => setShowAIChat(false)} />}
    </div>
  );
}

export default ModelViewer;
