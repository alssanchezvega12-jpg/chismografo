require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas usando variables de entorno
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(uri)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Definir modelo
const Usuario = mongoose.model('Usuario', new mongoose.Schema({
  nombre: String,
  edad: Number,
  color: String,
  gusta: String
}));

// Rutas CRUD
app.post('/usuarios', async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar' });
  }
});

app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado ✅' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});
