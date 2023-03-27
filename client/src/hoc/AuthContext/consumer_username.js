import React, { createContext, useState } from 'react';

const ConsumerContext = createContext();

const ConsumerContextProvider = ({children}) => {
    const [consumer,setConsumer] = useState('') 

    return(
        <ConsumerContext.Provider value={{consumer, setConsumer}}>
            {children}
        </ConsumerContext.Provider>
    )
}

export default ConsumerContext;
export { ConsumerContextProvider };