// =============================================
//  ADMIN - LISTA DE USUARIOS
//  Datos de prueba + lógica de filtrado/búsqueda
// =============================================

// ── DATOS DE PRUEBA ──────────────────────────
const USUARIOS = [
    { id: "USR-001", nombre: "Carlos Méndez", tipo: "admin", tel: "5512-3456", nacimiento: "15-03-1985", estado: "activo", registro: "10-01-2024" },
    { id: "USR-002", nombre: "Ana García", tipo: "cuidador", tel: "5598-7654", nacimiento: "22-07-1990", estado: "activo", registro: "15-01-2024" },
    { id: "USR-003", nombre: "Roberto López", tipo: "paciente", tel: "5534-2100", nacimiento: "08-11-1960", estado: "activo", registro: "20-01-2024" },
    { id: "USR-004", nombre: "María Pérez", tipo: "cuidador", tel: "5578-9012", nacimiento: "30-04-1988", estado: "activo", registro: "02-02-2024" },
    { id: "USR-005", nombre: "Jorge Sánchez", tipo: "paciente", tel: "5567-4321", nacimiento: "14-09-1955", estado: "pendiente", registro: "10-02-2024" },
    { id: "USR-006", nombre: "Luisa Flores", tipo: "admin", tel: "5589-0011", nacimiento: "05-12-1982", estado: "activo", registro: "14-02-2024" },
    { id: "USR-007", nombre: "David Torres", tipo: "paciente", tel: "5523-6789", nacimiento: "19-06-1970", estado: "pendiente", registro: "18-02-2024" },
    { id: "USR-008", nombre: "Sofía Ramírez", tipo: "cuidador", tel: "5545-3322", nacimiento: "28-02-1995", estado: "activo", registro: "22-02-2024" },
    { id: "USR-009", nombre: "Andrés Castillo", tipo: "paciente", tel: "5511-8899", nacimiento: "03-01-1948", estado: "activo", registro: "01-03-2024" },
    { id: "USR-010", nombre: "Valeria Moreno", tipo: "cuidador", tel: "5576-4455", nacimiento: "17-08-1992", estado: "activo", registro: "05-03-2024" },
    { id: "USR-011", nombre: "Felipe Guzmán", tipo: "paciente", tel: "5533-7788", nacimiento: "25-05-1963", estado: "activo", registro: "10-03-2024" },
    { id: "USR-012", nombre: "Gabriela Ortiz", tipo: "cuidador", tel: "5522-6611", nacimiento: "11-10-1987", estado: "pendiente", registro: "15-03-2024" },
];

// Paleta de avatares (rota por índice)
const PALETA_AVATARES = [
    { bg: "rgba(47, 111, 237, 0.12)", color: "#2f6fed" },
    { bg: "rgba(29, 158, 117, 0.12)", color: "#0F6E56" },
    { bg: "rgba(186, 117, 23, 0.12)", color: "#854F0B" },
    { bg: "rgba(163, 45, 45, 0.12)", color: "#A32D2D" },
    { bg: "rgba(83, 74, 183, 0.12)", color: "#3C3489" },
    { bg: "rgba(212, 83, 126, 0.12)", color: "#993556" },
];

// ── ESTADO ────────────────────────────────────
let filtroActual = "todos";

// ── UTILIDADES ────────────────────────────────
function iniciales(nombre) {
    return nombre
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function colorAvatar(index) {
    return PALETA_AVATARES[index % PALETA_AVATARES.length];
}

function badgeClase(tipo) {
    const mapa = { admin: "badge-admin", cuidador: "badge-cuidador", paciente: "badge-paciente" };
    return mapa[tipo] || "";
}

function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── MÉTRICAS ─────────────────────────────────
function actualizarMetricas() {
    document.getElementById("totalUsuarios").textContent = USUARIOS.length;
    document.getElementById("totalAdmin").textContent = USUARIOS.filter((u) => u.tipo === "admin").length;
    document.getElementById("totalCuidadores").textContent = USUARIOS.filter((u) => u.tipo === "cuidador").length;
    document.getElementById("totalPacientes").textContent = USUARIOS.filter((u) => u.tipo === "paciente").length;
}

// ── RENDER TABLA ──────────────────────────────
function renderTabla(lista) {
    const tbody = document.getElementById("tbodyUsuarios");
    const tablaVacia = document.getElementById("tablaVacia");

    if (lista.length === 0) {
        tbody.innerHTML = "";
        tablaVacia.style.display = "block";
        return;
    }

    tablaVacia.style.display = "none";

    tbody.innerHTML = lista
        .map((u, i) => {
            const avatarColor = colorAvatar(i);
            const esActivo = u.estado === "activo";

            return `
        <tr>
          <td>
            <div class="celdaUsuario">
              <div class="usuarioAvatar" style="background:${avatarColor.bg}; color:${avatarColor.color}">
                ${iniciales(u.nombre)}
              </div>
              <div>
                <p class="usuarioNombre">${u.nombre}</p>
                <p class="usuarioId">${u.id}</p>
              </div>
            </div>
          </td>
          <td>
            <span class="badge ${badgeClase(u.tipo)}">${capitalizar(u.tipo)}</span>
          </td>
          <td>${u.tel}</td>
          <td>${u.nacimiento}</td>
          <td>
            <span class="estadoPunto ${esActivo ? "estadoActivo" : "estadoPendiente"}"></span>
            ${capitalizar(u.estado)}
          </td>
          <td>
            <button class="btnAccion" onclick="abrirModal('${u.id}')">Ver detalles</button>
          </td>
        </tr>
      `;
        })
        .join("");
}

// ── FILTRADO / BÚSQUEDA ───────────────────────
function obtenerFiltrados() {
    const q = document.getElementById("inputBusqueda").value.toLowerCase().trim();

    return USUARIOS.filter((u) => {
        const matchTipo = filtroActual === "todos" || u.tipo === filtroActual;
        const matchBusqueda = !q ||
            u.nombre.toLowerCase().includes(q) ||
            u.id.toLowerCase().includes(q) ||
            u.tel.toLowerCase().includes(q);
        return matchTipo && matchBusqueda;
    });
}

function filtrarUsuarios() {
    renderTabla(obtenerFiltrados());
}

function setFiltro(tipo, btn) {
    filtroActual = tipo;

    // Actualizar estilos de botones
    document.querySelectorAll(".filtroBton").forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");

    filtrarUsuarios();
}

// ── MODAL ─────────────────────────────────────
function abrirModal(id) {
    const u = USUARIOS.find((u) => u.id === id);
    if (!u) return;

    const idx = USUARIOS.indexOf(u);
    const color = colorAvatar(idx);

    // Avatar
    const avatarEl = document.getElementById("modalAvatar");
    avatarEl.textContent = iniciales(u.nombre);
    avatarEl.style.background = color.bg;
    avatarEl.style.color = color.color;

    // Datos
    document.getElementById("modalNombre").textContent = u.nombre;
    document.getElementById("modalId").textContent = u.id;
    document.getElementById("modalTel").textContent = u.tel;
    document.getElementById("modalNac").textContent = u.nacimiento;
    document.getElementById("modalFechaReg").textContent = u.registro;

    // Badge tipo
    const badgeEl = document.getElementById("modalBadge");
    badgeEl.innerHTML = `<span class="badge ${badgeClase(u.tipo)}">${capitalizar(u.tipo)}</span>`;

    // Estado
    const esActivo = u.estado === "activo";
    document.getElementById("modalEstado").innerHTML = `
    <span class="estadoPunto ${esActivo ? "estadoActivo" : "estadoPendiente"}" style="display:inline-block;vertical-align:middle;margin-right:6px;"></span>
    ${capitalizar(u.estado)}
  `;

    document.getElementById("modalOverlay").classList.add("abierto");
}

function cerrarModalBtn() {
    document.getElementById("modalOverlay").classList.remove("abierto");
}

function cerrarModal(e) {
    // Cerrar solo si se hace clic en el overlay, no en la tarjeta
    if (e.target === document.getElementById("modalOverlay")) {
        cerrarModalBtn();
    }
}

// Cerrar con Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalBtn();
});

// ── ANIMACIÓN DE ENTRADA ─────────────────────
window.addEventListener("load", function() {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "1";
    }, 80);
});

// ── INICIALIZAR ───────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
    actualizarMetricas();
    renderTabla(USUARIOS);
});