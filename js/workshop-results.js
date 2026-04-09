// Manejo de audio
let currentAudio = null;
let currentButton = null;

document.querySelectorAll('.btn-audio').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const audioFile = this.getAttribute('data-audio');
        const audioPlayer = document.getElementById('audio-player');
        
        if (currentAudio && !currentAudio.paused) {
            if (currentButton === this) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                this.textContent = '▶ Listen';
                this.classList.remove('playing');
                currentAudio = null;
                currentButton = null;
                return;
            } else {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentButton) {
                    currentButton.textContent = '▶ Listen';
                    currentButton.classList.remove('playing');
                }
            }
        }
        
        audioPlayer.src = `audio/${audioFile}`;
        audioPlayer.play();
        this.textContent = '⏸ Pause';
        this.classList.add('playing');
        currentAudio = audioPlayer;
        currentButton = this;
        
        audioPlayer.onended = () => {
            this.textContent = '▶ Listen';
            this.classList.remove('playing');
            currentAudio = null;
            currentButton = null;
        };
    });
});

// Modal de tejidos
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
}

function closeTextileModal() {
    document.getElementById('textile-modal').style.display = 'none';
}

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTextileModal();
        closeWorkshop();
    }
});
