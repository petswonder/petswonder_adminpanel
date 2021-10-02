import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import Heading from '../Heading';
import Nav from '../navbars/ServiceNav';
import axios from 'axios';

const DeleteService = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState([]);

  const [redirect, setRediect] = useState(false);

  const onChange = (e) => {
    setId(e.target.value);
  };
  useEffect(() => {
    getservices();
  }, [services]);

  //Get all services
  const getservices = async (e) => {
    try {
      const res = await axios.post(
        'https://petswonder.co.in/petswonder/api/postService/getAllService?serviceType=all'
      );
      console.log(res.data);
      setServices(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with a server in getting all Services');
      } else {
        setMessage(err.response);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://petswonder.co.in/petswonder/api/postService/deleteService?id=${id}`
      );
      console.log(res.data);
      setMessage('Service deleted');
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
      <Heading text='Delete Service' />
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
          <h5>All Services</h5>
          {services.map((banner) => (
            <ul>
              <li>ServiceID: {banner.serviceId}</li>
              <li>title: {banner.title}</li>
              <li>description: {banner.description}</li>
              <li>serviceType: {banner.serviceType}</li>
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

export default DeleteService;
