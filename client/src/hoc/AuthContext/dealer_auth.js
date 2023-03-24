import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const DealerAuthContextProvider = ({children}) => {
    const [dealerLoggedIn,setDealerLoggedIn] = useState(undefined);

    async function getDealerLoggedIn(){
        const loggedInResponse = await axios.get("http://localhost:5000/dealer/loggedin");
        setDealerLoggedIn(loggedInResponse.data);
    }

    useEffect(()=>{
        getDealerLoggedIn()
    },[]);

    return(
        <AuthContext.Provider value={{dealerLoggedIn,getDealerLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthContext;
export { DealerAuthContextProvider };