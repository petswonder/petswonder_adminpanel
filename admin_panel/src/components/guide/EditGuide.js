import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import Heading from '../Heading';
import Nav from '../navbars/GuideNav';
import axios from 'axios';

const DeleteBanner = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [guides, setGuides] = useState([]);

  const [redirect, setRediect] = useState(false);

  const onChange = (e) => {
    setId(e.target.value);
  };
  useEffect(() => {
    getGuides();
  }, [guides]);

  //Get all banners
  const getGuides = async (e) => {
    try {
      const res = await axios.post(
        'https://petswonder.co.in/petswonder/api/petsGuide/getAllPetsGuide'
      );
      console.log(res.data);
      setGuides(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with a server in getting all Guides');
      } else {
        setMessage(err.response);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://petswonder.co.in/petswonder/api/petsGuide/delete?id=${id}`
      );
      console.log(res.data);
      setMessage('Guide was deleted');
      setId('');
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
      <Heading text='Delete a Guide' />
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
          <h5>All Guides</h5>
          {guides.map((guide) => (
            <ul>
              <li>ID: {guide.id}</li>
              <li>Title: {guide.title}</li>
              <li>Description: {guide.description}</li>
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
          className='btn btn-danger  btn-md my-1 mr-3'
        />
        <Link className='btn btn-light my-1 btn-md btn-dark' to='/'>
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default DeleteBanner;
