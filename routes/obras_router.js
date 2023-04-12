// import express from "express";
// import obrasController from "../controller/obras_controller.js";

const express = require("express");
const obrasController = require("../controller/obras_controller.js")

const obrasRouter = express.Router();

obrasRouter.get("/", obrasController.getAllObras);

obrasRouter.get("/count", obrasController.getCountObras);

module.exports = obrasRouter;

// export default obrasRouter;
