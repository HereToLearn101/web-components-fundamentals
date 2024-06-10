const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = /* html */ `
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
    <style>
        /* 
            ::slotted selector are only applied to top level elements that are being slotted to the component
            FOR EXAMPLE:
            <div slot="card-header">
                <h1>Header</h1>
            </div>

            the <div> element will only be targeted, not the <h1>
        */

        /*
        ::slotted(h1) {
            color: black!important;
        }
        */

        .card {
            border-radius: 5px;
            border: 1px solid var(--line-color, darkgray);
        }

        .card-header {
            padding: 5px;
            background-color: var(--element-bg-color,  lightgray);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border-bottom: 1px solid var(--line-color, darkgray);
        }

        .card-body {
            padding: 5px;
        }
    </style>

    <div class="card">
        <div class="card-header">
            <!-- Card header will be here -->
            <slot name="card-header">
                <h1>Card Header</h1>
            </slot>
        </div>

        <div class="card-body">
            <slot name="card-body">Card Body</slot>
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

setTimeout(() => {
    customElements.define('app-card', Card);
}, 2000)