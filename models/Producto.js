const { Schema, model } = require('mongoose');

let productoSchema = new Schema({
    nombreDelPan: { type: String, required: false },
    saborDePan: { type: String, required: false },
    cantidadPanes: { type: Number, requird: false },
    estadoVenta: { type: Boolean, default: true },
    // ingredientes: [nombreIngrediente]
    // ingredientes: {
    //     type: Schema.Types.ObjectId,
    //     ref: "IngredientesGlobales"
    // }
    fechaIngresoProducto: { type: Date, default: Date.now },
});

module.exports = model('productos', productoSchema);