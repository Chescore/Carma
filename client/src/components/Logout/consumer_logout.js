import React, {useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AuthContext from '../../hoc/AuthContext/consumer_auth'

const Logout = () => {
    const {getConsumerLoggedIn} = useContext(AuthContext)

    async function logOut(){
        await axios.get('http://localhost:5000/consumer/logout');
        await getConsumerLoggedIn()
    }  

    return (
        <div>
            <div onClick={logOut}>
                <Link to='/'>Logout</Link>
            </div>
        </div>
    );
};

export default Logout;