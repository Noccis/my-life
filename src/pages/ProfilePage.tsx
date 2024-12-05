import React from "react";
import Auth from "../components/Auth";

const ProfilePage = () => {
  return (
    <div
      id="profile-page"
      className="
    main-padding 
    flex-column 
    flex-align-center 
    flex-justify-center 
    content-containers"
    >
      <h2 className="main-padding">Profile</h2>
      <Auth />
    </div>
  );
};

export default ProfilePage;
