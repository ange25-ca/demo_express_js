// routes/usuariosRoutes.js

const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para el catálogo de productos
router.get('/',async (req, res) => {
    const productos = await productosController.obtenerTodos();
    res.render('catalogo', { title: 'Catálogo de Productos', productos });
});

module.exports = router;
