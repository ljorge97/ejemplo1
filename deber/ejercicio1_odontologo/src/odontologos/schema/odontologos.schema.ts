import mongoose from 'mongoose';

export const OdontologosSchema = new mongoose.Schema({
  Cedula: { type: String, require: true },
  Nombre: { type: String, require: true },
  Apellido: { type: String, require: true },
  FechaNacimiento: { type: String, require: true },
  Especialidad: { type: String, require: true },
},{
    timestamps:true
});

OdontologosSchema.index({Cedula:1},{unique:true});
OdontologosSchema.index({Especialidad:1},{unique:true});

