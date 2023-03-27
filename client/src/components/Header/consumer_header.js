import React, { useContext, useEffect, useState } from 'react';
import Logout from '../Logout/consumer_logout';

import AuthContext from '../../hoc/AuthContext/consumer_auth';
import ConsumerContext from '../../hoc/AuthContext/consumer_username';

const ConsumerHeader = () => {
    const {consumerLoggedIn} = useContext(AuthContext)
    const {consumer} = useContext(ConsumerContext)
    
    return(
        <div>
            {consumerLoggedIn===true ? 
                <div>
                    <div>Buyer Account</div>
                    <div>{consumer}</div>
                    <Logout/>
                </div>
            : <></>}
        </div>
    )
}

export default ConsumerHeader
