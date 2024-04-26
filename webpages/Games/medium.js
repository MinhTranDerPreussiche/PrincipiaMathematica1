// medium.js
// Adjusted for two-column drop-zone and new proof structure
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
    if (ev.target.className.includes("draggable")) {
        return;
    }
    ev.target.appendChild(draggedElement);
}

function submitAnswers() {
    // Define the correct placement for each element
    const statements = { "statement1": "drop-zone-statements", "statement2": "drop-zone-statements", "statement3": "drop-zone-statements", "statement4": "drop-zone-statements" };
    const reasons = { "reason1": "drop-zone-reasons", "reason2": "drop-zone-reasons", "reason3": "drop-zone-reasons", "reason4": "drop-zone-reasons" };
    
    let correctCount = 0;
    Object.entries(statements).forEach(([id, zone]) => {
        const element = document.getElementById(id);
        if (element.parentNode.id === zone) correctCount++;
    });
    Object.entries(reasons).forEach(([id, zone]) => {
        const element = document.getElementById(id);
        if (element.parentNode.id === zone) correctCount++;
    });

    const finalScore = ((correctCount / 8) * 100) + "%";
    document.getElementById("score").innerText = "Your score: " + finalScore;
    localStorage.setItem("geometryGameScoreMedium", finalScore);
}

function resetGame() {  
    window.location.reload();
};

document.addEventListener("DOMContentLoaded", () => {
    let draggables = document.querySelectorAll('.draggable');
    draggables.forEach((item) => {
        item.addEventListener('dragstart', drag);
    });
});
