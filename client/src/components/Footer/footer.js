import React from 'react';

const Footer = () => {
    const CURRENT_YEAR = new Date().getFullYear();

    return (
        <footer className='text-center text-white bg-primary'>
            <small>Copyright &copy; {CURRENT_YEAR} Carma </small>
        </footer>
    );
};

export default Footer;