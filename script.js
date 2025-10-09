document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

// --- Touch drawing ---
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  const touch = e.touches[0];
  const pos = getTouchPos(touch);
  previewPos = pos;

  if (mode === 'draw') {
    drawing = true;
    drawPixelAt(pos);
  } else if (mode === 'text' && textInput.value) {
    drawTextAt(pos, textInput.value);
  } else if (mode === 'stamp' && stampImage) {
    drawStampAt(pos);
  }
});

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const touch = e.touches[0];
  const pos = getTouchPos(touch);
  previewPos = pos;

  if (drawing && mode === 'draw') drawPixelAt(pos);
  drawPreview();
});

canvas.addEventListener('touchend', e => {
  drawing = false;
});

// --- Helpers ---
function getTouchPos(touch) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

function drawPixelAt(pos) {
  const size = parseInt(brushSize.value);
  ctx.fillStyle = currentColor;
  ctx.fillRect(pos.x - size/2, pos.y - size/2, size, size);
}

function drawTextAt(pos, text) {
  ctx.fillStyle = currentColor;
  ctx.font = `${fontSize.value}px monospace`;
  const metrics = ctx.measureText(text);
  const textHeight = fontSize.value; // approximate height
  ctx.fillText(text, pos.x - metrics.width/2, pos.y + textHeight/2);
}

function drawStampAt(pos) {
  const w = stampImage.width * stampScale;
  const h = stampImage.height * stampScale;
  ctx.drawImage(stampImage, pos.x - w/2, pos.y - h/2, w, h);
  quantizeImage();
}
});
