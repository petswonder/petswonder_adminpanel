import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getProductById, editProductById, deleteProduct } from './api';
import './App.css';
import Heading from './Heading';
import Shopping from './Shopping';

const EditProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    sellerNumber: '',
    description: '',
    price: '',
    discount: '',
    inventory: '',
    species: '',
    category: '',
    productId: '',
    plusPoints: '',
    brand: '',
    productImages: '',
    image: null,
  });

  const [id, updateId] = useState();
  const [showDetails, updateShowDetails] = useState(false);
  const [noProducts, updateNoProducts] = useState(false);

  const {
    title,
    sellerNumber,
    description,
    price,
    discount,
    inventory,
    species,
    category,
    productId,
    plusPoints,
    brand,
    productImages,
  } = formData;

  const getDetails = (e) => {
    e.preventDefault();
    getProductById(id)
      .then((data) => {
        if (data == null) {
          updateShowDetails(false);
          updateNoProducts(true);
        } else {
          setFormData({
            ...formData,
            title: data.title,
            description: data.description,
            price: data.price,
            discount: data.discount,
            inventory: data.inventory,
            species: data.species,
            category: data.category,
            sellerNumber: data.sellerNumber,
            plusPoints: data.plusPoints,
            brand: data.brand,
            productImages: data.productImages,
            productId: data.productId,
          });
          updateShowDetails(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };

  const [redirect, setRediect] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onIdChange = (e) => {
    updateId(e.target.value);
    setUpdated(false);
    updateShowDetails(false);
    updateNoProducts(false);
    setDeleted(false);
  };

  const deleteDetails = (e) => {
    const fileUrl = productImages;

    e.preventDefault();
    deleteProduct({ id: id, fileUrl: productImages })
      .then((data) => {
        setDeleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProductById(formData)
      .then((data) => {
        setUpdated(true);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };

  const redirectTo = () => {
    return redirect && <Redirect to='/' />;
  };

  const noProduct = () => {
    return (
      <div className='col-sm-12 controls'>
        <h2 className='ml-1'>No Product found with this ID</h2>
      </div>
    );
  };

  const showUpdated = () => {
    return (
      <div className='alert alert-success' role='alert'>
        <strong>Succesfully Updated!!</strong>
      </div>
    );
  };

  const showDeleted = () => {
    return (
      <div className='alert alert-success' role='alert'>
        <strong>Succesfully Deleted!!</strong>
      </div>
    );
  };

  return (
    <div className='container profile-about bg-light mb-5'>
      <Shopping />
      {redirectTo()}
      <br />

      <Heading text='Edit Product' />

      <br />
      <div className='form-group row col-md-12'>
        <label htmlFor='' className='col-sm-12 control-label'>
          Enter Product ID:
        </label>
        <div className='col-sm-12 controls'>
          <input
            className='ml-1 col-md-12'
            type='text'
            placeholder='ID'
            name='id'
            value={id}
            onChange={(e) => onIdChange(e)}
            required
          />
          <button
            className='mt-2 ml-1 btn btn-warning'
            onClick={(e) => getDetails(e)}
          >
            Get Details
          </button>
        </div>
      </div>
      {updated && showUpdated()}
      {deleted && showDeleted()}
      <br />
      {showDetails && (
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
                <input
                  className='ml-1 col-md-12'
                  type='number'
                  placeholder='Seller Number'
                  name='sellerNumber'
                  value={sellerNumber}
                  onChange={(e) => onChange(e)}
                  required
                />
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
                Product Images
              </label>
              <div className='col-sm-9 controls'>
                <input
                  className='ml-1 col-md-12'
                  type='text'
                  placeholder='productImages'
                  name='productImages'
                  value={productImages}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className='form-group row col-md-6'>
              <label htmlFor='' className='col-sm-12 control-label'>
                Species: <span className='ans'>{species}</span>
              </label>
              <div className='col-sm-9 controls'>
                <select
                  className='ml-1 col-md-12'
                  name='species'
                  value={species}
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option value='0' disabled>
                    * Select species
                  </option>
                  <option value='Dog'>Dog</option>
                  <option value='Cat'>Cat</option>
                  <option value='Fish'>Fish</option>
                  <option value='Horse'>Horse</option>
                  <option value='Rabbit'>Rabbit</option>
                </select>
              </div>
            </div>
            <div className='form-group row col-md-6'>
              <label htmlFor='' className='col-sm-12 control-label'>
                Category: <span className='ans '>{category}</span>
              </label>
              <div className='col-sm-9 controls'>
                <select
                  className='ml-1 col-md-12'
                  name='category'
                  value={category}
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option value='0' disabled>
                    * Select category
                  </option>
                  <option value='Food'>Food</option>
                  <option value='PetCare'>PetCare</option>
                  <option value='Accessories'>Accessories</option>
                  <option value='Toys'>Toys</option>
                  <option value='Gifts'>Gifts</option>
                </select>
              </div>
            </div>
            <div className='form-group row col-md-6'>
              <label htmlFor='' className='col-sm-12 control-label'>
                Product Id
              </label>
              <div className='col-sm-9 controls'>
                <p className='text-muted ml-2'>{id}</p>
              </div>
            </div>
            <div className='form-group row col-md-6'>
              <label htmlFor='' className='col-sm-12 control-label'>
                Plus Points
              </label>
              <div className='col-sm-9 controls'>
                <input
                  className='ml-1 col-md-12'
                  type='number'
                  placeholder='plusPoints'
                  name='plusPoints'
                  value={plusPoints}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className='form-group row col-md-6'>
              <label htmlFor='' className='col-sm-12 control-label'>
                Brand
              </label>
              <div className='col-sm-9 controls'>
                <input
                  className='ml-1 col-md-12'
                  type='text'
                  placeholder='Brand'
                  name='brand'
                  value={brand}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
          </div>
          <input type='submit' className='btn btn-warning btn-md my-1 mr-3' />
          <button
            onClick={(e) => deleteDetails(e)}
            className='btn btn-warning my-1 mx-3 btn-md btn-danger'
            to='/'
          >
            Delete Product
          </button>
          <Link className='btn btn-light my-1 btn-md btn-dark' to='/'>
            Go Back
          </Link>
        </form>
      )}

      {noProducts && noProduct()}
    </div>
  );
};

export default EditProduct;
