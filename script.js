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
          <th>🆔 ID</th>
          <th>👤 Nombre</th>
          <th>🎂 Edad</th>
          <th>🎨 Color Favorito</th>
          <th>💖 Le gusta</th>
        </tr>
    `;
    datos.forEach(u => {
      tabla += `
        <tr>
          <td>${u._id}</td>
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

// ✏️ Mostrar usuarios para editar con botón Guardar
document.getElementById('btnActualizar').addEventListener('click', async () => {
  try {
    const res = await fetch('https://chismografo-17nu.onrender.com/usuarios');
    const datos = await res.json();

    let tabla = `
      <h3>✏️ Selecciona un usuario para editar:</h3>
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
        <tr style="background-color: lightcoral;">
          <th>👤 Nombre</th>
          <th>🎂 Edad</th>
          <th>🎨 Color Favorito</th>
          <th>💖 Le gusta</th>
          <th>⚙️ Acción</th>
        </tr>
    `;
    datos.forEach(u => {
      tabla += `
        <tr>
          <td><input type="text" id="nombre-${u._id}" value="${u.nombre}"></td>
          <td><input type="number" id="edad-${u._id}" value="${u.edad}"></td>
          <td><input type="text" id="color-${u._id}" value="${u.color}"></td>
          <td><input type="text" id="gusta-${u._id}" value="${u.gusta}"></td>
          <td>
            <button onclick="guardarCambiosFila('${u._id}')">💾 Guardar cambios</button>
          </td>
        </tr>
      `;
    });
    tabla += `</table>`;
    resultado.innerHTML = tabla;

  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error al cargar usuarios';
  }
});

// Guardar cambios directamente desde la fila
async function guardarCambiosFila(id) {
  const actualizado = {
    nombre: document.getElementById(`nombre-${id}`).value,
    edad: document.getElementById(`edad-${id}`).value,
    color: document.getElementById(`color-${id}`).value,
    gusta: document.getElementById(`gusta-${id}`).value
  };

  try {
    const res = await fetch(`https://chismografo-17nu.onrender.com/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    });
    if (res.ok) {
      resultado.innerHTML = `🔄 ${actualizado.nombre} fue actualizado correctamente 🎉`;
    } else {
      resultado.innerHTML = '❌ Error al actualizar';
    }
  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error de conexión';
  }
}

function eliminarUsuario() {
  const nombre = prompt("Escribe el nombre del usuario a eliminar:");
  if (nombre) {
    fetch(`/usuarios/${nombre}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => alert(data.mensaje))
      .catch(() => alert("Error al eliminar"));
  }
}
