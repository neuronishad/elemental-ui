class Container extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['width', 'height', 'verticalalign', 'horizontalalign'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        // Get attributes with default values
        const width = this.getAttribute('width') || '100%';
        const height = this.getAttribute('height') || '100%';
        const vAlign = this.getAttribute('verticalalign') || 'top';
        const hAlign = this.getAttribute('horizontalalign') || 'left';

        // Map alignment values to Tailwind classes
        const alignmentClasses = {
            vertical: {
                top: 'items-start',
                center: 'items-center',
                bottom: 'items-end'
            },
            horizontal: {
                left: 'justify-start',
                center: 'justify-center',
                right: 'justify-end'
            }
        };

        // Get corresponding Tailwind classes
        const vAlignClass = alignmentClasses.vertical[vAlign] || alignmentClasses.vertical.top;
        const hAlignClass = alignmentClasses.horizontal[hAlign] || alignmentClasses.horizontal.left;

        this.shadowRoot.innerHTML = `
      <div class="flex ${vAlignClass} ${hAlignClass}" style="width: ${width}; height: ${height};">
        <slot></slot>
      </div>
    `;
    }
}

customElements.define('econtainer', Container);
