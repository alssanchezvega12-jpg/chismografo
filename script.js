const form = document.getElementById('chismeForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevoUsuario = {
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
    color: document.getElementById('colorFavorito').value,
    gusta: document.getElementById('quienLeGusta').value
  };

  try {
    // 🔧 Usa la URL completa del backend
    const res = await fetch('http://localhost:5000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });

    if (res.ok) {
      alert(`💾 ${nuevoUsuario.nombre} fue registrado correctamente 🎉`);
      form.reset();
    } else {
      alert('❌ Error al guardar');
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error de conexión');
  }
});
