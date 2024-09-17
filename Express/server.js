const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send("¡Hola! Este es mi primer servidor Express");
});

//ESCUCHAR EN EL PUERTO 3000

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



