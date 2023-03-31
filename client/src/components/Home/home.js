import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../hoc/AuthContext/dealer_auth';
import { AuthContext as ConsumerAuthContext } from '../../hoc/AuthContext/consumer_auth';

import { Button } from 'react-bootstrap'

const Home = () => {
    const {dealerLoggedIn} = useContext(AuthContext)
    const {consumerLoggedIn} = useContext(ConsumerAuthContext)

    return (
        <div className='text-center'>
            <div className='font-nunito bg-image'>
                <h1 className='py-4 text-secondary font-weight-bold'>
                    <strong className='border-underline'> CARMA </strong>
                </h1>
                <h2 className='py-4 text-white'>
                    <i>
                        <div className='pt-2 pb-2'>A Vehicle Purchase and </div>
                        <div>Sales Web Application. </div>
                    </i>                
                </h2>
                <h3 className='py-4 text-white'>
                    <i>
                        <div className='py-2'>Manage your inventory and </div>
                        <div className='pb-4'>stock up on your car collection.</div>
                    </i>
                </h3>
            </div>
            <div className='mt-4 mb-2'>
                <div className='mb-2 py-2'>
                    {dealerLoggedIn===false & consumerLoggedIn===false ?
                        <div>
                            <div className='py-2'>
                                <Link to='/consumer_login'>
                                    <Button variant='secondary'>You buying, Sign in here</Button>
                                </Link> 
                            </div>
                            <div className='py-2'>
                                <Link to='/dealer_login'>
                                    <Button variant='secondary'>You selling, Sign in here</Button>
                                </Link>
                            </div>
                        </div> 
                        :
                        consumerLoggedIn===true ?
                            <div>
                                <Link to='/inventory'>
                                    <Button variant='secondary'>Check our products</Button>
                                </Link>
                            </div>
                            :
                            <div>
                                <Link to='/vehicle_update'>
                                <Button variant='secondary'>Upload your product</Button>
                                </Link>
                            </div>
                    }
                </div> 
                {/* <div className='mt-2 pb-4'>
                    {consumerLoggedIn===false ? 
                        <Link to='/dealer_login'>
                            <Button variant='secondary'>Sign in or Create a Dealer Account</Button>
                        </Link> :
                        <></>
                    }
                </div> */}
            </div>
        </div>
    );
};

export default Home;