import path from "path";

// Import models
import { ProductModel } from "../models/ProductModel.js";
const Product = new ProductModel();


export class ProductController {
    async getAllProducts(req, res){
        try{
            let result = await Product.getAllProducts()
            res.end(JSON.stringify(result))
        } catch(e) {
            throw e;
        }
      }

    async getProductById(req, res){
        try{
            let productId = req.params.id
            let result = await Product.getProductById(productId)
            res.end(JSON.stringify(result))
        }catch(e) {
            throw e;
        }
    }

    async getProductByBrand(req, res){
        try{
            let brand = req.query.brand
            let result = await Product.getProductByBrand(brand)
            res.end(JSON.stringify(result))
        }catch(e) {
            throw e;
        }
    }

    async getProductByPet(req, res){
        try{
            let pet = req.query.pet
            let result = await Product.getProductByPet(pet)
            res.end(JSON.stringify(result))
        }catch(e) {
            throw e;
        }
    }

    async getProductBySearch(req, res){
        try{
            let term = req.params.searchterm
            let result = await Product.getProductBySearch(term)
            res.end(JSON.stringify(result))
        }catch(e) {
            throw e;
        }
    }

    async getProductByCategory(req, res){
        try{
            let category = req.query.category
            let result = await Product.getProductByCategory(category)
            res.end(JSON.stringify(result))
        }catch(e) {
            throw e;
        }
    }

    async getProductBySubCategory(req, res){
        try{
            let pet = req.body.pet
            let category = req.body.category
            let result = await Product.getProductBySubCategory(category, pet)
            res.end(JSON.stringify(result))
        }catch(e) {
            throw e;
        }
    }
}