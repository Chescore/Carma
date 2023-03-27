import React, { createContext, useState } from 'react';

const DealerContext = createContext();

const DealerContextProvider = ({children}) => {
    const [dealer,setDealer] = useState('') 

    return(
        <DealerContext.Provider value={{dealer, setDealer}}>
            {children}
        </DealerContext.Provider>
    )
}

export default DealerContext;
export { DealerContextProvider };