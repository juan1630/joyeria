const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido paterno es requerido"],
      trim: true,
    },
    apellidoMaterno: { type: String, trim: true },
    password: {
      type: String,
      required: [true, "La constrasenia es requerida"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "El role es requerido"],
      role: "user",
      isActive: true,
    },
    allowMails: { type: Boolean, required: true, isActive: true },
    email: {
      type: String,
      required: [true, "Correo es requerido"],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = model("modelUsers", userSchema);
