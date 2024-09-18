const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido']
    },
    phone:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    dni:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 12
    },
    file:{
        type: String,
        required: true
    }
});

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;