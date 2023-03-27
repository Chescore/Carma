import React, {useContext} from 'react';
import { Link } from 'react-router-dom' 

import ConsumerHeader from './consumer_header'
import DealerHeader from './dealer_header'

const Header = () => {

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
            <ConsumerHeader/>
            <DealerHeader/>
        </div>
    );
};

export default Header;