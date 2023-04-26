// import db from "../mysql.js";

const db = require("../mysql.js")

const productQueries = {};



productQueries.getProducts = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT productos.* ,JSON_ARRAYAGG(imagenproducto.path) as imagenes FROM productos LEFT JOIN imagenproducto on productos.id = imagenproducto.producto GROUP BY productos.id",
      [],
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};



productQueries.getProductsByCategory = async (categoria) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por el id.
  let conn = null;
  try {
    conn = await db.createConnection();
    
    return await db.query(
      "SELECT  productos.* ,JSON_ARRAYAGG(imagenproducto.path) as imagenes FROM productos LEFT JOIN imagenproducto on productos.id = imagenproducto.producto WHERE productos.categoria = ? GROUP BY productos.id",
      categoria,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// productQueries.addImage = async (imageData) => {
//   // Conectamos con la base de datos y añadimos el usuario.
//   let conn = null;
//   try {
//     conn = await db.createConnection();
//     // Creamos un objeto con los datos de la imagen a guardar en la base de datos.
//     // Usamos la libreria momentjs para registrar la fecha actual
//     let imageObj = {
//       path: imageData.path,
//       producto: imageData.idProducto,
//     };
//     return await db.query("INSERT INTO `imagenproducto` (`id`,`producto`, `path`) VALUES (NULL,'?',?)", [imageData.idProducto,imageData.path], "insert", conn);
//   } catch (e) {
//     throw new Error(e);
//   } finally {
//     conn && (await conn.end());
//   }
// };

productQueries.addImage = async (imageData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos de la imagen a guardar en la base de datos.
    // Usamos la libreria momentjs para registrar la fecha actual
    let imageObj = {
      id:null,
      producto: imageData.idProducto,
      path: imageData.path,
    };
    return await db.query("INSERT INTO `imagenproducto` SET ?", imageObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

productQueries.getImageById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por el id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM imagen WHERE producto = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

productQueries.getProductByRef = async (ref) => {
  let conn = null;
  console.log(ref);
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM productos where ref = ?",
      ref,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

productQueries.addProduct = async (productData, image) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    let productObj = {
      nombre: productData.nombre,
      foto: image
    };
    return await db.query(
      "INSERT INTO productos SET ? ",
      productObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

module.exports = productQueries;

// export default productQueries;
