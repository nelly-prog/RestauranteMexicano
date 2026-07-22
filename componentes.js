// componentes.js

function renderizarHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    // Verificamos si hay una sesión activa real
    const datosPerfil = localStorage.getItem("perfil_datos_usuario_libre");
    let sesionIniciada = false;
    let nombreUsuario = "Usuario";

    if (datosPerfil) {
        try {
            const parsed = JSON.parse(datosPerfil);
            if (parsed.usuario || parsed.correo || parsed.telefono) {
                sesionIniciada = true;
                if (parsed.usuario) nombreUsuario = parsed.usuario;
            }
        } catch(e) {}
    }

    if (!sesionIniciada && localStorage.getItem('sesionIniciada') === 'true') {
        sesionIniciada = true;
        const uActivo = localStorage.getItem('usuario_activo');
        if (uActivo) nombreUsuario = uActivo;
    }

    let accesoPerfilHTML = `<li><a href="login.html">Iniciar Sesión</a></li>`;
    
    if (sesionIniciada) {
        accesoPerfilHTML = `<li><a href="perfil.html" style="font-weight: bold; color: #ffca28 !important;">Mi Perfil (${nombreUsuario})</a></li>`;
    }

    header.innerHTML = `
        <div class="logo-contenedor">
            <a href="index.html" style="display: flex; align-items: center; text-decoration: none; color: inherit; gap: 10px;">
                <img src="img/logo.png.png" class="logo-img" alt="Logo Sabor Mexicano" onerror="this.style.display='none'">
                <span>Sabor Mexicano</span>
            </a>
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
    
    const carrito = JSON.parse(localStorage.getItem('carritoApp')) || [];
    badge.textContent = carrito.reduce((total, prod) => total + (prod.cantidad || 1), 0);
}

window.actualizarContadorVisual = actualizarContadorCarrito;

window.addEventListener('storage', () => {
    actualizarContadorCarrito();
    renderizarHeader(); 
});

function renderizarAvisoCookies() {
    if (document.getElementById('aviso-cookies')) return;

    const bannerCookies = document.createElement('div');
    bannerCookies.id = 'aviso-cookies';
    bannerCookies.innerHTML = `
        <div class="contenido-cookies">
            <span>🍪 Usamos cookies para mejorar tu experiencia en Sabor Mexicano y en las simulaciones de nuestra plataforma. ¿Aceptas su uso?</span>
            <button onclick="aceptarCookies()" class="btn-rojo" style="padding: 8px 20px; font-size: 0.9rem; cursor: pointer; background-color: #d32f2f; color: white; border: none; border-radius: 6px;">Aceptar</button>
        </div>
    `;

    bannerCookies.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #1a1a1a;
        color: #ffffff;
        padding: 15px 20px;
        box-sizing: border-box;
        box-shadow: 0 -4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    if (!document.getElementById('estilos-cookies')) {
        const estilosInternos = document.createElement('style');
        estilosInternos.id = 'estilos-cookies';
        estilosInternos.innerHTML = `
            .contenido-cookies {
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 1100px;
                width: 100%;
                gap: 20px;
                flex-wrap: wrap;
                font-size: 0.95rem;
            }
            @media (max-width: 768px) {
                .contenido-cookies {
                    flex-direction: column;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(estilosInternos);
    }
    document.body.appendChild(bannerCookies);
}

function aceptarCookies() {
    const banner = document.getElementById('aviso-cookies');
    if (banner) {
        banner.style.display = 'none';
    }
}

/* ==========================================================================
   AGREGADO: CONTROLADOR GLOBAL PARA TOASTS
   Para usarlo en cualquier página, solo llama a: window.mostrarToast("Tu mensaje");
   ========================================================================== */
function mostrarToastGlobal(mensaje) {
    let toast = document.getElementById('toast-global-unico');
    
    // Si no existe, lo creamos
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-global-unico';
        toast.className = 'toast-notificacion';
        document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    
    // Forzar el tamaño por línea para evitar interferencias de hojas de estilo
    toast.style.cssText = `
        display: inline-flex !important;
        align-items: center !important;
        width: max-content !important; 
        max-width: 320px !important; 
        height: auto !important;
        z-index: 99999 !important;
    `;
    
    toast.classList.add('mostrar');

    // Ocultarlo después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('mostrar');
        toast.style.display = 'none'; // Forzar ocultamiento extra
    }, 3000);
}

// Lo exponemos globalmente para que todas tus páginas lo tengan disponible
window.mostrarToast = mostrarToastGlobal;

document.addEventListener('DOMContentLoaded', () => {
    renderizarHeader();
    renderizarFooter();
    renderizarBannerGlobal();
    actualizarContadorCarrito();
    renderizarAvisoCookies();
});