import React from 'react';
import Search from '../Search';
import './Header.scss';

function Header() {
    return (
        <div className='header'>
            <div className='header__logo'>
                <span>VISAGE</span>
                <Search />    
            </div>
            
        </div>
    )
}

export default Header;