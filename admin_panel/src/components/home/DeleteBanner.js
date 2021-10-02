import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import Heading from '../Heading';
import Nav from '../navbars/HomeNav';
import axios from 'axios';

const DeleteBanner = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [banners, setBanners] = useState([]);

  const [redirect, setRediect] = useState(false);

  const onChange = (e) => {
    setId(e.target.value);
  };
  useEffect(() => {
    getBanners();
  }, []);

  //Get all banners
  const getBanners = async (e) => {
    try {
      const res = await axios.post(
        'https://petswonder.co.in/petswonder/api/listBanners'
      );
      console.log(res.data);
      setBanners(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with a server in getting all banners');
      } else {
        setMessage(err.response);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://petswonder.co.in/petswonder/api/deleteBanner?id=${id}`
      );
      console.log(res.data);
      setMessage('Banner deleted');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with a server');
      } else {
        setMessage(err.response);
      }
    }
  };

  const redirectTo = () => {
    return redirect && <Redirect to='/' />;
  };

  return (
    <div className='container profile-about bg-light mb-5'>
      <Nav />
      {redirectTo()}
      <br />
      <Heading text='Delete Banner' />
      <br />
      {message ? (
        <div
          className='alert alert-danger alert-dismissible fade show'
          role='alert'
        >
          {message}
        </div>
      ) : null}
      <div className='row'>
        <div className='col-12'>
          <h5>
            All banners <span>(download the image and check the banner)</span>
          </h5>
          {banners.map((banner) => (
            <ul>
              <li>BannerId: {banner.id}</li>
              <li>
                Banner link: <a href={banner.bannerName}>{banner.bannerName}</a>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <form className='form' onSubmit={onSubmit}>
        <div className='row'>
          <div className='form-group row col-12'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Enter Id
            </label>
            <div className='col-sm-9 custom-file'>
              <input
                className='ml-1 col-md-12 '
                type='text'
                multiple
                onChange={onChange}
                required
              />
            </div>
          </div>
        </div>

        <input
          type='submit'
          value='Delete'
          className='btn btn-danger btn-md my-1 mr-3'
        />
        <Link className='btn btn-light my-1 btn-md btn-dark' to='/'>
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default DeleteBanner;
