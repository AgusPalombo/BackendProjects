const express = require('express');
const app = express();

//Middleware para interpretar el cuerpo de la solicitud en formato JSON
app.use(express.json());


//Ruta GET raiz
app.get('/', (req,res)=>{
    res.status(200).json({message: 'Bienvenido al servidor Express!'});
});


//Ruta GET de usuarios
app.get('/users', (req,res)=>{
    res.status(200).json({users:['Juan','Carlos','Maria']});
});

//Ruta POST para crear un uusuario
app.post('/users', (req,res)=>{
    const userData = req.body;
    res.status(201).json({message: 'Usuario creado', user: userData});
});

//RUTA UPDATE DE UN USUARIO POR ID

app.put('/users/:id',(req,res)=>{
    const userId = req.params.id;
    const updatedUser = req.body;
    res.status(200).json({message: `Usuario ${userId} actualizado`, user: updatedUser});
});

//RUTA DELETE DE UN USUARIO POR ID

app.delete('/users/:id', (req,res)=>{
    const userId = req.params.id;
    res.status(200).json({message: `Usuario ${userId} eliminado`});
});


// El servidor escucha en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});