const mongoose = require("mongoose");
//Models
const msgSchema = new mongoose.Schema({
  author: {
    id: { type: String, required: true }, //Email
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true }, //alias de usuario
    avatar: { type: String, required: true }, //url de avatar
  },
  text: { type: String, required: true, min: 1 },
});

const mensaje = mongoose.model("messages", msgSchema);

module.exports = mensaje;
