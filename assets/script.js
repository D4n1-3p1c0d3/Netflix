// Funzione per creare una card del film
function createMovieCard(imagePath) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${imagePath}" class="img-fluid rounded" alt="Movie Thumbnail">
    `;
    return card;
}

// Funzione per popolare una riga di film
function populateMovieRow(rowId, start, end) {
    const row = document.getElementById(rowId);
    for (let i = start; i <= end; i++) {
        const imagePath = `assets/imgs/movies/${i}.png`;
        const card = createMovieCard(imagePath);
        row.appendChild(card);
    }
}

function initializeSlider(rowId) {
    const slider = document.getElementById(rowId);
    const row = slider.closest('.movie-row');
    const prevButton = row.querySelector('.prev-button');
    const nextButton = row.querySelector('.next-button');
    
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    // Gestione dei pulsanti di navigazione
    nextButton.addEventListener('click', () => {
        currentTranslate -= 1000;
        currentTranslate = Math.max(currentTranslate, -slider.scrollWidth + row.offsetWidth);
        slider.style.transform = `translateX(${currentTranslate}px)`;
    });
    
    prevButton.addEventListener('click', () => {
        currentTranslate += 1000;
        currentTranslate = Math.min(currentTranslate, 0);
        slider.style.transform = `translateX(${currentTranslate}px)`;
    });
    
    // Gestione del trascinamento
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);
    slider.addEventListener('mouseleave', dragEnd);
    
    function dragStart(e) {
        isDragging = true;
        slider.classList.add('dragging');
        startPos = getPositionX(e);
        prevTranslate = currentTranslate;
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function dragEnd() {
        isDragging = false;
        slider.classList.remove('dragging');
        // Limita lo scorrimento
        currentTranslate = Math.min(currentTranslate, 0);
        currentTranslate = Math.max(currentTranslate, -slider.scrollWidth + row.offsetWidth);
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
}

// Inizializza gli slider dopo aver popolato le righe
document.addEventListener('DOMContentLoaded', () => {
    populateMovieRow('continueWatching', 1, 6);
    populateMovieRow('newReleases', 7, 12);
    populateMovieRow('popular', 13, 18);
    
    initializeSlider('continueWatching');
    initializeSlider('newReleases');
    initializeSlider('popular');
});

