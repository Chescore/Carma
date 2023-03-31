import React, {useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AuthContext from '../../hoc/AuthContext/dealer_auth'

const Logout = () => {
    const {getDealerLoggedIn} = useContext(AuthContext)

    async function logOut(){
        await axios.get('http://localhost:5000/dealer/logout');
        await getDealerLoggedIn()
    }  

    return (
        <div onClick={logOut}>
            <Link to='/'>Logout</Link>
        </div>
    );
};

export default Logout;