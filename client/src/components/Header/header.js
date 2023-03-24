import React, { useContext } from 'react';
import { Link } from 'react-router-dom' 

import Logout from '../Logout/logout';
import AuthContext from '../../hoc/AuthContext/consumer_auth';

const Header = () => {
    const {consumerLoggedIn} = useContext(AuthContext)

    const items = [
        {
            "text": "Home",
            "link": "/"
        },
        {
            "text": "Search",
            "link": "/search"
        },
        {
            "text": "Inventory",
            "link": "/inventory"
        } 
    ]

    const showItems = () => {
        return items.map((item, i)=>{
            return(
                <div key={i}>
                    <Link to={item.link}>{item.text}</Link>
                </div>
            )
        })
    }

    return (
        <div>
            {showItems()}
            {consumerLoggedIn===true ?  
                <div><Logout/></div> :
                <></>    
            }
        </div>
    );
};

export default Header;