import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import { Search, Filter } from 'lucide-react';

function Properties() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    location: 'all'
  });

  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      type: "residential",
      price: 250000,
      location: "New York",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      beds: 2,
      baths: 2,
      area: "1,200 sqft"
    },
    // Add more properties...
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Properties</h1>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <select
              className="w-full p-2 border rounded"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <select
              className="w-full p-2 border rounded"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="0-250000">$0 - $250,000</option>
              <option value="250000-500000">$250,000 - $500,000</option>
              <option value="500000+">$500,000+</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              className="w-full p-2 border rounded"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Property List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card 
            key={property.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/properties/${property.id}`)}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{property.title}</h3>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold mt-2">${property.price.toLocaleString()}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
                <span>{property.area}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Properties;