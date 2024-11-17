import { sizeClasses, styleVariants, baseClasses } from './utils.js';

// Textarea Component
class TextArea extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return [
            'placeholder', 'value', 'rows', 'disabled', 'readonly', 'required',
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
        const textarea = this.shadowRoot.querySelector('textarea');
        ['input', 'change', 'focus', 'blur'].forEach(eventName => {
            textarea.addEventListener(eventName, (e) => {
                this.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }));
            });
        });
    }

    render() {
        const placeholder = this.getAttribute('placeholder') || '';
        const value = this.getAttribute('value') || '';
        const rows = this.getAttribute('rows') || '4';
        const disabled = this.hasAttribute('disabled');
        const readonly = this.hasAttribute('readonly');
        const required = this.hasAttribute('required');
        const size = this.getAttribute('size') || 'md';
        const variant = this.getAttribute('variant') || 'outlined';

        const classes = `
            ${baseClasses}
            ${sizeClasses[size]}
            ${styleVariants[variant]}
            resize-y
        `;

        this.shadowRoot.innerHTML = `
            <div>
                <textarea
                    rows="${rows}"
                    placeholder="${placeholder}"
                    ?disabled="${disabled}"
                    ?readonly="${readonly}"
                    ?required="${required}"
                    class="${classes}"
                >${value}</textarea>
            </div>
        `;
    }
}

customElements.define('etextarea', TextArea);

