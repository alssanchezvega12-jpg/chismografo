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

// ✏️ Mostrar usuarios para editar
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
          <td>${u.nombre}</td>
          <td>${u.edad}</td>
          <td>${u.color}</td>
          <td>${u.gusta}</td>
          <td><button onclick="editarUsuario('${u._id}','${u.nombre}','${u.edad}','${u.color}','${u.gusta}')">✏️ Editar</button></td>
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

// Función para llenar el formulario con los datos seleccionados
function editarUsuario(id, nombre, edad, color, gusta) {
  document.getElementById('nombre').value = nombre;
  document.getElementById('edad').value = edad;
  document.getElementById('colorFavorito').value = color;
  document.getElementById('quienLeGusta').value = gusta;

  // Guardamos el ID en un atributo oculto
  document.getElementById('chismeForm').setAttribute('data-id', id);
}

// Cuando vuelves a presionar Actualizar, se manda el PUT
async function guardarCambios() {
  const id = document.getElementById('chismeForm').getAttribute('data-id');
  const actualizado = {
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
    color: document.getElementById('colorFavorito').value,
    gusta: document.getElementById('quienLeGusta').value
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


// 🗑️ Eliminar usuario
document.getElementById('btnEliminar').addEventListener('click', async () => {
  const id = prompt("Escribe el ID del usuario a eliminar:");
  try {
    const res = await fetch(`https://chismografo-17nu.onrender.com/usuarios/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      resultado.innerHTML = `🗑️ Usuario con ID ${id} fue eliminado correctamente`;
      document.getElementById('chismeForm').reset();
    } else {
      resultado.innerHTML = '❌ Error al eliminar';
    }
  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error de conexión';
  }
});

// Guardar cambios (PUT)
document.getElementById('btnGuardarCambios').addEventListener('click', async () => {
  const id = document.getElementById('chismeForm').getAttribute('data-id');
  const actualizado = {
    nombre: document.getElementById('nombre').value,
    edad: document.getElementById('edad').value,
    color: document.getElementById('colorFavorito').value,
    gusta: document.getElementById('quienLeGusta').value
  };

  try {
    const res = await fetch(`https://chismografo-17nu.onrender.com/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    });
    if (res.ok) {
      resultado.innerHTML = `🔄 ${actualizado.nombre} fue actualizado correctamente 🎉`;
      document.getElementById('chismeForm').reset();
      document.getElementById('chismeForm').removeAttribute('data-id');
    } else {
      resultado.innerHTML = '❌ Error al actualizar';
    }
  } catch (err) {
    console.error(err);
    resultado.innerHTML = '❌ Error de conexión';
  }
});

