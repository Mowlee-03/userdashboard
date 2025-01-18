import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import { MapPin, Home, Ruler, Bath, Bed } from 'lucide-react';

function PropertyDetails() {
  const { id } = useParams();

  // Mock property data (in a real app, this would come from an API)
  const property = {
    id: 1,
    title: "Modern Apartment",
    description: "Beautiful modern apartment in the heart of the city...",
    price: 250000,
    location: "123 Main St, New York, NY",
    type: "Residential",
    beds: 2,
    baths: 2,
    area: "1,200 sqft",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c01?w=500",
    ],
    features: [
      "Modern Kitchen",
      "Hardwood Floors",
      "Central Air",
      "In-unit Laundry"
    ],
    agent: {
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john@example.com"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="text-2xl font-bold text-blue-600">
          ${property.price.toLocaleString()}
        </p>
      </div>

      {/* Image Gallery */}
      <div className="grid md:grid-cols-2 gap-4">
        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Property view ${index + 1}`}
            className="w-full h-64 object-cover rounded"
          />
        ))}
      </div>

      {/* Property Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-500" />
              <span>{property.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-gray-500" />
              <span>{property.beds} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-gray-500" />
              <span>{property.baths} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-gray-500" />
              <span>{property.area}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            {property.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Description */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p>{property.description}</p>
      </Card>

      {/* Agent Contact */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {property.agent.name}</p>
          <p><strong>Phone:</strong> {property.agent.phone}</p>
          <p><strong>Email:</strong> {property.agent.email}</p>
        </div>
      </Card>
    </div>
  );
}

export default PropertyDetails;