import React, { useState } from "react";
import { auth } from "../configuration";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const Authenticator: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p className="margin-t-b">Välkommen, {user.email}</p>
          <button className="input-form button-color" onClick={handleLogout}>
            Logga ut
          </button>
        </div>
      ) : (
        <div>
          <input
            className="input-form margin-right"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-form margin-right"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="input-form button-color" onClick={handleLogin}>Logga in</button>
        </div>
      )}
    </div>
  );
};

export default Authenticator;
