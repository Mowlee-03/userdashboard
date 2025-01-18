import { useState, useContext } from 'react';
import { Card, Button, TextField, Avatar } from '@mui/material';
import { Edit, LocationOn, Email, Phone, Work, Language } from '@mui/icons-material';
import { AuthContext } from '../auth/authProvider';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(user?.photo || '/placeholder.svg?height=200&width=200');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200sm:p-6 ">
      <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
        {/* Header Banner */}
        <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-12 md:translate-x-0">
            <div className="relative group">
              <Avatar
                src={photo}
                alt={user?.fullName}
                className="w-32 h-32 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                sx={{ width: 128, height: 128 }}
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-full">
                <Edit className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="pt-20 md:pt-8 px-6 pb-8">
          <div className="md:ml-44 space-y-6">
            {/* Basic Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{user?.fullName || 'John Doe'}</h1>
              <p className="text-gray-600 mt-1">Senior Developer</p>
            </div>

            {/* Contact & Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Email className="text-gray-600" />
                  <span className="text-gray-700">{user?.email || 'john@example.com'}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Phone className="text-gray-600" />
                  <span className="text-gray-700">+1 234 567 890</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <LocationOn className="text-gray-600" />
                  <span className="text-gray-700">New York, USA</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Work className="text-gray-600" />
                  <span className="text-gray-700">Tech Corp Inc.</span>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Language className="mr-2" />
                Bio
              </h2>
              <p className="text-gray-600">
                Passionate developer with expertise in React, Node.js, and cloud technologies.
                Love to create beautiful and functional web applications.
              </p>
            </div>

            {/* Update Button */}
            <div className="flex justify-end mt-6">
              <Button
                variant="contained"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-2 rounded-lg
                          hover:from-purple-600 hover:to-pink-600 transition-all duration-300
                          transform hover:scale-105 hover:shadow-lg"
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;

