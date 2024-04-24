const mysql2 = require('mysql2');
const dotenv = require('dotenv');

//Configura DotEnv
dotenv.config();

// Crear conexión a la base de datos MySQL
const connection = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para insertar un nuevo usuario en la base de datos MySQL
async function registrarUsuario(nombre, email, password) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
            [nombre, email, password],
            (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log('Usuario insertado correctamente');
                resolve();
            }
        });
    });
}

// Función para obtener un usuario por su nombre de usuario
async function obtenerUsuarioPorNombre(nombre) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM usuarios WHERE nombre = ?',
            [nombre],
            (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

// Función para obtener un usuario por su ID
async function getUserById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

//Funcion para optener todos los productos de la base de datos 
async function obtenerTodos(){
    return new Promise ((resolve, reject) => {
        connection.query('SELECT * FROM productos',
            (err, results) => {
                if (err) {
                    console.error('Error al obtener los productos:', err.message);
                    reject(err);
                } else {
                   resolve(results);
                }
            });
       // db.end();  //Cierra la conexión de la base de datos
    });
}

//Funcion para obtener un producto por su ID
async function obtenerPorId(id){
    return new Promise ((resolve, reject) => {
        connection.query(
            'SELECT * FROM productos WHERE id = ?',
            [id],
            (err, results) => {
                if (err) {
                    console.error('Error al obtener los productos por id', err.message);
                    reject(err);
                } else {
                
                        resolve(results[0]);
                  console.log(resolve);
                }
            });
       // db.end(); //cierra la conexión con la base de datos.
    });
}

//connection.end();

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    getUserById,
    obtenerTodos,
    obtenerPorId
};