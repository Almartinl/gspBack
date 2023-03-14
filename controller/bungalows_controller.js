import { currentDir } from "../index.js";
import dao from "../services/dao.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.addBungalow = async (req, res) => {
  const { nombre, usuario, planta, nombrebungalow } = req.body;
  if (!nombre || !usuario || !planta || !nombrebungalow)
    return res.status(400).send("Error al recibir el body");

  try {
    const addBungalow = await dao.addBungalow(req.body);
    if (addBungalow) return res.send(`${nombre} registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getAllBungalow = async (req, res) => {
  const { usuario } = req.body;

  try {
    const getAllBungalow = await dao.getAllBungalow(usuario);
    if (getAllBungalow) return res.send(getAllBungalow);
  } catch (e) {
    console.log(e.message);
  }
};

controller.deleteBungalowById = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteBungalow = await dao.deleteBungalowById(id);
    if (deleteBungalow) return res.send("Modelo borrado");
  } catch (e) {
    console.log(e.message);
  }
};

controller.addPresupuesto = async (req, res) => {
  const { usuario, descripcion } = req.body;
  if (!usuario || !descripcion)
    return res.status(400).send("Error al recibir el body");

  try {
    const addPresupuesto = await dao.addPresupuesto(req.body);
    if (addPresupuesto) return res.send(`${descripcion} registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getAllPresupuesto = async (req, res) => {
  try {
    const allPresupuesto = await dao.getAllPresupuesto();
    if (allPresupuesto) return res.send(allPresupuesto);
  } catch (e) {
    console.log(e.message);
  }
};

controller.deletePresupuestoById = async (req, res) => {
  const { id } = req.body;
  try {
    const presupuesto = await dao.deletePresupuestoById(id);

    if (presupuesto.length <= 0)
      return res.status(404).send("presupuesto no existe");

    return res.send(`presupuesto ${id} eliminado`).status(200);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getCountPresupuesto = async (req, res) => {
  try {
    const allPresupuesto = await dao.getCountPresupuesto();
    if (allPresupuesto) return res.send(allPresupuesto);
  } catch (e) {
    console.log(e.message);
  }
};
export default controller;
