import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import Heading from '../Heading';
import Nav from '../navbars/GuideNav';

const AddService = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const { title, description } = formData;

  const [redirect, setRediect] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append('file', file);
    try {
      const res = await axios.post(
        `https://petswonder.co.in/petswonder/api/petsGuide/savePetsGuideInfo?title=${title}&description=${description}`,
        Data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data);
      setMessage('Guide added');
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
      <Heading text='Add a new Guide' />
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
