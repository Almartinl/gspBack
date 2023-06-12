// import { jwtVerify, SignJWT } from "jose";
// import md5 from "md5";
// import dao from "../services/dao.js";

const { jwtVerify, SignJWT } = require("jose");
const md5 = require("md5");
const dao = require("../services/dao.js");
const transporter = require("../config/nodemailer.js");

const controller = {};

controller.getUsers = async (req, res) => {
  const {} = req.body;
  try {
    const users = await dao.getUsers();

    if (users.length <= 0) return res.status(404).send("usuarios no existe");

    return res.send(users);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await dao.getUserByEmail(email);
    if (user.length <= 0) return res.status(404).send("usuario no registrado");
    return res.send(user);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.addUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).send("Error al recibir el body");

  try {
    const user = await dao.getUserByEmail(email);

    if (user.length > 0) return res.status(409).send("usuario ya registrado");

    const addUser = await dao.addUser(req.body);
    if (addUser)
      return res.send(`Usuario ${nombre} con id: ${addUser} registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Error al recibir el body");

  try {
    let user = await dao.getUserByEmail(email);
    if (user.length <= 0) return res.status(404).send("usuario no registrado");
    const clientPassword = md5(password);
    console.log(user);

    // [user] = user;
    const [newUser] = user;

    if (newUser.password !== clientPassword)
      return res.status(401).send("Password incorrecta");
    else if (newUser.activo == 0) {
      return res.status(403).send("Usuario no activo");
    }

    const jwtConstructor = new SignJWT({
      id: newUser.id,
      email,
      role: newUser.rol,
      activo: newUser.activo,
    });

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(encoder.encode(process.env.JWT_SECRET));

    return res.send({ jwt });
  } catch (e) {
    console.log(e.message);
  }
};

controller.deleteUser = async (req, res) => {
  // const { authorization } = req.headers;

  // if (!authorization) return res.sendStatus(401);
  // const token = authorization.split(" ")[1];

  try {
    // const encoder = new TextEncoder();

    // const { payload } = await jwtVerify(
    //   token,
    //   encoder.encode(process.env.JWT_SECRET)
    // );

    // if (!payload.role)
    //   return res.status(409).send("no tiene permiso de administrador");

    const user = await dao.getUserById(req.params.id);

    if (user.length <= 0) return res.status(404).send("el usuario no existe");

    await dao.deleteUser(req.params.id);

    return res.send(`El usuario con id ${req.params.id} eliminado`).status(200);
  } catch (e) {
    console.log(e.message);
  }
};

// Controlador para modificar un usuario por su id
controller.updateUser = async (req, res) => {
  // const { authorization } = req.headers;
  // // Si no existe el token enviamos un 401 (unauthorized)
  // if (!authorization) return res.sendStatus(401);

  try {
    // Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
    if (Object.entries(req.body).length === 0)
      return res.status(400).send("Error al recibir el body");
    // Actualizamos el usuario
    await dao.updateUser(req.params.id, req.body);
    // Devolvemos la respuesta
    return res.send(`Usuario con id ${req.params.id} modificado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getCountUser = async (req, res) => {
  const {} = req.body;
  try {
    const users = await dao.getCountUser();

    if (users.length <= 0) return res.status(404).send("usuarios no existe");

    return res.send(users);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.addContact = async (req, res) => {
  const { nombre, email, descripcion, telefono, apellidos } = req.body;
  if (!nombre || !email || !descripcion)
    return res.status(400).send("Error al recibir el body");

  try {
    const addContact = await dao.addContact(req.body);
    if (addContact) {
      await transporter.sendMail({
        from: '"Peticion Web GSP" <almartin.tpv@gmail.com>', // sender address
        to: `<${email}>`, // list of receivers
        subject: `Peticion del Cliente ${nombre}`, // Subject line
        html: `
        <h3>Nom: ${nombre}<h3>
        <h3>Prenom: ${apellidos}<h3>
        <h3>email: ${email}<h3>
        <h3>tel:  ${telefono}<h3>
        <h1>Descripcion: ${descripcion}</h1>`,
      });
      return res.send(`Formulario Registrado`);
    }
  } catch (e) {
    console.log(e.message);
  }
};

controller.getCountContact = async (req, res) => {
  const {} = req.body;
  try {
    const formContact = await dao.getCountContact();

    if (formContact.length <= 0)
      return res.status(404).send("Formularios no existe");

    return res.send(formContact);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getAllContact = async (req, res) => {
  const {} = req.body;
  try {
    const formContact = await dao.getAllContact();

    if (formContact.length <= 0)
      return res.status(404).send("Formularios no existe");

    return res.send(formContact);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.deleteContactById = async (req, res) => {
  const { id } = req.body;
  try {
    const formulario = await dao.deleteContactById(id);

    if (formulario.length <= 0)
      return res.status(404).send("presupuesto no existe");

    return res.send(`formulario ${id} eliminado`).status(200);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = controller;

// export default controller;
