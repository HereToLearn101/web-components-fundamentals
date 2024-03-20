const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = /* html */ `
    <style>
        .card {
            border: 1px solid black;
        }

        .card__header,
        .card__body {
            border: 1px solid black;
        }
    </style>

    <div class="card">
        <div class="card__header">
            <slot name="card-header">Card Header</slot>
        </div>

        <div class="card__body">
            <slot name="card-body">Card Body</slot>
        </div>

        <div class="card__other">
            <p>Other content goes here...</p>
            <slot></slot>
        </div>
    </div>
`

class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    }
}

customElements.define('app-card', Card);