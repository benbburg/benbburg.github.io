document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  // --- App state (adjust to match your app) ---
  let mode = 'draw';       // 'draw', 'text', 'stamp'
  let drawing = false;
  let currentColor = '#00ff00';
  let previewPos = null;

  // These should exist in your HTML
  const brushSize = document.getElementById('brushSize');
  const textInput = document.getElementById('textInput');
  const fontSize = document.getElementById('fontSize');
  let stampImage = null;
  let stampScale = 1;

  // --- Prevent mobile scrolling when touching canvas ---
  canvas.style.touchAction = 'none';

  // --- Helpers ---
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: e.offsetX, y: e.offsetY };
  }

  function drawPixelAt(pos) {
    const size = parseInt(brushSize.value || 1);
    ctx.fillStyle = currentColor;
    ctx.fillRect(pos.x - size/2, pos.y - size/2, size, size);
  }

  function drawTextAt(pos, text) {
    ctx.fillStyle = currentColor;
    ctx.font = `${fontSize.value}px monospace`;
    const metrics = ctx.measureText(text);
    const textHeight = fontSize.value;
    ctx.fillText(text, pos.x - metrics.width/2, pos.y + textHeight/2);
  }

  function drawStampAt(pos) {
    if (!stampImage) return;
    const w = stampImage.width * stampScale;
    const h = stampImage.height * stampScale;
    ctx.drawImage(stampImage, pos.x - w/2, pos.y - h/2, w, h);
  }

  // --- Touch + mouse handlers ---
  function startDraw(e) {
    e.preventDefault();
    const pos = getPos(e);
    previewPos = pos;

    if (mode === 'draw') {
      drawing = true;
      drawPixelAt(pos);
    } else if (mode === 'text' && textInput.value) {
      drawTextAt(pos, textInput.value);
    } else if (mode === 'stamp') {
      drawStampAt(pos);
    }
  }

  function drawMove(e) {
    e.preventDefault();
    const pos = getPos(e);
    previewPos = pos;

    if (drawing && mode === 'draw') drawPixelAt(pos);
  }

  function endDraw(e) {
    e.preventDefault();
    drawing = false;
  }

  // --- Add event listeners ---
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', drawMove);
  canvas.addEventListener('mouseup', endDraw);

  canvas.addEventListener('touchstart', startDraw, {passive:false});
  canvas.addEventListener('touchmove', drawMove, {passive:false});
  canvas.addEventListener('touchend', endDraw);
});
