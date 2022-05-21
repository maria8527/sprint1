

CREATE DATABASE semillero;


 USE semillero;
  CREATE TABLE marca (
     id INT UNSIGNED AUTO_INCREMENT,
     nombre VARCHAR(50) NOT NULL,
     estado ENUM('S', 'N') NOT NULL,
     descripcion VARCHAR(500) NOT NULL,
     CONSTRAINT `id_marca` PRIMARY KEY(id)
     );


 CREATE TABLE linea_vehiculo (
     id INT UNSIGNED AUTO_INCREMENT,
     estado ENUM('S', 'N') NOT NULL,
     descripcion VARCHAR(500) NOT NULL,
     CONSTRAINT `id_linea` PRIMARY KEY(id)
     );


 CREATE TABLE vehiculo (
      n_placa VARCHAR(11) NOT NULL,
      modelo VARCHAR(50) NOT NULL,
      fecha_v_seguro DATE,
      fecha_v_tecnomecanica DATE,
     PRIMARY KEY(n_placa)
     );

 SHOW TABLES;
    
    INSERT INTO vehiculo(
        n_placa, modelo 
    )
    VALUES ('agt-980','2021')

    UPDATE vehiculo SET modelo = "2022", fecha_v_seguro  = "2030-09-20", fecha_v_tecnomecanica = "2030-08-20" WHERE n_placa = "ADF-72D";

    SELECT MIN(modelo), MAX(modelo) FROM vehiculo; 

    SELECT * FROM vehiculo WHERE ((fecha_v_seguro = "2024-05-27"));
     SELECT * FROM vehiculo WHERE ((modelo = "2019"));

     SELECT SUM(modelo) FROM vehiculo;

     SELECT AVG(modelo) FROM vehiculo;

     SELECT COUNT(estado) FROM linea_vehiculo;

     SELECT COUNT(estado) FROM linea_vehiculo WHERE estado = 'S' 
      AND
     WHERE estado = 'N';


     SELECT 
     vehiculo.n_placa,
     vehiculo.modelo,
     linea_vehiculo.descripcion,
     marca.descripcion
     FROM((
         linea_vehiculo
         INNER JOIN vehiculo 
         ON vehiculo.linea_vehiculo = linea_vehiculo.id_linea
     ) INNER JOIN marca 
     ON marca.nombre = nombre_marca.linea_vehiculo
     );
     


