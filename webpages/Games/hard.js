document.addEventListener('DOMContentLoaded', () => {
    const dragItems = document.querySelectorAll('.statements, .reasons');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    const dropZones = document.querySelectorAll('.drop-zone');

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('dragenter', dragEnter);
        zone.addEventListener('dragleave', dragLeave);
        zone.addEventListener('drop', dragDrop);
    });
});

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

function dragEnd() {
    // Optional clean up or reset function after drag ends
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.style.backgroundColor = '#ddd'; // Visual cue
}

function dragLeave() {
    this.style.backgroundColor = '#e9e9e9'; // Reset background color
}

function dragDrop() {
    this.style.backgroundColor = '#e9e9e9'; // Reset background color
    const draggedElementId = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(draggedElementId);
    this.appendChild(draggedElement.cloneNode(true));
}

function checkAnswers() {
    const dropZones = document.querySelectorAll('.drop-zone');
    let correctCount = 0;
    dropZones.forEach(zone => {
        if(zone.children.length > 0 && zone.getAttribute('data-correct') == zone.children[0].id) {
            correctCount++;
            zone.style.backgroundColor = '#c8e6c9'; // Green for correct
        } else {
            zone.style.backgroundColor = '#ffcdd2'; // Red for incorrect
        }
    });
    document.getElementById('feedback').innerText = `You matched ${correctCount} correctly out of ${dropZones.length}.`;
}