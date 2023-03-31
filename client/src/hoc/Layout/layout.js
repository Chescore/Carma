import React from 'react';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = ({children}) => {
    return (
        <div className='font-spectral'>
            <Header/>
             <div className='screen'>{children}</div>
            <Footer/>
        </div>
    );
};

export default Layout;