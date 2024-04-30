document.addEventListener('DOMContentLoaded', () => {
    const dragItems = document.querySelectorAll('.statements, .reasons');
    const selectionContainer = document.querySelector('.selection-container');
    const statementsContainer = document.querySelector('.statements-container');
    const reasonsContainer = document.querySelector('.reasons-container');

    // Adjust styles to display statements and reasons side by side
    selectionContainer.style.display = 'flex';
    selectionContainer.style.justifyContent = 'space-between';
    selectionContainer.style.alignItems = 'flex-start';

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

    // Implement auto-scroll when hovering over top or bottom of the window
    // Function to handle the auto-scrolling when dragging near the bottom of the screen

    const bottomThreshold = window.innerHeight - 1000; // 300 pixels from the bottom
    const scrollSpeed = 20; // The speed at which the window scrolls

    // Check if the dragging element is near the bottom of the window
    if (event.clientY >= bottomThreshold) {
        // Scroll the window down
        window.scrollBy(10, scrollSpeed);
    }
    

// Add event listeners to the draggable items
const draggableItems = document.querySelectorAll('.draggable');
draggableItems.forEach(item => {
    item.addEventListener('drag', handleAutoScroll);
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

function dragDrop(e) {
    e.preventDefault();
    this.style.backgroundColor = '#e9e9e9'; // Reset background color
    const draggedElementId = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(draggedElementId);
    const clone = draggedElement.cloneNode(true);
    clone.setAttribute('draggable', false); // Prevent the clone from being draggable again
    this.appendChild(clone);

    // Remove the original element from the selection zone
    draggedElement.remove();
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
function resetGame() {
    // Reloads the current page
    window.location.reload(true);
}
