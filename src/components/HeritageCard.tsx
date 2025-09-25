import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Eye } from 'lucide-react';

interface HeritagePlace {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  yearBuilt: string;
  hasBooking: boolean;
}

interface HeritageCardProps {
  place: HeritagePlace;
}

function HeritageCard({ place }: HeritageCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{place.name}</h3>
          <div className="flex items-center space-x-1 text-sm opacity-90">
            <MapPin className="w-4 h-4" />
            <span>{place.location}</span>
          </div>
        </div>
        {place.hasBooking && (
          <div className="absolute top-4 right-4">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Bookable
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4" />
          <span>Built: {place.yearBuilt}</span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {place.description}
        </p>
        
        <Link
          to={`/model/${place.id}`}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>Explore in 3D</span>
        </Link>
      </div>
    </div>
  );
}

export default HeritageCard;