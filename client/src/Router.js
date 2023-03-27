import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from './components/Home/home';
import DealerSignup from './components/Dealer/signup'
import DealerLogin from './components/Dealer/login';
import VehicleUpdate from './components/Dealer/vehicle';
import ConsumerSignup from './components/Consumer/signup';
import ConsumerLogin from './components/Consumer/login';
import Checkout from './components/Consumer/checkout';
import Inventory from './components/Inventory/vehicles';
import Vehicle from './components/Inventory/vehicle'
import Search from './components/Search/search';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/inventory" element={<Inventory/>}/>
                <Route path="/inventory/:id" element={<Vehicle/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/vehicle_update" element={<VehicleUpdate/>}/> 
                <Route path="/dealer_login" element={<DealerLogin/>}/>
                <Route path="/dealer_signup" element={<DealerSignup/>}/>
                <Route path="/checkout/:id" element={<Checkout/>}/> :
                <Route path="/consumer_login" element={<ConsumerLogin/>}/>
                <Route path="/consumer_signup" element={<ConsumerSignup/>}/> 
            </Routes>
        </div>
    );
};

export default Router;