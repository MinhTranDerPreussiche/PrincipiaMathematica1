// script.js
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    // Check to prevent placing elements inside other draggable elements
    if (ev.target.className.includes("draggable")) {
        return;
    }

    ev.target.appendChild(draggedElement);
}


function submitAnswers() {
    // Define groups
    const givensGroup = ["statement1", "statement2", "statement3"];
    const congruenceGroup = ["statement4"];
    const cpctcGroup = ["statement5"];
    
    // Retrieve the children from the drop-zone
    const children = Array.from(document.getElementById("drop-zone").children);

    // Initialize counters for each group
    let givensCount = 0, congruenceCount = 0, cpctcCount = 0;

    // Calculate scores based on group placement
    children.forEach(child => {
        if (givensGroup.includes(child.id)) {
            if (congruenceCount === 0 && cpctcCount === 0) givensCount++;
        } else if (congruenceGroup.includes(child.id)) {
            if (givensCount === givensGroup.length && cpctcCount === 0) congruenceCount++;
        } else if (cpctcGroup.includes(child.id)) {
            if (givensCount === givensGroup.length && congruenceCount === congruenceGroup.length) cpctcCount++;
        }
    });

    const finalScore = ((givensCount + congruenceCount + cpctcCount) / 5 * 100) + "%";
    document.getElementById("score").innerText = "Your score: " + finalScore;

    // Save the score in local storage
    localStorage.setItem("geometryGameScore", finalScore);
}

function resetGame() {
    // Reload the page to reset the game
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    let draggables = document.querySelectorAll('.draggable');
    draggables.forEach((item) => {
        item.addEventListener('dragstart', drag);
    });
});
