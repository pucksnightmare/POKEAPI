function mostrarFormulario(tipo) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (tipo === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  }
}

function iniciarSesion() {
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;

  const storedUser = localStorage.getItem(user);
  if (storedUser && JSON.parse(storedUser).password === pass) {
    window.location.href = "../index.html";
  } else {
    document.getElementById('loginError').textContent = "Credenciales incorrectas.";
  }
}

function registrarse() {
  const user = document.getElementById('registerUser').value;
  const pass = document.getElementById('registerPass').value;

  if (localStorage.getItem(user)) {
    document.getElementById('registerError').textContent = "El usuario ya existe.";
  } else {
    localStorage.setItem(user, JSON.stringify({ password: pass }));
    alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
    mostrarFormulario('login');
  }
}
