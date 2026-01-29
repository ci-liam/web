// Cerrar el overlay y volver a la página principal
function closeWorkshop() {
    window.location.href = 'index.html';
}

// Manejo de audio
let currentAudio = null;
let currentButton = null;

document.querySelectorAll('.btn-audio').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const audioFile = this.getAttribute('data-audio');
        const audioPlayer = document.getElementById('audio-player');
        
        // Si hay un audio reproduciéndose
        if (currentAudio && !currentAudio.paused) {
            // Si es el mismo audio, pausar
            if (currentButton === this) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                this.textContent = '▶ Listen';
                this.classList.remove('playing');
                currentAudio = null;
                currentButton = null;
                return;
            } else {
                // Si es otro audio, detener el anterior
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentButton) {
                    currentButton.textContent = '▶ Listen';
                    currentButton.classList.remove('playing');
                }
            }
        }
        
        // Reproducir nuevo audio
        audioPlayer.src = `audio/${audioFile}`;
        audioPlayer.play();
        this.textContent = '⏸ Pause';
        this.classList.add('playing');
        currentAudio = audioPlayer;
        currentButton = this;
        
        // Cuando termine el audio
        audioPlayer.onended = () => {
            this.textContent = '▶ Listen';
            this.classList.remove('playing');
            currentAudio = null;
            currentButton = null;
        };
    });
});

// Manejo de modal de tejidos
document.querySelectorAll('.btn-textile').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const textileFile = this.getAttribute('data-textile');
        openTextileModal(`images/textiles/${textileFile}`);
    });
});

function openTextileModal(imageSrc) {
    const modal = document.getElementById('textile-modal');
    const image = document.getElementById('textile-image');
    
    image.src = imageSrc;
    modal.style.display = 'flex';
    
    // Prevenir scroll del body
    document.getElementById('workshop-overlay').style.overflow = 'hidden';
}

function closeTextileModal() {
    const modal = document.getElementById('textile-modal');
    modal.style.display = 'none';
    
    // Restaurar scroll
    document.getElementById('workshop-overlay').style.overflow = 'auto';
}

// Cerrar modal al hacer click fuera de la imagen
document.getElementById('textile-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeTextileModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const textileModal = document.getElementById('textile-modal');
        if (textileModal.style.display === 'flex') {
            closeTextileModal();
        }
    }
});

// Fade-in suave al cargar
window.addEventListener('load', function() {
    document.getElementById('workshop-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('workshop-overlay').style.transition = 'opacity 0.5s ease';
        document.getElementById('workshop-overlay').style.opacity = '1';
    }, 100);
});
