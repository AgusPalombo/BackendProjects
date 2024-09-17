const express = require('express');
const router = express.Router();

//Ruta Para obtener todos los productos
router.get('/', (req,res)=>{
    res.send('Lista de productos');
});

//Ruta para obtener un producto por ID
router.get('/:id', (req,res)=>{
    const productId = req.params.id;
    res.send(`Producto con ID: ${productId}`);
});

//Ruta para crear un nuevo producto
router.post('/', (req,res)=>{
    const newProduct = req.body;
    res.send(`Producto creado: ${JSON.stringify(newProduct)}`);
});

module.exports = router;