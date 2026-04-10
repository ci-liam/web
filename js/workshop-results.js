// Cierre del overlay principal
function closeWorkshop() {
    const overlay = document.getElementById('workshop-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.style.opacity = '1';
    }, 300);
}

// === MANEJO DE IMÁGENES (TEJIDO, ESCRITURA, CÓDIGO) ===
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-textile')) {
        e.stopPropagation();
        const imagePath = e.target.getAttribute('data-textile');
        if (imagePath) {
            openTextileModal(imagePath);
        }
    }
});

function openTextileModal(imageSrc) {
    const modal = document.getElementById('textile-modal');
    const image = document.getElementById('textile-image');
    
    // Mostramos un placeholder o cargamos la imagen
    image.src = imageSrc;
    modal.style.display = 'flex';
    
    // Bloqueamos el scroll del overlay del taller mientras el modal está abierto
    document.getElementById('workshop-overlay').style.overflow = 'hidden';
}

function closeTextileModal() {
    const modal = document.getElementById('textile-modal');
    modal.style.display = 'none';
    // Devolvemos el scroll
    document.getElementById('workshop-overlay').style.overflow = 'auto';
}

// === MANEJO DE AUDIO ===
let currentAudio = null;
let currentButton = null;

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-audio')) {
        e.stopPropagation();
        const btn = e.target;
        const audioFile = btn.getAttribute('data-audio');
        const audioPlayer = document.getElementById('audio-player');

        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentButton.textContent = '▶ Listen';
            currentButton.classList.remove('playing');
            if (currentButton === btn) {
                currentAudio = null;
                currentButton = null;
                return;
            }
        }

        audioPlayer.src = `audio/${audioFile}`;
        audioPlayer.play();
        btn.textContent = '⏸ Pause';
        btn.classList.add('playing');
        currentAudio = audioPlayer;
        currentButton = btn;

        audioPlayer.onended = () => {
            btn.textContent = '▶ Listen';
            btn.classList.remove('playing');
            currentAudio = null;
            currentButton = null;
        };
    }
});

// Cerrar modales con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTextileModal();
    }
});
