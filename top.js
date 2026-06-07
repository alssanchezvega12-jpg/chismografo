// Contenedor principal
const contenedor = document.createElement('div');
contenedor.style.textAlign = 'center';
document.body.appendChild(contenedor);

async function mostrarTopGuapos() {
  try {
    const res = await fetch('http://localhost:5000/usuarios');
    const usuarios = await res.json();

    contenedor.innerHTML = '';

    if (usuarios.length === 0) {
      contenedor.innerHTML = '<p>😕 No hay datos registrados todavía.</p>';
      return;
    }

    // Contar cuántas veces aparece cada nombre en "gusta"
    const conteo = {};
    usuarios.forEach(u => {
      const nombre = u.gusta.trim().toLowerCase();
      if (nombre) {
        conteo[nombre] = (conteo[nombre] || 0) + 1;
      }
    });

    // Ordenar por cantidad y tomar los 5 primeros
    const top = Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Mostrar resultados
    top.forEach(([nombre, cantidad], i) => {
      const card = document.createElement('div');
      card.style.background = '#fff';
      card.style.borderRadius = '10px';
      card.style.padding = '10px';
      card.style.margin = '10px auto';
      card.style.width = '250px';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      card.innerHTML = `
        <p><strong>💖 Puesto ${i + 1}:</strong> ${nombre}</p>
        <p>💬 ${cantidad} menciones</p>
      `;
      contenedor.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    contenedor.innerHTML = '<p>❌ Error al cargar el top.</p>';
  }
}

// Ejecutar al cargar la página
mostrarTopGuapos();
