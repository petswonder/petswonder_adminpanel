// Import constants from own file 'app-config.js'
import {
  con
} from "./../config/app-config.js";

import {queries} from './../config/queries.js'


// Model class
export class UserModel {

  constructor(){
    this.con = con;
  }

  create(name, email,mobile, pwd){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['user_register'], [name, email,mobile, pwd], (error, result) => {
        if (error) {
          reject(error)
        } else {
          this.con.query(queries['user']['create_user_cart'],[mobile], (err, result) => {
            if(err){
              reject(err)
            }
            else{
              resolve("You are now registered and can log in");
            }
          })
        }
      })
    })
  }

  getByNumber(number){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['user_login'], [number], (error, result) => {
        if (error) {
          reject(error)
        }
        if (result.length == 0) {
          reject(new Error("No results found in the database"))
        } else {
          resolve(result)
        }
      })
    })
  }

  storeOTP(otp,number){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['store_otp'], [otp,number], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
  }

  validateOTP(number,otp){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['validate_otp'], [number,otp], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
  }

  getUser(number){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['user_login'], [number], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
  }

  addToCart(user, id){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['add_to_cart'], [user, id, user], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
  }

  getCart(user){
    return new Promise((resolve, reject) => {
      // console.log(queries['user']['get_user_cart'])
      this.con.query(queries['user']['get_user_cart'], [user], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
  }

  updateCart(count, user, productId){
    
    if(count > 0){
      return new Promise((resolve, reject) => {
        this.con.query(queries['user']['update_user_cart'], [count, user, productId], (error, result) => {
          if (error) {
            reject(error)
          }
          else {
            resolve(result)
          }
        })
      })
    }else{
      return new Promise((resolve, reject) => {
        this.con.query(queries['user']['delete_item'], [user, productId], (error, result) => {
          if (error) {
            reject(error)
          }
          else {
            resolve(result)
          }
        })
      })
    }
    
  }

  deleteCart( user){
    
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['delete_cart'], [user], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
    
  }

  cartSummary(user){
    
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['cart_summary'], [user], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
    
  }

  getUserProfile(user_mobile){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['get_profile'], [user_mobile], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
  }

  editUserProfile(name, email, number, address, district, city, state, pincode){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['edit_user_profile'], [name, email, number, address, district, city, state, pincode, number], (error, result) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      })
    })
  }
  // getById(id){
  //   return new Promise((resolve, reject) => {
  //     this.con.query("SELECT * FROM customers WHERE id = ?", [id], (error, result) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       if (result.length == 0) {
  //         reject(new Error("No results found in the database"))
  //       } else {
  //         resolve(result)
  //       }
  //     })
  //   })
  // }

  // resetPassword(customer, password){
  //   return new Promise((resolve, reject) => {
  //     this.con.query("UPDATE customers SET password = ? WHERE id = ?", [password, customer.id], (error, result) => {
  //       if (error) {
  //         reject(error)
  //       } else {
  //         resolve("New password sent to email " + customer.email);
  //       }
  //     })
  //   })
  // }

  // update(customer, array){
  //   return new Promise((resolve, reject) => {
  //     if (array[2] == '') {
  //       this.con.query("UPDATE customers SET fullname = ?, email = ? WHERE id = ?", [array[0], array[1], customer.id], (error, result) => {
  //         if (error) {
  //           reject(error)
  //         } else {
  //           resolve("User updated successfully");
  //         }
  //       })
  //     } else {
  //       this.con.query("UPDATE customers SET fullname = ?, email = ?, password = ? WHERE id = ?", [array[0], array[1], array[2], customer.id], (error, result) => {
  //         if (error) {
  //           reject(error)
  //         } else {
  //           resolve("User updated successfully");
  //         }
  //       })
  //     }
  //   })
  // }

  // addShippingDetails(customer, array){
  //   return new Promise((resolve, reject) => {
  //     this.con.query("UPDATE customers SET address = ?, zipCode = ?, country = ?, phone = ? WHERE id = ?", [array[0], array[1], array[2], array[3], customer.id], (error, result) => {
  //       if (error) {
  //         reject(error)
  //       } else {
  //         resolve("Shipping details updated successfully");
  //       }
  //     })
  //   })
  // }

  // addPaymentDetails(customer, array){
  //   return new Promise((resolve, reject) => {
  //     this.con.query("UPDATE customers SET ccNumber = ?, cvvNumber = ? WHERE id = ?", [array[0], array[1], customer.id], (error, result) => {
  //       if (error) {
  //         reject(error)
  //       } else {
  //         resolve("Payment details updated successfully");
  //       }
  //     })
  //   })
  // }

  // addAcceptedTerms(customer, datetime){
  //   return new Promise((resolve, reject) => {
  //     this.con.query("UPDATE customers SET termsAcceptedOn = ? WHERE id = ?", [datetime, customer.id], (error, result) => {
  //       if (error) {
  //         reject(error)
  //       } else {
  //         resolve("Terms & Conditions acceptance updated successfully");
  //       }
  //     })
  //   })
  // }
}