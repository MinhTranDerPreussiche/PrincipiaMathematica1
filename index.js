document.addEventListener('DOMContentLoaded', function() {
    const background = document.getElementById('background');
    setTimeout(() => {
      background.style.opacity = 1;
    }, 100); // Starts the animation 100ms after the page has loaded.
  });