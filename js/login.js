// REGISTRAR USUARIO
function registrar(event) {
    event.preventDefault();
    let nombre = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let telefono = document.getElementById("registerPhone").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let usuario = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        password: password
    };

    if (localStorage.getItem(email)) {
        alert("El usuario ya existe.");
    } else {
        localStorage.setItem(email, JSON.stringify(usuario));
        alert("Registro exitoso.");
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    }
}

// INICIAR SESIÓN
function iniciarSesion(event) {
    event.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedUsuario = JSON.parse(localStorage.getItem(email));

    if (storedUsuario && storedUsuario.password === password) {
        sessionStorage.setItem("usuario", email);
        alert("Inicio de sesión exitoso.");
        $('#loginModal').modal('hide');
        mostrarDashboard(storedUsuario.nombre);
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

// MOSTRAR DASHBOARD
function mostrarDashboard(nombre) {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.getElementById("usuarioNombre").innerText = nombre;
}

// CERRAR SESIÓN
function cerrarSesion() {
    sessionStorage.removeItem("usuario");
    location.reload();
}

// VERIFICAR SI YA HAY UNA SESIÓN ACTIVA
window.onload = function () {
    let usuarioActivo = sessionStorage.getItem("usuario");
    if (usuarioActivo) {
        let storedUsuario = JSON.parse(localStorage.getItem(usuarioActivo));
        mostrarDashboard(storedUsuario.nombre);
    }
};



