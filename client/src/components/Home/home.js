import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../hoc/AuthContext/dealer_auth';

const Home = () => {
    const {dealerLoggedIn, getDealerLoggedIn} = useContext(AuthContext)

    return (
        <div>
            <div>
                Carma
            </div>
            <div>
                A Vehicle Purchase and Sales Web Application.                
            </div>
            <div>
                <div>
                    <Link to='/consumer_login'>Buy a car</Link>
                </div>
                <div>
                    {dealerLoggedIn===false ? 
                        <Link to='/dealer_login'>Sign in or Create a Dealer Account</Link> :
                        <Link to='/vehicle_update'>Sell a car</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;