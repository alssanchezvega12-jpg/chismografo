// Contenedor donde se mostrarán los usuarios
const contenedor = document.createElement('div');
contenedor.style.textAlign = 'center';
document.body.appendChild(contenedor);

// Función para mostrar usuarios
async function mostrarUsuarios() {
  try {
    const res = await fetch('http://localhost:5000/usuarios');
    const usuarios = await res.json();

    contenedor.innerHTML = ''; // Limpia el contenido anterior

    if (usuarios.length === 0) {
      contenedor.innerHTML = '<p>😕 No hay usuarios registrados todavía.</p>';
      return;
    }

    usuarios.forEach(u => {
      const card = document.createElement('div');
      card.style.background = '#fff';
      card.style.borderRadius = '10px';
      card.style.padding = '10px';
      card.style.margin = '10px auto';
      card.style.width = '250px';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      card.innerHTML = `
        <p><strong>👤 Nombre:</strong> ${u.nombre}</p>
        <p><strong>🎂 Edad:</strong> ${u.edad}</p>
        <p><strong>🎨 Color favorito:</strong> ${u.color}</p>
        <p><strong>💘 Le gusta:</strong> ${u.gusta}</p>
        <button class="btnEliminar" data-id="${u._id}">🗑️ Eliminar</button>
      `;
      contenedor.appendChild(card);
    });

    // Agregar funcionalidad al botón eliminar
    document.querySelectorAll('.btnEliminar').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        await fetch(`http://localhost:5000/usuarios/${id}`, { method: 'DELETE' });
        mostrarUsuarios(); // Actualiza la lista
      });
    });

  } catch (err) {
    console.error(err);
    contenedor.innerHTML = '<p>❌ Error al cargar usuarios.</p>';
  }
}

// Ejecutar al cargar la página
mostrarUsuarios();
