import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Camera, Mic, Sparkles, Globe, Search, ExternalLink, LucideIcon } from 'lucide-react';

type HeritagePlace = {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  yearBuilt: string;
  hasBooking: boolean;
  bookingUrl?: string;
};

type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
  color: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
};

const heritagePlaces: HeritagePlace[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg',
    description: 'A UNESCO World Heritage Site, the Taj Mahal is an ivory-white marble mauseleum built by Mughal emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    yearBuilt: '1653',
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
    hasBooking: false
  },
  {
    id: 'hampi',
    name: 'Hampi',
    location: 'Karnataka',
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg',
    description: 'The ruins of the Vijayanagara Empire, Hampi is a UNESCO World Heritage Site known for its stunning architecture and boulder landscapes.',
    yearBuilt: '1336',
    hasBooking: false
  },
  {
    id: 'red-fort',
    name: 'Red Fort',
    location: 'Delhi',
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
    description: 'A historic fortified palace built by Mughal Emperor Shah Jahan, serving as the main residence of the Mughal Emperors for nearly 200 years.',
    yearBuilt: '1648',
    hasBooking: false
  },
  {
    id: 'ajanta-caves',
    name: 'Ajanta Caves',
    location: 'Maharashtra',
    image: 'https://images.pexels.com/photos/12136010/pexels-photo-12136010.jpeg',
    description: 'Rock-cut Buddhist cave monuments dating from the 2nd century BCE, famous for their ancient paintings and sculptures.',
    yearBuilt: '2nd Century BCE',
    hasBooking: false
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho Temples',
    location: 'Madhya Pradesh',
    image: 'https://images.pexels.com/photos/17120104/pexels-photo-17120104.jpeg',
    description: 'A group of Hindu and Jain temples famous for their nagara-style architectural symbolism and erotic sculptures.',
    yearBuilt: '950-1150 CE',
    hasBooking: false
  }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<HeritagePlace | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features = [
    {
      id: '3d-immersion',
      icon: Camera,
      title: '3D Immersion',
      color: 'from-blue-500 to-blue-600',
      shortDesc: 'Explore photorealistic 3D models with intricate details, accurate textures, and dynamic lighting',
      fullDesc: 'Step into a fully immersive 3D environment where you can explore every angle of India\'s iconic monuments. Our high-fidelity models capture intricate architectural details, from delicate carvings to weathered textures, bringing centuries-old structures to life with stunning realism.',
      features: [
        'Navigate freely with intuitive 360° controls',
        'Zoom in to examine intricate architectural details',
        'Real-time lighting and shadow effects',
        'Photorealistic textures based on actual photographs',
        'Interactive hotspots revealing hidden details'
      ]
    },
    {
      id: 'ai-voice',
      icon: Mic,
      title: 'AI Voice Guide',
      color: 'from-emerald-500 to-emerald-600',
      shortDesc: 'Listen to intelligent narration about history, architecture, and cultural significance',
      fullDesc: 'Experience heritage like never before with our AI-powered voice assistant that adapts to your interests. Ask questions and receive instant, contextual information about architectural styles, historical events, cultural practices, and fascinating stories behind each monument.',
      features: [
        'Natural language conversations about monuments',
        'Multi-language support for global accessibility',
        'Context-aware responses based on your viewing angle',
        'Historical anecdotes and lesser-known facts',
        'Personalized tours based on your interests'
      ]
    },
    {
      id: 'time-travel',
      icon: Clock,
      title: 'Time Travel',
      color: 'from-amber-500 to-amber-600',
      shortDesc: 'Witness how monuments appeared centuries ago through AI-powered historical reconstruction',
      fullDesc: 'Journey through time and witness monuments in their original glory. Our AI-powered reconstruction technology analyzes historical records, paintings, and archaeological data to recreate authentic period-accurate visualizations, showing you how these structures looked when first built.',
      features: [
        'Compare modern vs. historical appearances side-by-side',
        'View restoration and decay over centuries',
        'See original colors and decorative elements',
        'Witness historical events in their actual settings',
        'Experience seasonal and weather variations from the past'
      ]
    }
  ];

  const filteredPlaces = heritagePlaces.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/90">Powered by AI & 3D Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
              Heritage Explorer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mt-2">
                In 3D
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Journey through India's magnificent heritage with immersive 3D technology. 
              Experience ancient monuments like never before.
            </p>
            
            {/* Search Bar */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search monuments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-slate-300">
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">3D Models</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Time Travel</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Virtual Tours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Places Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Explore India's Heritage
          </h2>
          <p className="text-lg text-slate-600">
            Click on any monument to experience it in stunning 3D detail with immersive audio narration and historical insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {place.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{place.location}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {place.description.substring(0, 120)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Built: {place.yearBuilt}</span>
                  {place.hasBooking && (
                    <a
                      href={place.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      Book <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Experience the Future of Heritage
            </h2>
            <p className="text-lg text-slate-600">
              Cutting-edge technology meets ancient history
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature)}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.shortDesc}</p>
                  <div className="mt-4 text-sm text-blue-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-r ${selectedFeature.color} p-8 text-white`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <selectedFeature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold">{selectedFeature.title}</h3>
              </div>
              <p className="text-white/90 text-lg">{selectedFeature.fullDesc}</p>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-semibold text-slate-900 mb-6">Key Features</h4>
              <div className="space-y-4">
                {selectedFeature.features.map((feat, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="mt-8 w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Place Modal */}
      {selectedPlace && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedPlace.name}</h3>
              <div className="flex items-center gap-2 text-slate-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{selectedPlace.location}</span>
              </div>
              <p className="text-slate-600 mb-4">{selectedPlace.description}</p>
              <p className="text-sm text-slate-500 mb-6">Built: {selectedPlace.yearBuilt}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    navigate(`/model/${selectedPlace.id}`);
                    setSelectedPlace(null);
                  }}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  View in 3D
                </button>
                {selectedPlace.hasBooking && (
                  <a
                    href={selectedPlace.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Book Visit
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Heritage Explorer 3D</h3>
              <p className="text-slate-400 text-sm">Preserving India's cultural legacy through technology</p>
            </div>
            <div className="text-slate-400 text-sm">
              &copy; 2025 All rights reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}