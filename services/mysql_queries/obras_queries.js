import db from "../mysql.js";

const obrasQueries = {};

obrasQueries.getAllObras = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT obras.id, obras.nombre, obras.imagen, JSON_ARRAYAGG(imagenesobras.path) as imagenes FROM obras join imagenesobras on imagenesobras.obra = obras.id group by obras.id",
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

obrasQueries.getCountObras = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT count(*) as obras FROM obras ",
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

export default obrasQueries;
