require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

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

// ➕ Crear usuario
app.post('/usuarios', async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar' });
  }
});

// 👁️ Leer usuarios
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// ✏️ Actualizar usuario por ID
app.put('/usuarios/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // devuelve el documento ya actualizado
    );
    if (!actualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// 🗑️ Eliminar usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado ✅' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
