import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios'


let murl='https://petswonder.co.in/petswonder/api/saveOrder/getOrdersDetails';

 class Userorders extends Component {

    constructor(props)
    {
       super()
        this.state={
            userdata:['']
        }
        console.log(props)

    }

    loadapidata=async ()=>
{
    await axios.post(murl).then( (res)=> this.setState({ userdata: res.data }) );
}


    deleteUserdata=async (id)=>
{
    
    if( window.confirm(`Do you delete ${id} Data now?`) )
    {
        await axios.delete(`${murl}/${id}`); 

            this.loadapidata();
        
    }
}

    render() {
       
        return (<>
            <div className="container px-5">
            <h1 className="text-center my-5 title ">User Orders Details</h1>        
           
           
            <table className="table table-bordered table-striped">

                <thead className=" bg-dark text-white">
                    <tr>
                        <th>S.No</th>
                        <th>Ordered By</th>
                        <th>Payment Type</th>
                        <th>Payment Status</th>
                        <th>Total Price</th>
                        <th colSpan="2" className="text-center">ACTION</th>
                    </tr>
                </thead>

                <tbody>
                { 
                this.state.userdata.map( (result, index)=>{ 
                    return(<tr key={index}>
                            <td>{ index+1 } </td>
                            
                            <td>{ result.orderedBy} </td>
                            <td>{ result.paymentType} </td>
                            <td>{ result.paymentStatus} </td>
                            <td>{ result.totalPrice} </td>

                            <td className="text-center"> <Link to={`/userorders/${result.id}`} className="btn btn-primary  ">View</Link> </td>
                            <td className="text-center"> <Link to={`/userorders/${result.id}`} className="btn btn-info ">Edit</Link> </td>
                            
                            
                        </tr>)
                })
            }
                </tbody>
            </table>


    </div>
                         </>)

               }
    componentDidMount()
    {
        this.loadapidata()
    }
}
export default Userorders;