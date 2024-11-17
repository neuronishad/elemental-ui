// Form Layout Component
class FormLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <div class="flex flex-col space-y-6">
        <slot></slot>
      </div>
    `;
    }
}

// Form Group Component
class FormGroup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['legend'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const legend = this.getAttribute('legend') || '';

        this.shadowRoot.innerHTML = `
      <fieldset class="border border-gray-200 rounded-lg p-4 mb-6">
        <legend class="px-2 text-sm font-medium text-gray-700">${legend}</legend>
        <div class="space-y-6">
          <slot></slot>
        </div>
      </fieldset>
    `;
    }
}

// Form Field Component
class FormField extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['label', 'required', 'help-text', 'error'];
    }

    connectedCallback() {
        this.render();
        this.setupValidation();
    }

    attributeChangedCallback() {
        this.render();
    }

    setupValidation() {
        const input = this.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('invalid', () => {
                this.setAttribute('error', input.validationMessage);
            });
            input.addEventListener('input', () => {
                this.removeAttribute('error');
            });
        }
    }

    render() {
        const label = this.getAttribute('label') || '';
        const required = this.hasAttribute('required');
        const helpText = this.getAttribute('help-text') || '';
        const error = this.getAttribute('error');
        const id = `field-${Math.random().toString(36).slice(2, 9)}`;

        this.shadowRoot.innerHTML = `
      <div class="field-wrapper">
        <div class="grid grid-cols-12 gap-4 items-start">
          <!-- Label -->
          <div class="col-span-3">
            <label class="block text-sm font-medium text-gray-700" for="${id}">
              ${label}
              ${required ? '<span class="text-red-500 ml-1">*</span>' : ''}
            </label>
          </div>

          <!-- Input Container -->
          <div class="col-span-9">
            <!-- Input Slot -->
            <div class="flex rounded-md shadow-sm">
              <slot></slot>
            </div>

            <!-- Help Text -->
            ${helpText ? `
              <p class="mt-2 text-sm text-gray-500">${helpText}</p>
            ` : ''}

            <!-- Error Message -->
            ${error ? `
              <p class="mt-2 text-sm text-red-600">${error}</p>
            ` : ''}
          </div>
        </div>
      </div>
    `;

        // Set the generated ID on the slotted input element
        const slottedElement = this.querySelector('input, select, textarea');
        if (slottedElement) {
            slottedElement.id = id;
            slottedElement.classList.add(
                'flex-1',
                'border',
                'border-gray-300',
                'rounded-md',
                'px-3',
                'py-2',
                'text-sm',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-blue-500',
                'focus:border-blue-500'
            );
        }
    }
}

customElements.define('eform', FormLayout);
customElements.define('eform-group', FormGroup);
customElements.define('eform-field', FormField);
