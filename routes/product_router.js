// import express from "express";
// import productController from "../controller/product_controller.js";

const express = require("express");
const productController = require("../controller/product_controller.js");

const productRouter = express.Router();

productRouter.get("/", productController.getProducts);

productRouter.post("/category", productController.getProductByCategory);

productRouter.post("/upload", productController.uploadImage);

// Obtener una imagen por su id
productRouter.get("/image/:id", productController.getImage);

productRouter.post("/add_product", productController.addProduct);

productRouter.post("/add_offer", productController.addOffer);

productRouter.patch("/offer/:id", productController.updateOffer);

productRouter.get("/offer", productController.getOffer);

productRouter.get("/offer/active", productController.getOfferActive);

module.exports = productRouter;

// export default productRouter;
