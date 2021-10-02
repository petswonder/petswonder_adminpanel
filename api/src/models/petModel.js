import {
    con
  } from "./../config/app-config.js";
  
  import {queries} from './../config/queries.js'
  
  
  // Model class
  export class PetModel {
  
    constructor(){
      this.con = con;
    }

    getPet(number){
        return new Promise((resolve, reject) => {
          this.con.query(queries['user']['get_pet'], [number], (error, result) => {
            if (error) {
              reject(error)
            }
            else {
              resolve(result)
            }
          })
        })
      }

      createPet(name, breed, gender, dob, type, userNumber){
        return new Promise((resolve, reject) => {
            this.con.query(queries['user']['create_pet'], [name, breed, gender, dob, type, userNumber], (error, result) => {
              if (error) {
                reject(error)
              }
              else {
                resolve(result)
              }
            })
          })
      }

      editPet(name, breed, gender, dob, type, userNumber){
        
        return new Promise((resolve, reject) => {
            this.con.query(queries['user']['edit_pet_profile'], [name, breed, gender, dob, type, userNumber], (error, result) => {
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