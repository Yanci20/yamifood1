// REGISTRAR USUARIO
function registrar(event) {
    event.preventDefault();
    
    let nombre = document.getElementById("registerName").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let telefono = document.getElementById("registerPhone").value.trim();
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("registerConfirmPassword").value;

    // Validar nombre (mínimo 3 caracteres, solo letras y espacios)
    let nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,}$/;
    if (!nombreRegex.test(nombre)) {
        alert("El nombre debe tener al menos 3 caracteres y solo puede contener letras y espacios.");
        return;
    }

    // Validar correo electrónico
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    // Validar teléfono (solo números, entre 7 y 15 dígitos)
    let phoneRegex = /^\d{7,15}$/;
    if (!phoneRegex.test(telefono)) {
        alert("El teléfono debe contener solo números y tener entre 7 y 15 dígitos.");
        return;
    }


    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Verificar si el usuario ya existe
    if (localStorage.getItem(email)) {
        alert("El usuario ya existe.");
        return;
    }

    // Guardar usuario en localStorage
    let usuario = { nombre, email, telefono, password };
    localStorage.setItem(email, JSON.stringify(usuario));

    alert("Registro exitoso.");
    $('#registerModal').modal('hide');
    $('#loginModal').modal('show');
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