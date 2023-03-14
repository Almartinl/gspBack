import express from "express";
import productController from "../controller/product_controller.js";

const productRouter = express.Router();

productRouter.get("/", productController.getProducts);

productRouter.get("/:id", productController.getProductById);

productRouter.post("/upload", productController.uploadImage);

// Obtener una imagen por su id
productRouter.get("/image/:id", productController.getImage);

productRouter.post("/add_product", productController.addProduct);

export default productRouter;
