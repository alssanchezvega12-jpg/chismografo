const resultado = document.getElementById('resultado');

// ➕ Crear usuario
document.getElementById('btnCrear').addEventListener('click', async () => {
  const nuevoUsuario = {
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
    color: document.getElementById('colorFavorito').value,
    gusta: document.getElementById('quienLeGusta').value
  };

  try {
    const res = await fetch('https://chismografo-17nu.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });

    if (res.ok) {
      resultado.innerHTML = `💾 ${nuevoUsuario.nombre} fue registrado correctamente 🎉`;
      document.getElementById('chismeForm').reset();
    } else {
      resultado.innerHTML = '❌ Error al guardar';
    }
  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error de conexión';
  }
});
