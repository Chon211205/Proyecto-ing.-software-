// Lógica específica para la página de Login

document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.querySelector(".formulario");
  
  if (formulario) {
    formulario.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      
      if (!username || !password) {
        alert("Por favor completa todos los campos.");
        return;
      }
      
      if (password.length < 10) {
        alert("La contraseña debe tener al menos 10 caracteres.");
        return;
      }
      
      // Aquí irá la lógica para validar con el servidor
      console.log({
        username,
        password
      });
      
      alert("¡Iniciando sesión...");
      // formulario.reset();
      // Aquí redireccionar al dashboard o panel principal
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
