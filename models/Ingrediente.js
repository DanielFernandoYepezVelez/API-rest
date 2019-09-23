const { Schema, model } = require('mongoose');

// FORMA #2
// const mongoose = require('mongoose');
// let Schema = mongoose.Schema;

let ingredienteSchema = new Schema({
    nombreIngrediente: { type: String, required: true },
    tipoMedidaIngredienteSolido: { type: String, default: 'Kilogramo' },
    valorTipoMedidaIngredienteSolido: { type: Number, default: 0 },
    tipoMedidaIngredienteLiquido: { type: String, default: 'Liquido' },
    valorTipoMedidaIngredienteLiquido: { type: Number, default: 0 },
    cantidadUnitariaIngrediente: { type: Number, default: 0 },
    fechaIngresoIngrediente: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = model('ingredientes', ingredienteSchema);

// FORMA #2
// module.exports = mongoose.model('IngredientesGenerales', ingredientesGlobalesSchema);