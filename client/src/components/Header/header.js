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
                <div key={i} className='px-4'>
                    <Link to={item.link}>{item.text}</Link>
                </div>
            )
        })
    }

    return (
        <div className='shadow-sm py-2 d-flex flex-row'>
            <div className='d-flex flex-row'>
                {showItems()}
            </div>
            <div className=''>
                <ConsumerHeader/>
                <DealerHeader/>
            </div>
        </div>
    );
};

export default Header;