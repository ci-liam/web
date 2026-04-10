// Cierre del overlay principal
function closeWorkshop() {
    const overlay = document.getElementById('workshop-overlay');
    overlay.style.display = 'none';
}

// Escuchamos los clics en los botones de imágenes (Tejido, Escritura, Código)
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-textile');
    if (btn) {
        const path = btn.getAttribute('data-textile');
        console.log("Intentando abrir:", path); // Para debug en consola
        openTextileModal(path);
    }
});

function openTextileModal(src) {
    const modal = document.getElementById('textile-modal');
    const img = document.getElementById('textile-image');
    img.src = src;
    modal.style.display = 'flex';
}

function closeTextileModal() {
    document.getElementById('textile-modal').style.display = 'none';
}

// Manejo de Audio
let activeAudio = null;
let activeBtn = null;

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-audio');
    if (btn) {
        const file = btn.getAttribute('data-audio');
        const player = document.getElementById('audio-player');

        if (activeAudio && !activeAudio.paused) {
            activeAudio.pause();
            activeBtn.textContent = '▶ Escuchar';
            if (activeBtn === btn) { activeAudio = null; return; }
        }

        player.src = `audio/${file}`;
        player.play();
        btn.textContent = '⏸ Pausa';
        activeAudio = player;
        activeBtn = btn;

        player.onended = () => { btn.textContent = '▶ Escuchar'; };
    }
});
