import React, { useState } from 'react';
import Heading from './Heading';
import axios from 'axios';
import { deleteOrder } from './api';
import { Redirect } from 'react-router';

const Userview = ({ location }) => {
  const [redirect, setRedirect] = useState(false);
  const { state } = location;
  const {
    orderedBy,
    deliveryCharge,
    paymentType,
    paymentStatus,
    date,
    id,
    plusPointsEarned,
    address,
    productDetails,
  } = state;
  console.log(state)
  // debugger
  const {
    addressLine1,
    addressLine2,
    area,
    city,
    latitude,
    longitude,
    pinCode,
  } = address;
  const d = new Date(date).toLocaleDateString('en-Us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleClick = () => {
    deleteOrder(id)
      .then((res) => {
        console.log(res);
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container'>
      <div className='row '>
        {console.log(state)}
        <div className='card col-md-5 m-4'>
          <div className='card-header font-weight-bold h4'>
            OrderedBy:{orderedBy}
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              {/* Total Price:{productDetails[0].priceAfterDiscount} */}
            </li>
            <li className='list-group-item'>Delivery Charge:{deliveryCharge}</li>
            <li className='list-group-item'>Payment status:{paymentStatus}</li>
            <li className='list-group-item'>Payment type:{paymentType}</li>
            <li className='list-group-item'>Ordered date:{d}</li>
            <li className='list-group-item'>Ordered id:{id}</li>
          </ul>
        </div>
        <div
          className='card text-white col-md-5 m-4'
          style={{ backgroundColor: '#E1AD01' }}
        >
          <div className='card-header font-weight-bold h4'>Address</div>
          <div className='p-2 font-weight-bolder'>
            {addressLine1},
            <br />
            {addressLine2},
            <br />
            {area} - {pinCode},
            <br />
            {city},
            <br />
            {address.state}
          </div>
        </div>
        <button className='btn btn-danger mx-auto my-3' onClick={handleClick}>
          Delete Order
        </button>
      </div>

      <Heading text='Product details' />
      <div className='row m-2 '>
        {productDetails.map((product) => (
          <div className='col-md-4'>
            <div className='card border-warning '>
              <div className='card-body'>
                <h5 className='card-title'>
                  {product.productTitle} <br /> ({product.productId})
                </h5>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    quantityOrdered:{product.quantityOrdered}
                  </li>
                  <li className='list-group-item'>
                    sellerNumber:{product.sellerNumber}
                  </li>
                  <li className='list-group-item'>
                    price:{product.singleItemPrice}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {redirect && <Redirect to='/shopping' />}
    </div>
  );
};

export default Userview;

// import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// let url=`https://petswonder.co.in/petswonder/api/saveOrder/getOrderDetails`;

// class Userview extends Component {

// constructor(props) {
//     super(props)

//     this.state=
//     {
//         userdetails:''
//     }
// }

//     ///console.log(props.match.params.id);

// render()
// {
//     //desctructuring
//     const { orderedBy,name,username, email, phone, website }= this.state.userdetails

//     return (<>

//         <div className="container p-5">

//             <h3 className="py-3 text-center">User Selected  { this.props.match.params.idno} Parameter Details.....</h3>

//                 <table className="table table-bordered w-50 mx-auto">

//                     <tbody>

//                         <tr>
//                             <th>ID</th>
//                             <td>{ orderedBy }</td>
//                         </tr>

//                         <tr>
//                             <th>NAME</th>
//                             <td>{ this.props.match.params.idno}</td>
//                         </tr>

//                         <tr>
//                             <th>USERNAME</th>
//                             <td>{ username }</td>
//                         </tr>

//                         <tr>
//                             <th>EMAIL</th>
//                             <td>{ email }</td>
//                         </tr>

//                         <tr>
//                             <th>PHNO</th>
//                             <td>{ phone }</td>
//                         </tr>

//                         <tr>
//                             <th colSpan="2" className="text-center">   <Link to={`/`} className="btn btn-primary">Goback</Link> </th>
//                         </tr>

//                     </tbody>
//                 </table>

//         </div>

//     </>)

// }//render

// componentDidMount()  //HTTP_RESTAPI_CALLS
//  {

//      axios.get(`${url}/${this.props.match.params.idno}`).then( (res)=> this.setState({  userdetails: res.data }) )
//  }

// }

// export default Userview;
