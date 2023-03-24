import React from 'react';

const Footer = () => {
    const CURRENT_YEAR = new Date().getFullYear();

    return (
        <footer>
            Copyright &copy; {CURRENT_YEAR} Carma 
        </footer>
    );
};

export default Footer;