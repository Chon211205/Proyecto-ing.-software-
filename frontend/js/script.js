// Toggle para mostrar/ocultar contraseña
function mostrarPassword() {
  const input = document.getElementById("password");
  const icono = event.target;
  
  if (input.type === "password") {
    input.type = "text";
    icono.textContent = "👁️‍🗨️";
  } else {
    input.type = "password";
    icono.textContent = "👁️";
  }
}

// Validación básica del formulario
document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.querySelector(".formulario");
  
  if (formulario) {
    formulario.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const username = document.querySelector('input[type="text"]').value;
      const tipoUsuario = document.querySelector("select").value;
      const password = document.getElementById("password").value;
      
      if (!username || tipoUsuario === "" || password.length < 10) {
        alert("Por favor completa todos los campos. La contraseña debe tener al menos 10 caracteres.");
        return;
      }
      
      // Aquí irá la lógica para enviar los datos al servidor
      console.log({
        username,
        tipoUsuario,
        password
      });
      
      alert("¡Solicitud de acceso enviada correctamente!");
      formulario.reset();
    });
  }
});

// Animación de entrada
window.addEventListener("load", function() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = "1";
  }, 100);
});
