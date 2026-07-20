// componentes.js

function renderizarHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    // Moví la constante adentro de la función para evitar el error de "variable ya declarada"
    const claveSesionLocal = "usuario_activo";
    const usuarioActivo = localStorage.getItem(claveSesionLocal); 
    let accesoPerfilHTML = `<li><a href="login.html">Iniciar Sesión</a></li>`;
    
    if (usuarioActivo) {
        // Enlace al perfil con el nombre de usuario persistente
        accesoPerfilHTML = `<li><a href="perfil.html" style="font-weight: bold; color: #ffca28 !important;">Mi Perfil (${usuarioActivo})</a></li>`;
    }

    // Inyección de la barra de navegación
    header.innerHTML = `
        <div class="logo-contenedor">
            <img src="img/logo.png.png" class="logo-img" alt="Logo">
            <span>Sabor Mexicano</span>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="catalogo.html">Catálogo</a></li>
                <li><a href="comunidad.html">Comunidad</a></li>
                <li><a href="index.html#promociones">🔥 Promos</a></li>
                <li><a href="index.html#escaparate">Especial</a></li>
                <li><a href="mercadito.html">🏪 Mercadito</a></li>
                <li><a href="index.html#nosotros">Nosotros</a></li>
                <li><a href="index.html#contacto">Contacto</a></li>
                ${accesoPerfilHTML}
                <li class="cart-item-container">
                    <a href="carrito.html" class="cart-link" title="Ver carrito">
                        🛒<span id="cart-count" class="cart-badge">0</span>
                    </a>
                </li>
            </ul>
        </nav>
    `;

    // Redes Sociales Flotantes
    let contenedorRedes = document.querySelector('.redes-flotantes');
    if (!contenedorRedes) {
        contenedorRedes = document.createElement('div');
        contenedorRedes.className = 'redes-flotantes';
        contenedorRedes.innerHTML = `
            <a href="https://facebook.com" target="_blank"><img src="img/face.png" alt="Facebook"></a>
            <a href="https://instagram.com" target="_blank"><img src="img/insta.jpg" alt="Instagram"></a>
        `;
        document.body.appendChild(contenedorRedes);
    }
}

function renderizarFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
        <p>&copy; 2026 Sabor Mexicano - Todos los derechos reservados.</p>
        <div class="footer-enlaces">
            <a href="terminos.html">Términos del Servicio</a>
            <span>|</span>
            <a href="politicas.html">Política de Compraventa</a>
        </div>
        <p class="footer-creditos">e-business + e-commerce - Negocios Electrónicos I</p>
    `;
}

function renderizarBannerGlobal() {
    const banner = document.getElementById('banner-global');
    if (!banner) return; 

    banner.innerHTML = `
        <div class="banner-contenido">
            🇲🇽 ¡Mes Patrio! Usa el cupón <span class="cupon-resaltado">VIVAMEXICO</span> y obtén 10% de descuento en todo el catálogo.
        </div>
    `;
}

function actualizarContadorCarrito() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    
    // Unificación de llaves para el carrito
    const carrito = JSON.parse(localStorage.getItem('carritoApp')) || [];
    badge.textContent = carrito.reduce((total, prod) => total + (prod.cantidad || 1), 0);
}

// Convertimos esta función en global para que mercadito.html la encuentre sin errores
window.actualizarContadorVisual = actualizarContadorCarrito;

// Escuchar cambios de almacenamiento entre pestañas
window.addEventListener('storage', () => {
    actualizarContadorCarrito();
    renderizarHeader(); // Refrescar header si la sesión cambia en otra pestaña
});

// Listener unificado de carga
document.addEventListener('DOMContentLoaded', () => {
    renderizarHeader();
    renderizarFooter();
    renderizarBannerGlobal();
    actualizarContadorCarrito();
});