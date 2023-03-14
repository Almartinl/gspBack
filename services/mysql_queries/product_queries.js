import db from "../mysql.js";

const productQueries = {};

productQueries.getProducts = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT productos.id, productos.nombre, productos.marca, productos.precio, productos.ref, productos.stock,productos.descripcion,productos.descripcioncorta,productos.detalles ,JSON_ARRAYAGG(imagen.path) as imagenes FROM productos LEFT JOIN imagen on productos.id = imagen.producto GROUP BY productos.id",
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

productQueries.getProductsById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por el id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT  productos.id, productos.nombre, productos.precio, productos.ref, productos.stock,productos.descripcion,productos.descripcioncorta,productos.detalles ,JSON_ARRAYAGG(imagen.path) as imagenes FROM productos JOIN imagen on productos.id = imagen.producto WHERE productos.id = ?",
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

productQueries.addImage = async (imageData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos de la imagen a guardar en la base de datos.
    // Usamos la libreria momentjs para registrar la fecha actual
    let imageObj = {
      path: imageData.path,
      producto: imageData.producto,
    };
    return await db.query("INSERT INTO imagen SET ?", imageObj, "insert", conn);
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

productQueries.addProduct = async (productData) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    let productObj = {
      nombre: productData.nombre,
      precio: productData.precio,
      ref: productData.ref,
      stock: productData.stock,
      marca: productData.marca,
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

export default productQueries;
