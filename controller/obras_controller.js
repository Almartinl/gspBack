import { currentDir } from "../index.js";
import dao from "../services/dao.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.getAllObras = async (req, res) => {
  try {
    const getAllObras = await dao.getAllObras();
    if (getAllObras) return res.send(getAllObras);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getCountObras = async (req, res) => {
  try {
    const getCountObras = await dao.getCountObras();
    if (getCountObras) return res.send(getCountObras);
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
