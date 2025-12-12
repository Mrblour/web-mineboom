// Global Modal System
const ModalSystem = {
    containerId: 'global-modal-container',
    
    init() {
        // Create container if it doesn't exist
        if (!document.getElementById(this.containerId)) {
            const container = document.createElement('div');
            container.id = this.containerId;
            document.body.appendChild(container);
        }

        // Expose global functions
        window.openModal = this.open.bind(this);
        window.closeModal = this.close.bind(this);
    },

    async open(modalName) {
        try {
            // Determine path - handle if we are in views/ subdir or root
            // This is a simple heuristic; for a robust app, use absolute paths or a config
            let basePath = 'modals/';
            
            // Check if we are running from a subdirectory (e.g. /views/)
            if (window.location.pathname.includes('/views/')) {
                basePath = '../modals/';
            }
            if (window.location.pathname.includes('/auth/')) {
                basePath = '../../modals/';
            }

            const response = await fetch(`${basePath}${modalName}.html`);
            
            if (!response.ok) {
                throw new Error(`Modal ${modalName} not found`);
            }

            const html = await response.text();
            const container = document.getElementById(this.containerId);
            
            // Inject content
            container.innerHTML = html;

            // Add backdrop click listener to close
            const backdrop = container.querySelector('#modal-backdrop');
            if (backdrop) {
                backdrop.addEventListener('click', (e) => {
                    if (e.target === backdrop) {
                        this.close();
                    }
                });
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

        } catch (error) {
            console.error('Error opening modal:', error);
            alert('Error al cargar el modal. Por favor intente de nuevo.');
        }
    },

    close() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';
        document.body.style.overflow = '';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ModalSystem.init();
});