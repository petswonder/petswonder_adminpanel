// Import constants from own file 'app-config.js'
import {
  con
} from "./../config/app-config.js";

import {queries} from './../config/queries.js'

// Model class
export class ProductModel {

  // Constructor of the class
  constructor(){
    this.con = con;
    this.pageSize = 3;
    this.queries = queries
  }

  getAllProducts(){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['all_products'],(error, result) => {
        if(error){
          return reject(error)
        }
        else{
          return resolve(result)
        }
      })
    })
  }

  getProductById(id){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['product_by_id'],[id], (error, result) => {
        if(error){
          return reject(error)
        }
        else{
          return resolve(result)
        }
      })
    })
  }

  getProductByBrand(brand){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['product_by_brand'],[brand], (error, result) => {
        if(error){
          return reject(error)
        }
        else{
          return resolve(result)
        }
      })
    })
  }

  getProductByCategory(category){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['product_by_category'],[category], (error, result) => {
        if(error){
          return reject(error)
        }
        else{
          return resolve(result)
        }
      })
    })
  }

  getProductBySubCategory(category, pet){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['product_by_sub_category'],[category, pet], (error, result) => {
        if(error){
          return reject(error)
        }
        else{
          return resolve(result)
        }
      })
    })
  }

  getProductByPet(pet){
    return new Promise((resolve, reject) => {
      this.con.query(queries['user']['product_by_pet'],[pet], (error, result) => {
        if(error){
          return reject(error)
        }
        else{
          return resolve(result)
        }
      })
    })
  }

}