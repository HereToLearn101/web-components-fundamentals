const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = /* html */ `
<style>
	/* :host pseudo-element only applies if the element is shadow root is attached */
	:host {
		display: block;
		margin-bottom: 1rem;
	}

	:host([inprogress]) {
		transform: scale(1.1);
		transform-origin: top left;
	}
</style>

<link rel="stylesheet" href="./src/button.css">
<button class="btn"><slot>Button Text</slot></button>
`;

class Button extends HTMLElement {
    constructor() {
		super(); // htmlelement's constructor?
		this.attachShadow({mode: "open"});
    }

    connectedCallback() {
		this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true))
		this.button = this.shadowRoot.querySelector('button');
		this.initialValue = this.innerHTML;
    }

    set inprogress(progress) {
		if(progress) {
			this.setAttribute('inprogress', 'true');
		} else {
			this.removeAttribute('inprogress');
		}
    }

    get inprogress() {
      	return this.getAttribute('inprogress');
    }

    static get observedAttributes() {
      	return ["inprogress"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
		// const button = this.querySelector('button');
		if (newValue) {
			this.innerHTML = "Loading...";
			this.button.setAttribute('disabled', 'true');
			this.button.classList.add('fading');
		} else {
			this.innerHTML = this.initialValue;
			this.button.removeAttribute('disabled');
			this.button.classList.remove('fading');
		}
    }
  }

setTimeout(() => {
    customElements.define('app-button', Button);
}, 2000)