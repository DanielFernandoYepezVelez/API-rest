const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, unique: true },
    contrasena: { type: String, required: true },
    // confirmarContrasena: { type: String, required: true }
    date: { type: Date, default: Date.now }
});

/* NOTA!!!!!Estos dos métodos son instancias de la clase UserSchema,
más no del modelo completo User */
/* Métodos para encriptar la contraseña,
bcrypt puede tomar su tiempo, por tal motivo es Asíncrono */
UserSchema.methods.encryptPassword = async(contrasena) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(contrasena, salt);
    return hash;
};

/* Comparar las contraseñas cifradas 
no puedo utilizar el arrow function por que 
debo de acceder a las propiedades del modelo,
a través de la palabra this*/
UserSchema.methods.matchPassword = async function(contrasena) {
    return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = model('User', UserSchema);