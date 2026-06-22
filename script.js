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

// 👁️ Leer usuarios
document.getElementById('btnLeer').addEventListener('click', async () => {
  try {
    const res = await fetch('https://chismografo-17nu.onrender.com/usuarios');
    const datos = await res.json();

    let tabla = `
      <h3>👥 Usuarios registrados:</h3>
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
        <tr style="background-color: pink;">
          <th>👤 Nombre</th>
          <th>🎂 Edad</th>
          <th>🎨 Color Favorito</th>
          <th>💖 Le gusta</th>
        </tr>
    `;
    datos.forEach(u => {
      tabla += `
        <tr>
          <td>${u.nombre}</td>
          <td>${u.edad}</td>
          <td>${u.color}</td>
          <td>${u.gusta}</td>
        </tr>
      `;
    });
    tabla += `</table>`;
    resultado.innerHTML = tabla;

  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error al leer usuarios';
  }
});

// ✏️ Actualizar usuario
document.getElementById('btnActualizar').addEventListener('click', async () => {
  const nombre = document.getElementById('nombre').value;
  const actualizado = {
    edad: document.getElementById('edad').value,
    color: document.getElementById('colorFavorito').value,
    gusta: document.getElementById('quienLeGusta').value
  };

  try {
    const res = await fetch(`https://chismografo-17nu.onrender.com/usuarios/${nombre}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    });
    if (res.ok) {
      resultado.innerHTML = `🔄 ${nombre} fue actualizado correctamente`;
    } else {
      resultado.innerHTML = '❌ Error al actualizar';
    }
  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error de conexión';
  }
});

// 🗑️ Eliminar usuario
document.getElementById('btnEliminar').addEventListener('click', async () => {
  const nombre = document.getElementById('nombre').value;
  try {
    const res = await fetch(`https://chismografo-17nu.onrender.com/usuarios/${nombre}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      resultado.innerHTML = `🗑️ ${nombre} fue eliminado correctamente`;
      document.getElementById('chismeForm').reset();
    } else {
      resultado.innerHTML = '❌ Error al eliminar';
    }
  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error de conexión';
  }
});
