// import bungalowsQueries from "./mysql_queries/bungalows_queries.js";
// import configQueries from "./mysql_queries/config_queries.js";
// import obrasQueries from "./mysql_queries/obras_queries.js";
// import productQueries from "./mysql_queries/product_queries.js";
// import userQueries from "./mysql_queries/user_queries.js";

const bungalowsQueries = require("./mysql_queries/bungalows_queries.js")
const configQueries = require("./mysql_queries/config_queries.js")
const obrasQueries = require("./mysql_queries/obras_queries.js")
const productQueries = require("./mysql_queries/product_queries.js")
const userQueries = require("./mysql_queries/user_queries.js")

const dao = {};

dao.getUsers = async () => await userQueries.getUsers();

//Buscar un usuario por el email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);

//Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData);

//Buscar usuario por Id
dao.getUserById = async (id) => await userQueries.getUserById(id);

//Eliminar user por Id
dao.deleteUser = async (id) => await userQueries.deleteUser(id);

// Modificar usuario por su id
dao.updateUser = async (id, userData) =>
  await userQueries.updateUser(id, userData);

dao.getCountUser = async () => await userQueries.getCountUser();

dao.getProducts = async () => await productQueries.getProducts();

dao.getProductsByCategory = async (categoria) => await productQueries.getProductsByCategory(categoria);

// Añadir datos de la imagen subida al servidor
dao.addImage = async (imageData) => await productQueries.addImage(imageData);

// Obtener una imagen por su id
dao.getImageById = async (id) => await productQueries.getImageById(id);

//Obtener producto por referencia
dao.getProductByRef = async (ref) => await productQueries.getProductByRef(ref);

//Añadir un producto a bbdd
dao.addProduct = async (productData, image) =>
  await productQueries.addProduct(productData, image);

dao.getCountModels = async () => await configQueries.getCountModels();

dao.getDisposicion = async () => await configQueries.getDisposicion();

dao.getOrientacion = async (disposicion) =>
  await configQueries.getOrientacion(disposicion);

dao.getModelo = async (orientacion) =>
  await configQueries.getModelo(orientacion);

dao.getTipo = async (modelo) => await configQueries.getTipo(modelo);

dao.getBungalowa = async (tipo) => await configQueries.getBungalowa(tipo);

dao.getBungalowb = async (bungalowa) =>
  await configQueries.getBungalowb(bungalowa);

dao.getBungalowc = async (bungalowb) =>
  await configQueries.getBungalowc(bungalowb);

dao.getModeloBungalowSimple = async ({
  disposicion,
  orientacion,
  modelo,
  tipo,
}) =>
  await configQueries.getModeloBungalowSimple({
    disposicion,
    orientacion,
    modelo,
    tipo,
  });

dao.getModeloBungalowDoble = async ({
  disposicion,
  orientacion,
  modelo,
  tipo,
  bungalowa,
  bungalowb,
}) =>
  await configQueries.getModeloBungalowDoble({
    disposicion,
    orientacion,
    modelo,
    tipo,
    bungalowa,
    bungalowb,
  });

dao.getModeloBungalowTriple = async ({
  disposicion,
  orientacion,
  modelo,
  tipo,
  bungalowa,
  bungalowb,
  bungalowc,
}) =>
  await configQueries.getModeloBungalowTriple({
    disposicion,
    orientacion,
    modelo,
    tipo,
    bungalowa,
    bungalowb,
    bungalowc,
  });

dao.addBungalow = async (bungalowData) =>
  await bungalowsQueries.addBungalows(bungalowData);

dao.getAllBungalow = async (usuario) =>
  await bungalowsQueries.getAllBungalow(usuario);

dao.deleteBungalowById = async (id) =>
  await bungalowsQueries.deleteBungalowById(id);

dao.addPresupuesto = async (presupuestoData) =>
  await bungalowsQueries.addPresupuesto(presupuestoData);

dao.getAllPresupuesto = async () => await bungalowsQueries.getAllPresupuesto();

dao.deletePresupuestoById = async (id) =>
  await bungalowsQueries.deletePresupuestoById(id);

dao.addContact = async (contactData) =>
  await userQueries.addContact(contactData);

dao.getCountContact = async () => await userQueries.getCountContact();

dao.getCountPresupuesto = async () =>
  await bungalowsQueries.getCountPresupuesto();

dao.getAllContact = async () => await userQueries.getAllContact();

dao.deleteContactById = async (id) => await userQueries.deleteContactById(id);

dao.getAllObras = async () => await obrasQueries.getAllObras();

dao.getCountObras = async () => await obrasQueries.getCountObras();

dao.addObra = async (obraData, image) =>
  await obrasQueries.addObra(obraData, image);

dao.addObraImage = async (imageData) => await obrasQueries.addObraImage(imageData);

module.exports = dao

// export default dao;
