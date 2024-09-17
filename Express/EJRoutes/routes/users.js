const express = require('express');
const router = express.Router();

//RUTA PARA OBTENER TODOS LOS USERS
router.get('/', (req,res)=>{
    res.send("Lista de usuarios");
})


//RUTA PARA OBTENER UN USUARIO POR ID
router.get('/:id', (req,res)=>{
    const userId = req.params.id;
    res.send(`Usuario con ID: ${userId}`);
});

//RUTA PARA CREAR UN NUEVO USUARIO
router.post('/', (req,res)=>{
    const newUser = req.body;
    res.send (`Usuario creado: ${JSON.stringify(newUser)}`);
});


module.exports = router;