// Particle Effect - Partículas blancas que suben continuamente con movimiento aleatorio
class FloatingParticles {
    constructor() {
        this.container = null;
        this.activeParticles = [];
        this.maxParticles = 60;
        this.init();
    }

    init() {
        // Crear contenedor
        this.container = document.createElement('div');
        this.container.id = 'floating-particles';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(this.container);

        // Crear partículas continuamente
        setInterval(() => this.createParticle(), 300);

        // Crear partículas iniciales
        for (let i = 0; i < 20; i++) {
            setTimeout(() => this.createParticle(), Math.random() * 2000);
        }

        // Actualizar posición de partículas continuamente
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';

        // Propiedades
        const size = Math.random() * 6 + 2; // 2-8px
        const startX = Math.random() * window.innerWidth;
        const speed = Math.random() * 2 + 1; // 1-3px por frame
        const horizontalSpeed = (Math.random() - 0.5) * 2; // -1 a 1px horizontal
        const opacity = Math.random() * 0.5 + 0.3; // Aumentado: 0.5 a 1.0

        // Estilos
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${this.getParticleColor()};
            border-radius: 50%;
            left: ${startX}px;
            bottom: -20px;
            opacity: ${opacity};
            pointer-events: none;
        `;

        this.container.appendChild(particle);

        // Guardar datos de la partícula
        this.activeParticles.push({
            element: particle,
            x: startX,
            y: window.innerHeight + 20, // Comienza abajo de la pantalla
            speed: speed,
            horizontalSpeed: horizontalSpeed,
            baseOpacity: opacity, // Guardamos la opacidad base
            size: size
        });
    }

    animate() {
        this.activeParticles = this.activeParticles.filter(particle => {
            // Actualizar posición
            particle.y -= particle.speed; // Resta para subir
            particle.x += particle.horizontalSpeed + Math.sin(particle.y * 0.01) * 2;

            // Calcular opacidad basada en la altura
            const screenHeight = window.innerHeight;
            const progress = 1 - (particle.y / screenHeight);

            // Usamos la opacidad base como máximo
            particle.element.style.opacity = Math.min(particle.baseOpacity, progress * 1.5);

            // Aplicar cambios
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.bottom = `${window.innerHeight - particle.y}px`;

            // Eliminar si sale de pantalla
            if (particle.y < -50) {
                particle.element.remove();
                return false;
            }

            return true;
        });

        requestAnimationFrame(() => this.animate());
    }

    getParticleColor() {
        const colors = [
            'rgba(255, 165, 0, 0.7)',   // Naranja fuerte
            'rgba(255, 215, 0, 0.9)',   // Dorado
            'rgba(255, 140, 0, 0.8)',   // Naranja oscuro
            'rgba(255, 255, 255, 0.6)'  // Blanco suave (para contraste)
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function () {
    new FloatingParticles();
});