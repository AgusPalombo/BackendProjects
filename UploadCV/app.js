const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const Resume = require('./models/resume');

const app = express();

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// Configurar Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'layout', // Nombre del archivo de diseño sin extensión
    layoutsDir: path.join(__dirname, 'views'), // Usar 'views' como el directorio de layouts
    partialsDir: path.join(__dirname, 'views'), // Usar 'views' como el directorio de parciales
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
}}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Conectar con MongoDB
mongoose.connect('mongodb://localhost:27017/curriculums', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error('Error al conectar a MongoDB', err));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// Router para manejar rutas relacionadas con currículums
const router = express.Router();

// Ruta para mostrar el formulario
router.get('/', (req, res) => {
    res.render('form');
});

// Ruta para manejar el envío del formulario
router.post('/submit', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No se ha subido ningún archivo.');
        }
        const { name, surname, email, phone, dni } = req.body;
        const file = req.file.filename;

        const resume = new Resume({ name, surname, email, phone, dni, file });
        await resume.save();

        res.render('success', { resume });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Ruta para obtener todos los currículums (prueba con Postman)
router.get('/resumes', async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.json(resumes);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use('/', router);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
