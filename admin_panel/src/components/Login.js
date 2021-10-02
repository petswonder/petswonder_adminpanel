import React,{useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { authenticate, signin } from './auth/index';

const Login = (props) => {

    const [formData, setFormdata] = useState({
        user: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
      });
    
      // const [status, setStatus] = useState('');
    
      const { user, password, error, redirectToReferrer } = formData;

      const handleChange = (e) => {
        setFormdata({
          ...formData,
          error: false,
          [e.target.name]: e.target.value,
        });
      };
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        let res = signin({ user, password })
        // signin({ user, password }).then((res) => {
            if (res === 'success') {
                authenticate({ data: user, user: { user } }, () => {
                  setFormdata({
                    ...formData
                  });
                  
                });
                // return <Redirect to='/banner' />
                
              } else {
                setFormdata({
                  ...formData,
                  error: 'Invalid Credentials',
                });
              }
        // })
        
          
        // });
      };

    return(
        <>
        <div className="col-6 mx-auto py-5">
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input
                    type='user'
                    name='user'
                    value={user}
                    onChange={(e) => handleChange(e)}
                    className='form-control input'
                  />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                <input 
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => handleChange(e)}
                    className='form-control input'/>
                </div>
            </div>
            <button className="btn btn-primary">Sign In</button>
        </form>
        </div>
        </>
    )
}

export default Login
