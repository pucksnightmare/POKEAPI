function mostrarFormulario(tipo) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');

  loginError.textContent = '';
  registerError.textContent = '';

  if (tipo === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  }
}

function iniciarSesion() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  const storedUser = localStorage.getItem(user);
  if (!user || !pass) {
    document.getElementById('loginError').textContent = "Completa todos los campos.";
    return;
  }

  if (storedUser && JSON.parse(storedUser).password === pass) {
    window.location.href = "../index.html";
  } else {
    document.getElementById('loginError').textContent = "Usuario o contraseña incorrectos.";
  }
}

function registrarse() {
  const user = document.getElementById('registerUser').value.trim();
  const pass = document.getElementById('registerPass').value.trim();

  if (!user || !pass) {
    document.getElementById('registerError').textContent = "Completa todos los campos.";
    return;
  }

  if (localStorage.getItem(user)) {
    document.getElementById('registerError').textContent = "El usuario ya existe.";
  } else {
    localStorage.setItem(user, JSON.stringify({ password: pass }));
    alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
    mostrarFormulario('login');
  }
}
