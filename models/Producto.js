const { Schema, model } = require('mongoose');

let productoSchema = new Schema({
    nombreDelPan: { type: String, required: true },
    saborDePan: { type: String, required: true },
    cantidadPanes: { type: Number, requird: true },
    estadoVenta: { type: String },
    // ingredientes: [nombreIngrediente]
    // ingredientes: {
    //     type: Schema.Types.ObjectId,
    //     ref: "IngredientesGlobales"
    // }
    fechaIngresoProducto: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = model('productos', productoSchema);