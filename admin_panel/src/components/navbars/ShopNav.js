import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-nav'>
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
        <div className='navbar-nav mx-auto '>
          <Link
            className='nav-link text-nav pl-5 pr-4'
            to='/shopping/userorder'
          >
            User Orders
          </Link>
          <Link className='nav-link text-nav pr-4 ' to='/shopping/addproduct'>
            Add Product
          </Link>
          <Link className='nav-link text-nav pr-4 ' to='/shopping/editproduct'>
            Edit Product
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
