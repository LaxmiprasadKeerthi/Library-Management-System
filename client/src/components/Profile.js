import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")); // Parse full user object
  const email = user?.email; // Safely access email

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!email) {
          setError("User email not found. Please log in.");
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/user/profile/${email}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, [email]);

  if (error) {
    return <div className="profile-container"><p>{error}</p></div>;
  }

  if (!profile) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="profile-photo"
        />
        <h2>{profile.username}</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Total Pre-Bookings:</strong> {profile.preBookCount}</p>
      </div>
    </div>
  );
};

export default Profile;
