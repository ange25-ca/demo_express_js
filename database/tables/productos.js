const conexion = require('../db');

//Funcion para optener todos los productos de la base de datos 
async function obtenerTodos(){
    const db = conexion.crearConexion();
    return new Promise ((resolve, reject) => {
        db.query(
            'SELECT * FROM productos',
            (err, results) => {
                if (err) {
                    console.error('Error al obtener los productos:', err.message);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        db.end();
    });
}

//Funcion para obtener un producto por su ID
async function obtenerPorId(id){
    const db = conexion.crearConexion();
    return new Promise ((resolve, reject) => {
        db.query(
            'SELECT * FROM productos WHERE id = ?',
            [id],
            (err, results) => {
                if (err) {
                    console.error('Error al obtener los productos por id', err.message);
                    reject(err);
                } else {
                    if(results.length > 0){
                        resolve(results[0]);
                    }
                    resolve(null);
                }
            });
        db.end();
    });
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
};