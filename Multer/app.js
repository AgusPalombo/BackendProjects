const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configurar almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Convertir el nombre del archivo a minúsculas
        const fileName = file.originalname.toLowerCase();
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se cargó ningún archivo');
    }
    res.send(`Archivo cargado: ${req.file.filename}`);
});

// Crear el directorio de carga si no existe
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Servir el archivo HTML desde la carpeta 'views'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'upload.html'));
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
