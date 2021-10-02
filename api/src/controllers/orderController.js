import {} from "dotenv/config.js";

// Import models
import { OrderModel } from "../models/OrderModel.js";
const Order = new OrderModel();

export class OrderController{

    async confirmOrder(req,res){
        console.log(req)
    }

}