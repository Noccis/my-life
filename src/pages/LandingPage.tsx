import React from "react";
import Authenticator from "../components/Authenticator";
import WeekOverview from "../components/WeekOverview";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div
      id="landing-page"
      className="main-padding flex-row flex-align-center content-containers"
    >
      {user ? (
        <WeekOverview />
      ) : (
        <div>
          <h3 className="margin-bottom-large">
            Välkommen! Här kan du logga in.
          </h3>
          <Authenticator />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
