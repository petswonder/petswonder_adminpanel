import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import LogoName from '../../images/LogoName.png';
import { signout } from '../auth';
const Nav = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-nav'>
      <a className='navbar-brand'>
        <img src={LogoName} style={{ height: '40px', width: '120px' }}></img>
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav ml-auto '>
          <Link className='nav-link text-nav pl-5 pr-4' to='/'>
            HOME
          </Link>
          <Link className='nav-link text-nav pr-4 ' to='/shopping'>
            SHOPPING
          </Link>
          <Link className='nav-link text-nav pr-4 ' to='/services'>
            SERVICES
          </Link>
          <Link className='nav-link text-nav pr-4 ' to='/guide'>
            GUIDE
          </Link>
          <Link className='nav-link text-nav pr-4 ' to='/' onClick={() => signout()}>
            LOGOUT
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
