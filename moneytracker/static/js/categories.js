// Open emoji picker
const iconBtn = document.getElementById('iconSelector');
const modal = document.getElementById('categoryModal');
const modalContent = modal.querySelector('.modal-content');

const picker = document.createElement('emoji-picker');
picker.style.position = 'absolute';
picker.style.bottom = '60px';
picker.style.right = '20px';
picker.style.display = 'none';
modalContent.appendChild(picker);

iconBtn.addEventListener('click', () => {
    picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
});

picker.addEventListener('emoji-click', (event) => {
    iconBtn.textContent = event.detail.unicode;
    picker.style.display = 'none';
});