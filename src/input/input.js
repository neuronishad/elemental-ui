import { sizeClasses, styleVariants, baseClasses } from './utils.js';

// Text Input Component
class TextInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return [
            'type', 'placeholder', 'value', 'disabled', 'readonly', 'required',
            'size', 'variant', 'error', 'prefix-icon', 'suffix-icon'
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
        const input = this.shadowRoot.querySelector('input');
        ['input', 'change', 'focus', 'blur'].forEach(eventName => {
            input.addEventListener(eventName, (e) => {
                this.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }));
            });
        });
    }

    render() {
        const type = this.getAttribute('type') || 'text';
        const placeholder = this.getAttribute('placeholder') || '';
        const value = this.getAttribute('value') || '';
        const disabled = this.hasAttribute('disabled');
        const readonly = this.hasAttribute('readonly');
        const required = this.hasAttribute('required');
        const size = this.getAttribute('size') || 'md';
        const variant = this.getAttribute('variant') || 'outlined';
        const prefixIcon = this.getAttribute('prefix-icon');
        const suffixIcon = this.getAttribute('suffix-icon');

        const classes = `
            ${baseClasses}
            ${sizeClasses[size]}
            ${styleVariants[variant]}
            ${(prefixIcon ? 'pl-10' : '')}
            ${(suffixIcon ? 'pr-10' : '')}
        `;

        this.shadowRoot.innerHTML = `
            <div class="relative">
                ${prefixIcon ? `
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <slot name="prefix-icon"></slot>
                    </div>
                ` : ''}
                
                <input
                    type="${type}"
                    placeholder="${placeholder}"
                    value="${value}"
                    ?disabled="${disabled}"
                    ?readonly="${readonly}"
                    ?required="${required}"
                    class="${classes}"
                />

                ${suffixIcon ? `
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <slot name="suffix-icon"></slot>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

customElements.define('einput', TextInput);
