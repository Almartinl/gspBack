// import express from "express";
// import productController from "../controller/product_controller.js";

const express = require("express");
const productController = require("../controller/product_controller.js")

const productRouter = express.Router();

productRouter.get("/", productController.getProducts);

productRouter.post("/category", productController.getProductByCategory);

productRouter.post("/upload", productController.uploadImage);

// Obtener una imagen por su id
productRouter.get("/image/:id", productController.getImage);

productRouter.post("/add_product", productController.addProduct);

module.exports = productRouter;

// export default productRouter;
