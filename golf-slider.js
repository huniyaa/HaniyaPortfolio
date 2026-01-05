// Before/After Image Slider
const sliderContainer = document.querySelector('.slider-container');
const sliderHandle = document.getElementById('sliderHandle');
const afterImage = document.querySelector('.after-image');

if (sliderContainer && sliderHandle && afterImage) {
  let isDragging = false;

  function updateSlider(clientX) {
    const rect = sliderContainer.getBoundingClientRect();
    let x = clientX - rect.left;
    
    // Constrain x within bounds
    x = Math.max(0, Math.min(x, rect.width));
    
    const percentage = (x / rect.width) * 100;
    
    // Update slider handle position
    sliderHandle.style.left = percentage + '%';
    
    // Update after image clip path
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }

  // Mouse events
  sliderHandle.addEventListener('mousedown', () => {
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateSlider(e.clientX);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Click anywhere on container to move slider
  sliderContainer.addEventListener('click', (e) => {
    if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
      updateSlider(e.clientX);
    }
  });

  // Touch events for mobile
  sliderHandle.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length > 0) {
      updateSlider(e.touches[0].clientX);
      e.preventDefault();
    }
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Touch on container
  sliderContainer.addEventListener('touchstart', (e) => {
    if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
      updateSlider(e.touches[0].clientX);
    }
  });
}