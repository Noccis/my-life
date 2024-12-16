import Authenticator from "../components/Authenticator";

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
      <Authenticator />
    </div>
  );
};

export default ProfilePage;
