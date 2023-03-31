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
                <div className='d-flex flex-row-reverse'>
                    <div className='px-4 text-primary'>{consumer}</div>
                    <div className='px-2'><Logout/></div>
                </div>
            : <></>}
        </div>
    )
}

export default ConsumerHeader
