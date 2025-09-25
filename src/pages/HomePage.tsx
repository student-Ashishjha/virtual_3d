import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Camera, Mic } from 'lucide-react';
import HeritageCard from '../components/HeritageCard';
import SearchBar from '../components/SearchBar';

const heritagePlaces = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg',
    description: 'A UNESCO World Heritage Site, the Taj Mahal is an ivory-white marble mausoleum built by Mughal emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    yearBuilt: '1653',
    modelPath: '/models/taj-mahal', // Your .bin and .gltf files will go here
    hasBooking: true,
    bookingUrl: 'https://www.irctc.co.in'
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar',
    location: 'Delhi',
    image: 'https://images.pexels.com/photos/15104736/pexels-photo-15104736.jpeg',
    description: 'The tallest brick minaret in the world, Qutub Minar is a 73-meter tall tapering tower with intricate carvings and verses from the Quran.',
    yearBuilt: '1220',
    modelPath: '/models/qutub-minar',
    hasBooking: false
  },
  {
    id: 'hampi',
    name: 'Hampi',
    location: 'Karnataka',
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg',
    description: 'The ruins of the Vijayanagara Empire, Hampi is a UNESCO World Heritage Site known for its stunning architecture and boulder landscapes.',
    yearBuilt: '1336',
    modelPath: '/models/hampi',
    hasBooking: false
  },
  {
    id: 'red-fort',
    name: 'Red Fort',
    location: 'Delhi',
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
    description: 'A historic fortified palace built by Mughal Emperor Shah Jahan, serving as the main residence of the Mughal Emperors for nearly 200 years.',
    yearBuilt: '1648',
    modelPath: '/models/red-fort',
    hasBooking: false
  },
  {
    id: 'ajanta-caves',
    name: 'Ajanta Caves',
    location: 'Maharashtra',
    image: 'https://images.pexels.com/photos/11108465/pexels-photo-11108465.jpeg',
    description: 'Rock-cut Buddhist cave monuments dating from the 2nd century BCE, famous for their ancient paintings and sculptures.',
    yearBuilt: '2nd Century BCE',
    modelPath: '/models/ajanta-caves',
    hasBooking: false
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho Temples',
    location: 'Madhya Pradesh',
    image: 'https://images.pexels.com/photos/17120104/pexels-photo-17120104.jpeg',
    description: 'A group of Hindu and Jain temples famous for their nagara-style architectural symbolism and erotic sculptures.',
    yearBuilt: '950-1150 CE',
    modelPath: '/models/khajuraho',
    hasBooking: false
  }
];

function HomePage() {
  const navigate = useNavigate();

  const handlePlaceSelect = (placeId: string) => {
    navigate(`/model/${placeId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Heritage Explorer 3D
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-4xl mx-auto leading-relaxed">
              Immerse yourself in India's magnificent heritage through cutting-edge 3D technology. 
              Explore ancient monuments, listen to AI-powered stories, and witness how these marvels looked centuries ago.
            </p>
            
            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar places={heritagePlaces} onPlaceSelect={handlePlaceSelect} />
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-orange-200">
              <div className="flex items-center gap-2">
                <Camera className="w-6 h-6" />
                <span>3D Models</span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-6 h-6" />
                <span>AI Voice Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <span>Historical Views</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                <span>Location Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Places Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore India's Heritage</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on any monument to experience it in stunning 3D detail with immersive audio narration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heritagePlaces.map((place) => (
            <HeritageCard key={place.id} place={place} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3D Immersion</h3>
              <p className="text-gray-600">Explore detailed 3D models with realistic textures and lighting</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Voice Guide</h3>
              <p className="text-gray-600">Listen to intelligent audio narration about history and architecture</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-violet-100">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Travel</h3>
              <p className="text-gray-600">See how these monuments looked 100 years ago through AI generation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025 Heritage Explorer 3D. Preserving India's cultural legacy through technology.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;