// Datos de las 5 participantes con rutas verificadas
const workshopData = {
    "ana-paula": {
        name: "Ana Paula",
        audio: "ana_paula.mp3",
        image: "images/textiles/ana_paula_tejido.jpg",
        viz: "images/viz_anapaula.jpg",
        writing: "images/es_anapaula.jpg"
    },
    "estefi": {
        name: "Estefi",
        audio: "estefi.mp3",
        image: "images/textiles/estefi_tejido.jpg",
        viz: "images/viz_estefi.jpg",
        writing: null // No tiene archivo de escritura
    },
    "etsx": {
        name: "Etsx",
        audio: null, // No hay audio disponible
        image: null, // No hay tejido disponible
        viz: "images/viz_etsx.jpg",
        writing: "images/es_etsx.jpg"
    },
    "dani": {
        name: "Dani",
        audio: "dani.mp3",
        image: "images/textiles/dani_tejido.jpg",
        viz: "images/viz_dani.jpg",
        writing: "images/cod_dani.jpg"
    },
    "fer": {
        name: "Fer",
        audio: null,
        image: "images/textiles/fer_tejido.jpg",
        viz: "images/viz_fer.jpg",
        writing: "images/es_fer.jpg" // O "images/cod_fer.jpg" según prefieras
    }
};

// Función para abrir el overlay (compatible con los IDs de tus botones en index.html)
function openWorkshop(id) {
    const data = workshopData[id];
    if (!data) return;

    const overlay = document.getElementById('workshop-overlay');
    const nameElement = document.getElementById('participant-name');
    if (nameElement) nameElement.textContent = data.name;
    
    // Referencias a los botones del overlay
    const btnTejido = document.querySelector('.btn-textile[data-type="image"]');
    const btnViz = document.querySelector('.btn-textile[data-type="viz"]');
    const btnWriting = document.querySelector('.btn-textile[data-type="writing"]');
    const btnAudio = document.querySelector('.btn-audio');

    // Lógica para mostrar/ocultar botones según disponibilidad
    if (btnTejido) {
        btnTejido.style.display = data.image ? 'inline-block' : 'none';
        if (data.image) btnTejido.setAttribute('data-textile', data.image);
    }

    if (btnViz) {
        btnViz.style.display = data.viz ? 'inline-block' : 'none';
        if (data.viz) btnViz.setAttribute('data-textile', data.viz);
    }

    if (btnWriting) {
        btnWriting.style.display = data.writing ? 'inline-block' : 'none';
        if (data.writing) btnWriting.setAttribute('data-textile', data.writing);
    }

    if (btnAudio) {
        btnAudio.style.display = data.audio ? 'inline-block' : 'none';
        if (data.audio) {
            btnAudio.setAttribute('data-audio', data.audio);
            btnAudio.textContent = '▶ Escuchar';
        }
    }

    overlay.style.display = 'flex';
}

// Cierre del overlay
function closeWorkshop() {
    const overlay = document.getElementById('workshop-overlay');
    if (overlay) overlay.style.display = 'none';
    
    if (activeAudio) {
        activeAudio.pause();
        if (activeBtn) activeBtn.textContent = '▶ Escuchar';
        activeAudio = null;
    }
}

// Modal de imagen (el que se abre al hacer clic en los botones del overlay)
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-textile');
    if (btn) {
        const path = btn.getAttribute('data-textile');
        if (path) {
            const modal = document.getElementById('textile-modal');
            const img = document.getElementById('textile-image');
            if (modal && img) {
                img.src = path;
                modal.style.display = 'flex';
            }
        }
    }
});

function closeTextileModal() {
    const modal = document.getElementById('textile-modal');
    if (modal) modal.style.display = 'none';
}

// Lógica de Audio
let activeAudio = null;
let activeBtn = null;

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-audio');
    if (btn) {
        const file = btn.getAttribute('data-audio');
        const player = document.getElementById('audio-player');
        if (!player) return;

        if (activeAudio && !activeAudio.paused) {
            activeAudio.pause();
            activeBtn.textContent = '▶ Escuchar';
            if (activeBtn === btn) { activeAudio = null; return; }
        }

        player.src = `audio/${file}`;
        player.play().catch(err => console.log("Audio no disponible o bloqueado"));
        btn.textContent = '⏸ Pausa';
        activeAudio = player;
        activeBtn = btn;

        player.onended = () => { btn.textContent = '▶ Escuchar'; };
    }
});
