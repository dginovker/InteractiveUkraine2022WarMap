const timeline = document.getElementById('timeline');
const gif = document.getElementById('gif');
const progress = document.createElement('div');
progress.className = 'progress';
timeline.appendChild(progress);

let videoDuration = 0;
let isDragging = false;

function initializeTimeline() {
  videoDuration = gif.duration;

  timeline.addEventListener('mousedown', (event) => {
    isDragging = true;
    updateTimeline(event);
  });

  timeline.addEventListener('mousemove', (event) => {
    if (isDragging) {
      updateTimeline(event);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  gif.style.display = 'block'; // Show the video once it's loaded
  document.getElementById('loading-message').style.display = 'none'; // Hide the loading message
}

gif.addEventListener('canplaythrough', initializeTimeline);
gif.addEventListener('loadedmetadata', initializeTimeline);

function updateTimeline(event) {
  const offsetX = event.clientX - timeline.getBoundingClientRect().left;
  const percentage = (offsetX / timeline.offsetWidth) * 100;
  const currentTime = (percentage / 100) * videoDuration;
  gif.currentTime = currentTime;
  progress.style.width = `${percentage}%`;
}

// If the interactive visualization doesn't appear, try refreshing the page
setTimeout(() => {
  const loadingMessage = document.getElementById('loading-message');
  const gifDisplayStyle = window.getComputedStyle(gif).getPropertyValue('display');
  if (gifDisplayStyle !== 'block') {
    loadingMessage.innerHTML += '<br />(If the interactive visualization does not appear after a while, please try refreshing the page)';
  }
}, 5000);
