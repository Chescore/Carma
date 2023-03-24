import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
                    <Link to='/dealer_login'>Sell a car</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;