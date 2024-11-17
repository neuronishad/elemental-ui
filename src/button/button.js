class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['size', 'shape', 'color', 'disabled'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    getSizeClasses() {
        const size = this.getAttribute('size') || 'medium';
        const sizeClasses = {
            small: 'px-2 py-1 text-sm',
            medium: 'px-4 py-2 text-base',
            large: 'px-6 py-3 text-lg',
        };

        if (!isNaN(size)) {
            return `w-[${size}px] h-[${size}px]`;
        }

        return sizeClasses[size] || sizeClasses.medium;
    }

    getShapeClasses() {
        const shape = this.getAttribute('shape') || 'rounded';
        const shapeClasses = {
            rounded: 'rounded',
            square: 'rounded-none',
        };
        return shapeClasses[shape] || shapeClasses.rounded;
    }

    getColorClasses() {
        const color = this.getAttribute('color') || 'primary';
        const colorClasses = {
            primary: 'bg-primary hover:bg-primary-hover text-primary-text',
            secondary: 'bg-secondary hover:bg-secondary-hover text-secondary-text',
            success: 'bg-green-500 hover:bg-green-600 text-white',
            danger: 'bg-red-500 hover:bg-red-600 text-white',
        };

        if (color.startsWith('#') || color.startsWith('rgb')) {
            return `custom-color`;
        }

        return colorClasses[color] || colorClasses.primary;
    }

    getCustomColorStyle() {
        const color = this.getAttribute('color');
        if (color.startsWith('#') || color.startsWith('rgb')) {
            return `background-color: ${color}; color: white;`;
        }
        return '';
    }

    render() {
        const size = this.getSizeClasses();
        const shape = this.getShapeClasses();
        const color = this.getColorClasses();
        const customStyle = this.getCustomColorStyle();
        const disabled = this.hasAttribute('disabled');

        this.shadowRoot.innerHTML = `
      <button 
        class="inline-flex items-center justify-center font-medium transition-colors duration-200 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
               ${size} ${shape} ${color}"
        style="${customStyle}"
        ?disabled="${disabled}"
      >
        <slot></slot>
      </button>
    `;

        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', (e) => {
            if (!disabled) {
                this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
            }
        });
    }
}

customElements.define('ebutton', Button);
