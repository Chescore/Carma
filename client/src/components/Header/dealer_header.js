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
                <div>
                    <div>Dealer Account</div>
                    <div>{dealer}</div>
                    <Logout/>
                </div>
            : <></>}
        </div>
    )
}

export default DealerHeader
