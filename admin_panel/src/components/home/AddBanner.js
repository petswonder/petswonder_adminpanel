import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import Heading from '../Heading';
import Nav from '../navbars/HomeNav';
import axios from 'axios';

const AddBanner = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const [redirect, setRediect] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChange = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(
        `https://petswonder.co.in/petswonder/api/uploadBanner?content=${category}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data);
      setMessage('File Uploaded');
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
      <Heading text='Add new Banners' />
      <br />
      {message ? (
        <div
          className='alert alert-warning alert-dismissible fade show'
          role='alert'
        >
          {message}
        </div>
      ) : null}
      <form className='form' onSubmit={onSubmit}>
        <div className='row'>
          <div className='form-group row col-md-6'>
            <label htmlFor='' className='col-sm-12 control-label'>
              Select files
            </label>
            <div className='col-sm-9 custom-file'>
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
              Category
            </label>
            <div className='col-sm-9 controls'>
              <select
                className='ml-1 col-md-12'
                name='category'
                value={category}
                onChange={onChange}
                required
              >
                <option value='0'>* Select category</option>
                <option value='home'>home</option>
                <option value='shopping'>shopping</option>
              </select>
            </div>
          </div>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-warning btn-md my-1 mr-3'
        />
      </form>
    </div>
  );
};

export default AddBanner;
