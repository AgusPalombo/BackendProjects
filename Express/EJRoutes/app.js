const express = require('express');
const app = express();
const userRouter = require('./routes/users');
const productsRouter = require('./routes/products');

//Middleware para manejar JSON
app.use(express.json());

//Montar el router de usuario
app.use('/users', userRouter);

// Montar el router de productos
app.use('/products', productsRouter);

//Escuchar en el puerto 3000
app.listen(3000,()=>{
    console.log("Servidor corriendo en http://localhost:3000");
})