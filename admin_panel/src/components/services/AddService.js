import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import Heading from '../Heading';
import Nav from '../navbars/ServiceNav';

const AddService = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [formData, setFormData] = useState({
    title: '',
    sellerNumber: '9959183841',
    description: '',
    price: '',
    discount: '',
    inventory: '',
    serviceType: '',
    image: null,
  });

  const {
    title,
    sellerNumber,
    description,
    price,
    discount,
    inventory,
    serviceType,
  } = formData;

  const [redirect, setRediect] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append('file', file);
    try {
      const res = await axios.post(
        `https://petswonder.co.in/petswonder/api/postService/saveService?title=${title}&sellerNumber=${sellerNumber}&description=${description}&price=${price}&discount=${discount}&inventory=${inventory}&serviceType=${serviceType}`,
        Data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data);
      setMessage('Service added');
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
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <div className='container profile-about bg-light mb-5'>
      <Nav />
      {redirectTo()}
      <br />
      <Heading text='Add a new Service' />
      <br />
      {message ? (
        <div
          className='alert alert-warning alert-dismissible fade show'
          role='alert'
        >
          {message}
        </div>
      ) : null}
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='row'>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Title
            </label>
            <div className='col-sm-9 controls'>
              <input
                className='ml-1 col-md-12'
                type='text'
                placeholder='Title'
                name='title'
                value={title}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Seller Number
            </label>
            <div className='col-sm-9 controls'>
              <p className='text-muted ml-2'>9959183841</p>
            </div>
          </div>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Select files
            </label>
            <div className='col-sm-9 ml-2 custom-file'>
              <input
                className='ml-1 col-md-12 custom-file-input'
                id='customFile'
                type='file'
                multiple
                name='files'
                onChange={handleFile}
                required
              />
              <label className='custom-file-label' htmlFor='customFile'>
                {filename}
              </label>
            </div>
          </div>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Description
            </label>
            <div className='col-sm-9 controls'>
              <input
                className='ml-1 col-md-12'
                type='text'
                placeholder='Description'
                name='description'
                value={description}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Price
            </label>
            <div className='col-sm-9 controls'>
              <input
                className='ml-1 col-md-12'
                type='number'
                placeholder='Price'
                name='price'
                value={price}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Discount
            </label>
            <div className='col-sm-9 controls'>
              <input
                className='ml-1 col-md-12'
                type='number'
                placeholder='Discount'
                name='discount'
                value={discount}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Inventory
            </label>
            <div className='col-sm-9 controls'>
              <input
                className='ml-1 col-md-12'
                type='number'
                placeholder='Inventory'
                name='inventory'
                value={inventory}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Service-type
            </label>
            <div className='col-sm-9 controls'>
              <select
                className='ml-1 col-md-12'
                name='serviceType'
                value={serviceType}
                onChange={(e) => onChange(e)}
              >
                <option value='0'>* Select Service-type</option>
                <option value='doctor'>Doctor</option>
                <option value='petGromming'>Pet gromming</option>
              </select>
            </div>
          </div>
        </div>
        <input type='submit' className='btn btn-warning btn-md my-1 mr-3' />
        <Link className='btn btn-light my-1 btn-md btn-dark' to='/'>
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddService;
