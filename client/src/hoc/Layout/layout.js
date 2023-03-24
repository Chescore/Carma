import React from 'react';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = ({children}) => {
    return (
        <div>
            <Header/>
             <div className='min-h-screen'>{children}</div>
            <Footer/>
        </div>
    );
};

export default Layout;