// Import dependency 'express'
import express from "express";
// Import csrf
import csrf from "csurf";
const csrfProtection = csrf({cookie: true});

const router = express.Router();
// router.use(csrfProtection);

// router.get('/', (req, res) => {
//   // res.cookie('CSRF-Token', req.csrfToken(), { httpOnly: false });
//   // next();
//   res.send('api')
// });

// Import controller methods
import { ProductController } from "./../controllers/productController.js";
const productController = new ProductController();

import { UserController } from "./../controllers/userController.js";
const userController = new UserController();

import { PetController } from "./../controllers/petController.js";
const petController = new PetController();

import { OrderController } from "./../controllers/orderController.js";
const orderController = new OrderController();

// Import own middleware "auth.js"
import { AuthUtil } from "../config/auth.js";
const Auth = new AuthUtil();

// Routes
router.get("/products", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.get("/productbybrands", productController.getProductByBrand);
router.get("/productbypet", productController.getProductByPet);
router.get("/productbycategory", productController.getProductByCategory);
router.get("/productbysubcategory", productController.getProductBySubCategory);
router.post("/cart", userController.getCart);
router.post("/cart/addToCart", userController.addToCart);
// router.post("/cart/removeFromCart", Auth.ensureAuthenticated, publicController.removeFromCart);
router.post("/cart/updateCart", userController.updateCart);
router.post("/cart/deleteCart", userController.deleteCart);
router.post("/cart/summary", userController.cartSummary);
// router.get("/checkout/:step", Auth.ensureAuthenticated, publicController.goToCheckout);
// router.post("/checkout/1", Auth.ensureAuthenticated, publicController.validateShipping);
// router.post("/checkout/2", Auth.ensureAuthenticated, publicController.validatePayment);
router.post("/confirmOrder", orderController.confirmOrder);
router.post("/login", userController.loginUser);
router.post("/register", userController.newUser);
router.get("/sendOTP" , userController.sendOTP);
router.get("/validateOTP" , userController.validateOTP);
// router.post("/login", userController.authenticate);
// router.get("/register", Auth.ensureNotAuthenticated, userController.goToRegister);
// router.post("/register", userController.newUser);
// router.get("/reset", Auth.ensureNotAuthenticated, userController.goToReset);
// router.post("/reset", userController.newPassword);
router.post("/profile", userController.getUserProfile);
router.post("/petprofile", petController.getPetProfile);
router.post("/createpetprofile", petController.createPetProfile);
router.post("/editpetprofile", petController.editPetProfile);
router.post("/editprofile", userController.editUserProfile);
// router.post("/profile", userController.updateProfile);
// router.get("/logout", Auth.ensureAuthenticated, userController.logout);

export {
  router
};