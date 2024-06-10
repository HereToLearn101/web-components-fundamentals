const template = document.createElement('template');
template.innerHTML = /* html */ `
    <style>
        label {
            display: block;
            margin-bottom: 1rem;
        }

        input {
            min-width: 200px;
            border: 0.1rem solid lightgray;
            padding: 1rem;
            margin-bottom: 1rem;
        }
    </style>
    <label></label>
    <input>
`

class Input extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set value(value) {
        this.setAttribute('value', value);
    }

    get value() {
        return this.getAttribute('value');
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const label = this.shadowRoot.querySelector('label');
        label.textContent = this.getAttribute('label');
        const input = this.shadowRoot.querySelector('input');
        input.addEventListener('input', (event) => {
            this.value = event.target.value;
        });
    }
}

customElements.define('app-input', Input);