// Import dependencies
import bcrypt from "bcrypt";
import passport from "passport";
import AWS from 'aws-sdk'
import {} from "dotenv/config.js";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  "region": process.env.AWS_REGION
});

// Import models
import { UserModel } from "../models/UserModel.js";
const User = new UserModel();

const generateOTP = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export class UserController {
  
  async newUser(req, res){
    const fullname = req.body.name;
    const email = req.body.email;
    const mobile = req.body.phoneNumber;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const promise = User.create(fullname, email,mobile, hashedPassword);
    try {
      promise.then((result) => {
        res.end(JSON.stringify('success'))
      })
      
    }
    catch(e) {
      throw e;
    }
  }

  async sendOTP(req, res){
    try{
      var otp = generateOTP(1000,9999)
      var params = {
          Message: 'Welcome to Petswonder! Your mobile verification code is: ' + otp ,
          PhoneNumber: '+91' + req.query.number,
          MessageAttributes: {
              'AWS.SNS.SMS.SenderID': {
                  'DataType': 'String',
                  'StringValue': 'OTP'
              }
          }
      };

      await User.storeOTP(otp, req.query.number)
      var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31', region: 'ap-south-1' }).publish(params).promise();

      publishTextPromise.then((data) => {
              res.send(JSON.stringify({ MessageID: data.MessageId }));
          }).catch( (err) => {
                  res.send(JSON.stringify({ Error: err }));
              });
    } catch(e) {
        throw e;
    }
    
  }

  async validateOTP(req, res){
    try{
      let result = await User.validateOTP(req.query.number, req.query.otp);
      console.log(result.length)
      if(result.length === 1){
        res.end(JSON.stringify('success'))
      }
      else{
        res.end(JSON.stringify('failed'))
      }
      
    } catch(e) {
        throw e;
    }
    
  }

  async loginUser(req, res){
    const mobile = req.body.userNumber;
    const password = req.body.password;
    const user = User.getUser(mobile)
    user.then(user => {
      bcrypt.compare(password, user[0].user_pwd).then(validPass => {
        if(validPass){
          res.send(JSON.stringify(user))
        }
        else{
          res.send(JSON.stringify('failed'))
        }
      })
    })
    
  }

  async addToCart(req, res){
    const user_number = req.body.userNumber
    const product_id = req.body.id 
    try{
      let result = await User.addToCart(user_number,product_id)
      // console.log(result)
      res.end(JSON.stringify('success'))
    } catch(e) {
        throw e;
    }
  }

  async getCart(req, res){
    // console.log(req.body)
    const user_number = (req.body.userNumber)
    try{
      let result = await User.getCart(user_number)
      res.end(JSON.stringify(result))
    } catch(e) {
        throw e;
    }
  }

  async updateCart(req, res){
    const user_mobile = req.body.userNumber
    const product_id = req.body.productId
    const count = req.body.count
    try{
      let result = await User.updateCart(count, user_mobile, product_id)
      res.end(JSON.stringify('success'))
    } catch(e) {
        throw e;
    }
  }

  async deleteCart(req, res){
    console.log(req.body.userNumber)
    const user_mobile = (req.body.userNumber)
    try{
      let result = await User.deleteCart(user_mobile)
      res.end(JSON.stringify('success'))
    } catch(e) {
        throw e;
    }
  }

  async cartSummary(req, res){
    const user_mobile = req.body.userNumber
    const cart = User.cartSummary(user_mobile)
    // console.log(user_mobile)
    cart.then(response => {
      // console.log(response)
      res.end(JSON.stringify(response))
    })
  }

  async getUserProfile(req, res){
    // console.log(req.body.userNumber)
    const user_mobile = (req.body.userNumber)
    try{
      let result = await User.getUserProfile(user_mobile)
      res.end(JSON.stringify(result))
    } catch(e) {
        throw e;
    }
  }


  async editUserProfile(req, res){
    // console.log(req.body)
    const name = req.body.userName
    const number = req.body.mobileNumber
    const email = req.body.email
    const address = req.body.address
    const district = req.body.district
    const city = req.body.city
    const state = req.body.state
    const pincode = req.body.pincode
    try{
      let result = await User.editUserProfile(name, email, number, address, district, city, state, pincode)
      res.end(JSON.stringify('success'))
    } catch(e) {
        throw e;
    }
  }
}