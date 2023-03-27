import React, {useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../hoc/AuthContext/consumer_auth'

const Logout = () => {
    const {getConsumerLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate();

    async function logOut(){
        await axios.get('http://localhost:5000/consumer/logout');
        await getConsumerLoggedIn()
        navigate('/');
    }  

    return (
        <div>
            <button onClick={logOut}>
                Logout
            </button>
        </div>
    );
};

export default Logout;