import React from 'react';

//react-router-dom package
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

//COMPONENTS
import Userorders from './Userorders.js';
import Header from './navbars/Navbar';
import Userview from './Userview.js';
import ProductPanel from './ProductPanel.js';
import UserOrder from './UserOrder.js';
import ViewOrder from './ViewOrder.js';
import EditProduct from './EditProduct.js';
import Home from './home/Home.js';
import AddBanner from './home/AddBanner';
import DeleteBanner from './home/DeleteBanner';
import AddService from './services/AddService';
import EditService from './services/EditService';
import AddVet from './services/AddVet';
import EditVet from './services/EditVet';
import AddGuide from './guide/AddGuide';
import EditGuide from './guide/EditGuide';
import Login from './Login';
import { isAuthenticated  } from './auth/index.js';
import PrivateRoute from './auth/PrivateRoute.js';


const Routings = () => {

  const jwt = isAuthenticated();


  return (
    <>
      <BrowserRouter>
        { jwt ? <Header /> : <></>}
        <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/banner' component={AddBanner} />
        <PrivateRoute exact path='/addbanner' component={AddBanner} />
        <PrivateRoute exact path='/deletebanner' component={DeleteBanner} />
        <PrivateRoute exact path='/services' component={AddService} />
        <PrivateRoute exact path='/services/addService' component={AddService} />
        <PrivateRoute exact path='/services/editService' component={EditService} />
        <PrivateRoute exact path='/services/addVet' component={AddVet} />
        <PrivateRoute exact path='/services/editVet' component={EditVet} />
        <PrivateRoute exact path='/shopping' component={UserOrder} />
        <PrivateRoute exact path='/shopping/userorder' component={UserOrder} />
        <PrivateRoute path='/shopping/userorders/:idno' component={Userview} />
        <PrivateRoute exact path='/shopping/order/:orderId' component={ViewOrder} />
        <PrivateRoute path='/shopping/addproduct' component={ProductPanel} />
        <PrivateRoute path='/shopping/editproduct' component={EditProduct} />
        <PrivateRoute path='/guide' component={AddGuide} />
        <PrivateRoute path='/editguide' component={EditGuide} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default Routings;
