// Import models
import { PetModel } from "../models/petModel.js";
const Pet = new PetModel();


export class PetController {


    async getPetProfile(req, res){
        // console.log(req.body.userNumber)
        const user_mobile = (req.body.userNumber)
        try{
          let result = await Pet.getPet(user_mobile)
          res.end(JSON.stringify(result))
        } catch(e) {
            throw e;
        }
    }

    async createPetProfile(req, res){
        const data = req.body
        // console.log(data.name, data.breed, data.gender, data.dob, data.type, data.userNumber)
        // const user_mobile = (req.body.userNumber)
        try{
          let result = await Pet.createPet(data.name, data.breed, data.gender, data.dob, data.type, data.userNumber)
          res.end(JSON.stringify(result))
        } catch(e) {
            throw e;
        }
    }

    async editPetProfile(req, res){
        console.log(req.body)
        const data = req.body
        try{
          let result = await Pet.editPet(data.name, data.breed, data.gender, data.dob, data.category, data.userNumber)
          res.end(JSON.stringify(result))
        } catch(e) {
            throw e;
        }
    }
}