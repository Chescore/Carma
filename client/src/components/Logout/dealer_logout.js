import React, {useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../hoc/AuthContext/dealer_auth'

const Logout = () => {
    const {getDealerLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate();

    async function logOut(){
        await axios.get('http://localhost:5000/dealer/logout');
        await getDealerLoggedIn()
        navigate('/');
    }  

    return (
        <div>
            <button onClick={logOut}>
                Logout
            </button>:
        </div>
    );
};

export default Logout;