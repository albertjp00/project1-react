import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContexts';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../css/profile.css';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!profilePicture) {
      toast.error('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('userId', user._id); // Assuming the user ID is stored in the context

    try {
      const { data } = await axios.post('/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setUser(data); // Update user context with the new user data (with updated picture)
      toast.success('Profile picture updated successfully');
    } catch (error) {
      toast.error('Failed to upload profile picture');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      {/* Show existing profile picture if it exists */}
      {user?.picture ? (
        <div>
          <img 
            src={`http://localhost:5000/images/${user.picture}`} // Ensure this path matches your backend route
            alt="Profile" 
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
          />
          <p>Your current profile picture.</p>
        </div>
      ) : (
        <p>No profile picture uploaded yet. Please upload one below.</p>
      )}

      {/* Upload form for profile picture */}
      <form onSubmit={handleImageUpload}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload Profile Picture</button>
      </form>
    </div>
  );
}
