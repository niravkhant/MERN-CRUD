"use client"
import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState(Cookies.get("accessToken"));

    let isLoggedIN = !!token;

    console.log(isLoggedIN)

    const setAccessTokenCookies = (token)=>{
        Cookies.set("accessToken", token)
    }
    const getAccessTokenCookies = ()=>{
        Cookies.get("accessToken");
    }
    const removeAccessTokenCookies = ()=>{
        Cookies.remove("accessToken");
    }

    return(
        <AuthContext.Provider value={{setAccessTokenCookies, getAccessTokenCookies, removeAccessTokenCookies}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = ()=>{
    return useContext(AuthContext);
}

