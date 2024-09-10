// Simulación de base de datos
let users = [];
let currentUser = null;

const diaryEntries = [
    "Hoy me sentí muy feliz en clase.",
    "Tuve un pequeño conflicto con un compañero, pero lo resolvimos hablando.",
    "Aprendí algo nuevoy emocionante en la clase de ciencias."
];

const cases = [
    "Caso de estudio: Bullying en el aula",
    "Caso de estudio: Problemas de concentración",
    "Caso de estudio: Integración de nuevos estudiantes"
];

// Funciones de autenticación
function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('userType').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        showMainContent();
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

function register(event) {
    event.preventDefault();
    const fullName = document.getElementById('registerFullName').value.trim();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const dni = document.getElementById('registerDNI').value.trim();
    const userType = document.getElementById('registerUserType').value;
    
    if (users.some(u => u.username === username)) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }
    
    const newUser = { fullName, username, password, dni, userType };
    users.push(newUser);
    alert('Registro exitoso. Por favor, inicia sesión.');
    showLoginForm();
}

function logout() {
    currentUser = null;
    showLoginForm();
}

// Funciones de navegación
function showLoginForm() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('navBar').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('profileSection').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'flex';
}

function showMainContent() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('navBar').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('userName').textContent = currentUser.username;
    updateContent();
}

function toggleProfile() {
    const profileSection = document.getElementById('profileSection');
    if (profileSection.style.display === 'none') {
        profileSection.style.display = 'block';
        updateProfileInfo();
    } else {
        profileSection.style.display = 'none';
    }
}

function updateProfileInfo() {
    document.getElementById('profileFullName').textContent = currentUser.fullName;
    document.getElementById('profileUsername').textContent = currentUser.username;
    document.getElementById('profileDNI').textContent = currentUser.dni;
    document.getElementById('profileUserType').textContent = currentUser.userType;
}

function showSection(sectionNum) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(`section${sectionNum}`).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-section="${sectionNum}"]`).classList.add('active');
}

// Funciones de contenido
function updateContent() {
    updateReportSection();
    updateDiarySection();
    updateCasesSection();
    showSection(1);
}

function updateReportSection() {
    // La sección de reporte ya está en el HTML, no necesita actualizarse dinámicamente
}

function updateDiarySection() {
    document.getElementById('diaryEntry').textContent = diaryEntries[Math.floor(Math.random() * diaryEntries.length)];
}

function updateCasesSection() {
    const casesSection = document.getElementById('casesContent');
    if (currentUser.userType === 'teacher') {
        casesSection.innerHTML = `
            <textarea id="newCase" rows="4" placeholder="Escribe un nuevo caso..."></textarea>
            <button id="addCaseBtn">Publicar Caso</button>
            <h3>Casos existentes:</h3>
            <ul id="casesList"></ul>
        `;
        document.getElementById('addCaseBtn').addEventListener('click', addCase);
    } else {
        casesSection.innerHTML = `
            <h3>Casos de estudio:</h3>
            <ul id="casesList"></ul>
        `;
    }
    updateCasesList();
}

function updateCasesList() {
    const casesList = document.getElementById('casesList');
    casesList.innerHTML = cases.map(c => `<li>${c}</li>`).join('');
}

function submitReport() {
    const reportText = document.getElementById('userInput').value.trim();
    if (reportText) {
        alert('Reporte enviado correctamente: ' + reportText);
        document.getElementById('userInput').value = '';
    } else {
        alert('Por favor, escribe un reporte antes de enviar.');
    }
}

function addCase() {
    const newCase = document.getElementById('newCase').value.trim();
    if (newCase) {
        cases.push(newCase);
        updateCasesList();
        document.getElementById('newCase').value = '';
        alert('Nuevo caso añadido correctamente.');
    } else {
        alert('Por favor, escribe un caso antes de publicar.');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', login);
    document.getElementById('registerForm').addEventListener('submit', register);
    document.getElementById('showRegister').addEventListener('click', showRegisterForm);
    document.getElementById('showLogin').addEventListener('click', showLoginForm);
    document.getElementById('logoutButton').addEventListener('click', logout);
    document.getElementById('toggleProfile').addEventListener('click', toggleProfile);
    document.getElementById('submitReport').addEventListener('click', submitReport);
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => showSection(parseInt(e.target.dataset.section)));
    });
});