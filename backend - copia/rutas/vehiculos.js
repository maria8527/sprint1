const { Router } = require("express");
const router = Router();
const mysqlconnection = require('../bd');

//Metodo get para obtener los datos de los vehiculos
router.get("/", async (req, res) => {
  try{
    const result = await mysqlconnection.query('SELECT * FROM vehiculo');
    return res.status(200).json(result[0]); 
  }catch(err){
    console.log(err);
    res.status(500).json({error: "internal server error"}); 
  }
});


//Metodo post para insertar datos en la base de datos en la tabla de vehiculo
router.post("/vehiculos", (req, res) => {
  try {
    const { n_placa, modelo, fecha_v_seguro, fecha_v_tecnomecanica } = req.body;
    const result =
      mysqlconnection.query(`INSERT INTO vehiculo (n_placa, modelo, fecha_v_seguro, fecha_v_tecnomecanica)
   VALUES('${n_placa}', '${modelo}', '${fecha_v_seguro}', '${fecha_v_tecnomecanica}');
   `);
    res.status(200).json("se enviaron los datos");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//Metodo put para actualizar todos los datos de la tabla vehiculo
router.put("/vehi2/:id", (req, res) => {
  const { id } = req.params;
  const { modelo, fecha_v_seguro, fecha_v_tecnomecanica } = req.body;
  try {
    res.status(200).send("Se actualizo correctamente");
    mysqlconnection.query(
      `UPDATE vehiculo SET modelo = "${modelo}", fecha_v_seguro  = "${fecha_v_seguro}", fecha_v_tecnomecanica = "${fecha_v_tecnomecanica}" WHERE n_placa = "${id}";`
    );
  } catch {
    res.status(204);
  }
});

//Metodo delete para eliminar un objeto
router.delete("/vehiculo1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await mysqlconnection.query(
      `DELETE FROM vehiculo WHERE n_placa = "${id}";`
    );
    return res.status(200).json(`Registro eliminado`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//Metodo para agregar una nueva marca
router.post("/marca", (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    const result =
      mysqlconnection.query(`INSERT INTO marca (nombre, estado, descripcion)
   VALUES( '${nombre}', '${estado}', '${descripcion}');
   `);
    res.status(200).json("se enviaron los datos");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//Metodo para agregar una nueva linea
router.post("/linea", (req, res) => {
  try {
    const { estado, descripcion } = req.body;
    const result =
      mysqlconnection.query(`INSERT INTO linea_vehiculo (estado, descripcion)
   VALUES('${estado}', '${descripcion}');
   `);
    res.status(200).json("se enviaron los datos");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//Metodo get para obtener el modelo maximo y minimo de la tabla vehiculo
router.get("/modelo1", async (req, res) => {
  try{
    const result = await mysqlconnection.query('SELECT MIN(modelo), MAX(modelo) FROM vehiculo;');
    return res.status(200).json(result); 
  }catch(err){
    console.log(err);
    res.status(500).json({error: "internal server error"}); 
  }
});

// // //metodo get.consultar todos los vehículos por un rango de fechas sobre el campo FECHA_VEN_SEGURO
router.get("fecha/:fecha", async (req, res) => {
  const {fecha} = req.params;
  try{
    const [rows] = await mysqlconnection.query(`SELECT * FROM vehiculo WHERE fecha_v_seguro = (("${fecha}"));`);
    if(!rows[0]){
      res.status(204).send("sin datos");
    } else {
      return res.status(200).json(rows[0]);
    }
  }catch(err){
    res.status(500);
    console.log(err)
  }
});

// //Metodo get. consultar todos los vehículos por un rango de modelos por el campo modelo.
router.get("/modelo/:modelo", async (req, res) => {
  const {modelo} = req.params;
  try{
    const[rows]= await mysqlconnection.query(`SELECT * FROM vehiculo WHERE modelo = (("${modelo}"));`);
    if(!rows[0]){
      res.status(204).send("sin datos");
    }else{
      return res.status(200).json(rows[0]);
    }
  }catch(err){
    res.status(500);
    console.log(err)
  }
});


// // sumar modelos
router.get("/sumodelo", async (req, res) => {
  try{
    const result = await mysqlconnection.query('SELECT SUM(modelo) FROM vehiculo;');
    return res.status(200).json(result[0]); 
  }catch(err){
    console.log(err);
    res.status(500).json({error: "internal server error"}); 
  };
});

//Promediar modelos
router.get("/promodelos", async (req, res) => {
  try{
    const result = await mysqlconnection.query('SELECT AVG(modelo) FROM vehiculo;');
    return res.status(200).json(result[0]); 
  }catch(err){
    console.log(err);
    res.status(500).json({error: "internal server error"}); 
  };
});

//cuántos registros están activos e inactivos de la tabla donde se almacenan las líneas.
router.get("/cuanto", async (req, res) => {
  try{
    const result = await mysqlconnection.query('SELECT COUNT(estado) FROM linea_vehiculo;');
    return res.status(200).json(result[0]); 
  }catch(err){
    console.log(err);
    res.status(500).json({error: "internal server error"}); 
  };
});



module.exports = router;
