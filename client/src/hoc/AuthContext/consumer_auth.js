import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const ConsumerAuthContextProvider = ({children}) => {
    const [consumerLoggedIn,setConsumerLoggedIn] = useState(undefined);

    async function getConsumerLoggedIn(){
        const loggedInResponse = await axios.get("http://localhost:5000/consumer/loggedin");
        setConsumerLoggedIn(loggedInResponse.data);
    }

    useEffect(()=>{
        getConsumerLoggedIn()
    },[]);

    return(
        <AuthContext.Provider value={{consumerLoggedIn,getConsumerLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthContext;
export { ConsumerAuthContextProvider };