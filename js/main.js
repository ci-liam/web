let uiTimer;
const artOverlayEl = document.getElementById('art-overlay');
const artCloseEl = document.getElementById('art-close');
const artMetaEl = document.getElementById('art-meta');

function openModal(id) { 
    document.getElementById(id).style.display = 'flex'; 
}

function closeModal(id) { 
    document.getElementById(id).style.display = 'none'; 
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = "none";
    }
}

function hideUI() {
    if(artCloseEl) artCloseEl.classList.add('fade-out');
    if(artMetaEl) artMetaEl.classList.add('fade-out');
}

function showUIAndResetTimer() {
    clearTimeout(uiTimer); 
    if(artCloseEl) artCloseEl.classList.remove('fade-out'); 
    if(artMetaEl) artMetaEl.classList.remove('fade-out');
    
    uiTimer = setTimeout(hideUI, 3000);
}

function launchArt() {
    closeModal('modal-art');
    artOverlayEl.style.display = 'block';
    loop(); 

    showUIAndResetTimer(); 
    artOverlayEl.addEventListener('mousemove', showUIAndResetTimer);
}

function closeArt() {
    artOverlayEl.style.display = 'none';
    noLoop(); 

    clearTimeout(uiTimer); 
    artOverlayEl.removeEventListener('mousemove', showUIAndResetTimer); 
    if(artCloseEl) artCloseEl.classList.remove('fade-out');
    if(artMetaEl) artMetaEl.classList.remove('fade-out');
}
