import React,{useEffect} from 'react'

const ViewOrder = (props) => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    const order=props.location.orderProps;
    console.log(order)
    
    const purchaseHistory = () =>{
        return <div className="card mb-5">
            <h3 className="card-header">Products</h3>
            <ul className="list-group">
                <li className="list-group-item">
                            {order.productDetails.map((p, i) => {
                                return (
                                    <div key={i}>
                                        <h6>Product name: {p.productTitle}</h6>
                                        <h6>productId: {p.productId}</h6>
                                        <h6>quantityOrdered: {p.quantityOrdered}</h6>
                                        <h6>Single Item Price: ₹{p.singleItemPrice}</h6>
                                        <h6>Product discount: {p.discount}</h6>
                                        <h6>Product priceAfterDiscount: ₹{p.priceAfterDiscount}</h6>
                                        <hr/>
                                    </div>
                                );
                            })}
                </li>
            </ul>
        </div>   
    }

    const PromoCodeDetails = () =>{
        return <div className="card mb-5">
            <h3 className="card-header">Promo Code Details</h3>
            <ul className="list-group">
                <li className="list-group-item">
                            {order.productDetails.map((p, i) => {
                                return (
                                    <div key={i}>
                                        <h6>Promo Code: {p.promoCode ? (p.promoCode) : ("-")}</h6>
                                        <h6>Promo Code Discount: {p.promoCodeDiscount? (p.promoCodeDiscount) : ("-")}</h6>
                                        <h6>description: {p.description? (p.description) : ("-")}</h6>
                                        <hr/>
                                    </div>
                                );
                            })}
                </li>
            </ul>
        </div>   
    }
    
    return (
        <div className="container mt-3">
            <table className="table table-bordered">
            <thead className="thead-dark">
                <tr>
                <th scope="col">Order Details</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">ID</th>
                <td>{order.id}</td>
                </tr>
                <tr>
                <th scope="row">Ordered By</th>
                <td>{order.orderedBy}</td>
                </tr>
                <tr>
                <th scope="row">Total Price</th>
                <td>{order.totalPrice}</td>
                </tr>
                <tr>
                <th scope="row">Payment Type</th>
                <td>{order.paymentType}</td>
                </tr>
                <tr>
                <th scope="row">Address</th>
                <td>{order.address.addressLine1}
                    <br/>{order.address.addressLine2}
                    <br/>{order.address.area} - {order.address.pinCode}
                    <br/>{order.address.state}
                </td>
                </tr>
                <tr>
                <th scope="row">PaymentStatus</th>
                <td>{order.paymentStatus}</td>
                </tr>
                <tr>
                <th scope="row">Plus Points Earned</th>
                <td>{order.plusPointsEarned}</td>
                </tr>
                <tr>
                <th scope="row">Delivery Charge</th>
                <td>{order.deliveryCharge}</td>
                </tr>
                <tr>
                <th scope="row">Order Status</th>
                <td>{order.orderStatus}</td>
                </tr>
                                
            </tbody>
            </table>
            {purchaseHistory()}
            {PromoCodeDetails()}
        </div>
    )
}

export default ViewOrder
