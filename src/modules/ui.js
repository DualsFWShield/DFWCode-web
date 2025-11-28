import { state } from './state.js';
import { updateQR, updateFrame } from './qr.js';
// Wait, I put updateBar in barcode.js. I should import it from there.
import { updateBar as updateBarReal } from './barcode.js';

export function switchMode(m) {
    state.mode = m;
    document.getElementById('btn-mode-qr').classList.toggle('active', m === 'qr');
    document.getElementById('btn-mode-bar').classList.toggle('active', m === 'bar');

    document.getElementById('qr-settings').classList.toggle('hidden', m !== 'qr');
    document.getElementById('bar-settings').classList.toggle('hidden', m !== 'bar');

    // Hide extra panels
    const historyPanel = document.getElementById('history-panel');
    if (historyPanel) historyPanel.classList.add('hidden');
    const bulkPanel = document.getElementById('bulk-panel');
    if (bulkPanel) bulkPanel.classList.add('hidden');

    document.getElementById('qr-wrapper').classList.toggle('hidden', m !== 'qr');
    document.getElementById('bar-wrapper').classList.toggle('hidden', m !== 'bar');
    if (m === 'qr') updateQR(); else updateBarReal();
}

export function setupDropZone(zoneId, fileHandler) {
    const dropZone = document.getElementById(zoneId);
    if (!dropZone) return;
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault(); dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) fileHandler(e.dataTransfer.files[0]);
    });
}
