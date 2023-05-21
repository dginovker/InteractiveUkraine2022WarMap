const timeline = document.getElementById('timeline');
const gif = document.getElementById('gif');
const progress = document.createElement('div');
progress.className = 'progress';
timeline.appendChild(progress);

let videoDuration = 0;
let isDragging = false;

function initializeTimeline() {
  videoDuration = gif.duration;
  console.log(videoDuration)

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
