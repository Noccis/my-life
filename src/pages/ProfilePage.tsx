import Authenticator from "../components/Authenticator";

const ProfilePage = () => {
  return (
    <div
      id="profile-page"
      className="main-padding content-containers"
    >
      <div
        className="flex-column flex-align-center flex-justify-center white-card "
      >
        <Authenticator />
      </div>
    </div>
  );
};

export default ProfilePage;
