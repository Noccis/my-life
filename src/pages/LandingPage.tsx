import Authenticator from "../components/Authenticator";
import TodoContainer from "../components/TodoContainer";
import WeekOverview from "../components/WeekOverview";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div
      id="landing-page"
      className="main-padding flex-row flex-align-center flex-justify-center content-containers"
    >
      {user ? (
        <div>
          <TodoContainer />
         {/*  <WeekOverview /> */}
        </div>
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
