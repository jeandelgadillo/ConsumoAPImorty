// URL de la API pública de Rick and Morty
const API_URL = 'https://rickandmortyapi.com/api/character';

// Función asíncrona para consumir la API
async function consumirAPI() {
    try {
        // Hacemos la petición a la API
        const respuesta = await fetch(API_URL);
        
        // Convertimos la respuesta a formato JSON
        const datos = await respuesta.json();
        
        // Obtenemos los primeros 12 personajes para no saturar la pantalla
        const personajes = datos.results.slice(0, 12);
        
        // Llamamos a la función que dibuja las tarjetas en el HTML
        renderizarPersonajes(personajes);
    } catch (error) {
        console.error('Error al consumir la API:', error);
        document.getElementById('contenedor-personajes').innerHTML = '<p>Error al cargar los datos.</p>';
    }
}

// Función para inyectar los datos en el HTML
function renderizarPersonajes(personajes) {
    const contenedor = document.getElementById('contenedor-personajes');
    
    // Limpiamos el contenedor antes de inyectar
    contenedor.innerHTML = '';

    // Recorremos cada personaje obtenido de la API
    personajes.forEach(personaje => {
        
        // Determinamos la clase CSS según el estado de vida
        let claseEstado = '';
        if(personaje.status === 'Alive') claseEstado = 'vivo';
        else if(personaje.status === 'Dead') claseEstado = 'muerto';
        else claseEstado = 'desconocido';

        // Creamos la estructura HTML de la tarjeta
        const tarjetaHTML = `
            <div class="tarjeta">
                <img src="${personaje.image}" alt="Imagen de ${personaje.name}">
                <h3>${personaje.name}</h3>
                <p><strong>Especie:</strong> ${personaje.species}</p>
                <p><strong>Origen:</strong> ${personaje.origin.name}</p>
                <span class="estado ${claseEstado}">${personaje.status}</span>
            </div>
        `;
        
        // Agregamos la tarjeta al contenedor principal
        contenedor.innerHTML += tarjetaHTML;
    });
}

// Ejecutamos la función al cargar el archivo
consumirAPI();
