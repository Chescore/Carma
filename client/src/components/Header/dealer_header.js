import React, { useContext, useEffect, useState } from 'react';
import Logout from '../Logout/dealer_logout';

import AuthContext from '../../hoc/AuthContext/dealer_auth';
import DealerContext from '../../hoc/AuthContext/dealer_username';

const DealerHeader = () => {
    const {dealerLoggedIn} = useContext(AuthContext)
    const {dealer} = useContext(DealerContext)

    return(
        <div>
            {dealerLoggedIn===true ? 
                <div className='d-flex flex-row-reverse'>
                    <div className='px-4 text-primary'>{dealer}</div>
                    <div className='px-2'><Logout/></div>
                </div>
            : <></>}
        </div>
    )
}

export default DealerHeader
