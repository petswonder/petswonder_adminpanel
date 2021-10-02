import React from 'react'

const Heading = ({text}) => {
    return (
        <div className="colored-heading container" style={{textAlign:"center"}}>
        <div className="row">
            <div className="col-2">
                <h2><i className="fas fa-paw"></i></h2>
            </div>
            <div className="col-8" >
                <h2>{text}</h2>
            </div>
            <div className="col-2">
                <h2><i className="fas fa-paw"></i></h2>
            </div>

        </div>
    </div>
    )
}

export default Heading