import { sizeClasses, styleVariants, baseClasses } from './utils.js';

// Select Component
class SelectInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return [
            'placeholder', 'disabled', 'required', 'multiple',
            'size', 'variant', 'error'
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    attributeChangedCallback() {
        this.render();
    }

    setupEvents() {
        const select = this.shadowRoot.querySelector('select');
        ['change', 'focus', 'blur'].forEach(eventName => {
            select.addEventListener(eventName, (e) => {
                this.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }));
            });
        });
    }

    render() {
        const placeholder = this.getAttribute('placeholder') || 'Select an option';
        const disabled = this.hasAttribute('disabled');
        const required = this.hasAttribute('required');
        const multiple = this.hasAttribute('multiple');
        const size = this.getAttribute('size') || 'md';
        const variant = this.getAttribute('variant') || 'outlined';

        const classes = `
            ${baseClasses}
            ${sizeClasses[size]}
            ${styleVariants[variant]}
            appearance-none
            pr-10
        `;

        this.shadowRoot.innerHTML = `
            <div class="relative">
                <select
                    ?disabled="${disabled}"
                    ?required="${required}"
                    ?multiple="${multiple}"
                    class="${classes}"
                >
                    ${!multiple ? `
                        <option value="" disabled selected>${placeholder}</option>
                    ` : ''}
                    <slot></slot>
                </select>

                ${!multiple ? `
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

customElements.define('eselect', SelectInput);
