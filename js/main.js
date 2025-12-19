/* js/main.js */

// --- GESTIÓN DE MODALES (VENTANAS) ---
function openModal(id) { 
    document.getElementById(id).style.display = 'flex'; 
}

function closeModal(id) { 
    document.getElementById(id).style.display = 'none'; 
}

// Cerrar si se hace click fuera de la ventana
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = "none";
    }
}

// --- GESTIÓN DEL OVERLAY DE ARTE ---
// Estas funciones controlan el "Telón" azul, no el código artístico en sí.

function launchArt() {
    // 1. Cerramos el menú
    closeModal('modal-art');
    // 2. Mostramos el overlay
    document.getElementById('art-overlay').style.display = 'block';
    // 3. P5.js: Reactivamos el loop de dibujo
    loop(); 
}

function closeArt() {
    // 1. Ocultamos el overlay
    document.getElementById('art-overlay').style.display = 'none';
    // 2. P5.js: Pausamos el loop para ahorrar batería
    noLoop(); 
}
