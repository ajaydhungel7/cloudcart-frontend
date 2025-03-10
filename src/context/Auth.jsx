import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios/axios"; 
import { notification } from "antd";
import { removeLocalUserProfiles } from "../utils";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  // Manage user state and JWT token
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken") || null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Registration using JWT-based REST API
  const registerUser = async (email, password, firstName, lastName) => {
    return axios.post("/api/auth/register", { email, password, firstName, lastName });
  };
  
  // Login using JWT-based REST API
  const loginUser = async (email, password, setIsLoggingIn=null) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user: userData } = response.data;
      
      // Save the JWT token in localStorage and update state
      localStorage.setItem("jwtToken", token);
      setJwtToken(token);
      setUser(userData);

      notification.success({
        message: "Login Successful",
        description: `Welcome, ${userData.firstName }!`
      });
    } catch (err) {
      notification.error({
        message: "Login Failed",
        description: err.response?.data?.message || "An error occurred during login."
      });
    }
    if(setIsLoggingIn) setIsLoggingIn(false)
  };

  // Logout clears token and user data
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setJwtToken(null);
    setUser(null);
    // removeLocalUserProfiles();
    notification.info({
      message: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  // Generic function to post data (if needed)
  const putData = async (coll, data) => {
    try {
      const response = await axios.post(`/data/${coll}`, data);
      notification.success({
        message: "Data Saved",
        description: "Data saved successfully."
      });
      return response.data;
    } catch (err) {
      notification.error({
        message: "Data Save Failed",
        description: err.response?.data?.message || "An error occurred while saving data."
      });
    }
  };

  // When a JWT token is present, attach it to axios and fetch user info
  useEffect(() => {
    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      axios.get("/api/auth/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          notification.error({
            message: "Fetching User Error",
            description: err.response?.data?.message || err.message,
          });
          setUser(null);
          localStorage.removeItem("jwtToken");
          // Only set jwtToken to null if it's not already null
          if (jwtToken !== null) {  // <-- This is the key change
            setJwtToken(null);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setIsLoading(false);
    }
  }, [jwtToken]);

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logout,
        putData,
        user,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
