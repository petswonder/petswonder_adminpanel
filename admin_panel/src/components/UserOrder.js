import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getOrders } from './api';
import './App.css';
import ChangeStatus from './ChangeStatus';
import Heading from './Heading';
import Shopping from './Shopping';

const UserOrder = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getOrders()
      .then((d) => {
        d.reverse();
        setData(d);
        console.log(d);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className='container col-12'>
        <br />
        <div className='row'>
          <div className='col-7 mx-auto'>
            <Shopping />
          </div>
        </div>
        <br />
        <Heading text='User Orders' />

        <br />
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>S.no.</th>
              <th scope='col'>Ordered By</th>
              <th scope='col'>Payment</th>
              <th scope='col'>Payment Status</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Order Status</th>
              <th scope='col'>View</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((d, i) => {
                return <ChangeStatus d={d} key={i} i={i + 1} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserOrder;
