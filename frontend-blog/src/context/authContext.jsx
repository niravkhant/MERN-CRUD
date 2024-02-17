"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import makeApiCall from "@/utility/makeApiCall";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("accessToken"));
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let isLoggedIN = !!token;

  const setAccessTokenCookies = (token) => {
    setToken(token);
    Cookies.set("accessToken", token);
  };
  const getAccessTokenCookies = () => {
    Cookies.get("accessToken");
  };
  const removeAccessTokenCookies = () => {
    Cookies.remove("accessToken");
  };

  const logoutUser = () => {
    Cookies.remove("accessToken");
    setToken(null);
    setCurrentUser(null);
  };

  // JWT AUTHENICATION : to get the currenty logged in user data

  const userAuthentication = async () => {
    const onSuccess = (res) => {
      setCurrentUser(res.data);
    };
    const onError = (error) => {
      console.error("Error 409: Frontend current user fetch error", error);
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      setIsLoading(true);
      await makeApiCall(
        "GET",
        "users/current-user",
        {},
        onSuccess,
        onError,
        headers
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIN,
        setAccessTokenCookies,
        getAccessTokenCookies,
        removeAccessTokenCookies,
        logoutUser,
        currentUser,
        setCurrentUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
