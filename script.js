canvas.addEventListener('touchstart', e => {
  e.preventDefault(); // prevent scrolling
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  if (mode === 'draw') {
    drawing = true;
    drawPixel({clientX: touch.clientX, clientY: touch.clientY});
  } else if (mode === 'text') {
    const text = textInput.value;
    if (text) {
      ctx.fillStyle = currentColor;
      ctx.font = `${fontSize.value}px monospace`;
      ctx.fillText(text, x, y);
    }
  } else if (mode === 'stamp' && stampImage) {
    drawStamp(x, y);
  }
});

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const touch = e.touches[0];
  if (drawing && mode === 'draw') drawPixel({clientX: touch.clientX, clientY: touch.clientY});
  const rect = canvas.getBoundingClientRect();
  previewPos = {x: touch.clientX - rect.left, y: touch.clientY - rect.top};
  drawPreview();
});

canvas.addEventListener('touchend', e => {
  drawing = false;
});
