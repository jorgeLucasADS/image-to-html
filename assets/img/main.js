const fileInput = document.getElementById('image');
const fileNameDisplay = document.getElementById('file-name');
const customLabel = document.getElementById('custom-label');
const form = document.getElementById('upload-form');
const preview = document.getElementById('preview');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const successMessage = document.getElementById('success-message');

// Tema persistente
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.className = savedTheme;
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('light');
    const newTheme = body.classList.contains('dark') ? 'dark' : 'light';
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

customLabel.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        fileNameDisplay.textContent = file.name;

        if (file.size > 5 * 1024 * 1024) {
            alert('O arquivo excede o limite de 5MB. Por favor, selecione outro.');
            fileInput.value = '';
            fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
            preview.style.display = 'none';
            preview.src = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            setTimeout(() => preview.style.opacity = '1', 50);
        };
        reader.readAsDataURL(file);
    } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
        preview.style.display = 'none';
        preview.src = '';
        preview.style.opacity = '0';
    }
});

form.addEventListener('submit', (e) => {
    const file = fileInput.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
        e.preventDefault();
        alert('O arquivo excede o limite de 5MB. Envio cancelado.');
        return;
    }

    // Simula envio com barra de progresso
    //e.preventDefault(); // Impede envio real para simulação
    progressBar.style.display = 'block';
    progressFill.style.width = '0%';
    successMessage.style.display = 'none';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            successMessage.style.display = 'block';
            form.reset();
            fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
            preview.style.display = 'none';
            preview.src = '';
            preview.style.opacity = '0';
        }
    }, 100);
});