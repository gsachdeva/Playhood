import { jwtDecode } from "jwt-decode";

import React, { useEffect, useState, createContext } from 'react';
const AuthContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthProvider = ({children}) =>
{
    const [token,setToken] = useState("")
    const [userId,setUserId]= useState("")
    const [upcomingGames,setUpComingGames]= useState([]);

    const isLoggedIn = async() => {
        try{
            const userToken = await AsyncStorage.getItem("token")
            setToken(userToken);
        }
        catch(error){
            console.log('error',error);
        }
    }
    useEffect(() => {
        const fetchUser = async() => {
            const token  = await AsyncStorage.getItem("token");
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.userId;
            setUserId(userId)
        }
        fetchUser();
    },[]
    )
    useEffect(() => {
        isLoggedIn()
    },[])
    return(
        <AuthContext.Provider value={{token,setToken,userId,setUserId,}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext,AuthProvider}