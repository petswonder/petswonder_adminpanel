import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateStats } from './api';

const ChangeStatus = ({ d, i }) => {
  const [status, updateStatus] = useState(d.orderStatus);
  const id = d.id;
  const onChange = (e) => {
    updateStatus(e.target.value);
    const stats = e.target.value;
    updateStats(id, stats)
      .then((data) => {
        alert('updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <tr>
      <th scope='row'>{i}</th>
      <td>{d.orderedBy}</td>
      <td>{d.paymentType}</td>
      <td>{d.paymentStatus}</td>
      <td>{d.totalPrice}</td>
      <td id='ISINcb' className='lblCell_R' align='center'>
        <select
          value={status}
          onChange={(e) => onChange(e)}
          className='ml-1 col-md-12'
        >
          <option value='Shipped'>Shipped</option>
          <option value='Delivered'>Delivered</option>
          <option value='Cancelled'>Cancelled</option>
        </select>
      </td>
      <td>
        <Link
          className='view'
          to={{ pathname: `/shopping/userorders/${d.id}`, state: d }}
        >
          <button type='button' className='btn btn-info'>
            View
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ChangeStatus;
