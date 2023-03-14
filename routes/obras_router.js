import express from "express";
import obrasController from "../controller/obras_controller.js";

const obrasRouter = express.Router();

obrasRouter.get("/", obrasController.getAllObras);

obrasRouter.get("/count", obrasController.getCountObras);

export default obrasRouter;
