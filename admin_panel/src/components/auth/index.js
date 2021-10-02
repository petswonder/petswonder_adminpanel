import { Redirect } from "react-router-dom";

//save token in storage
export const authenticate = (data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data))
      window.location.pathname = '/banner'
    }
  };

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
    }
    return false;
  };

export const signin = (user) => {
    console.log(user);
    if(user.user == 'admin' && user.password == 'admin123'){
        return 'success'
    }
    else{
        return 'failed'
    }
    // return fetch(
    //   `https://petswonder.co.in/petswonder/api/register/loginCheck?userNumber=${user.userNumber}&password=${user.password}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    //   }
    // )
    //   .then((response) => {
    //     return response.text();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  export const signout = () => {
    if (typeof window !== 'undefined') {
        // debugger
      localStorage.removeItem('jwt');
      window.location.pathname = '/'
    }
    }