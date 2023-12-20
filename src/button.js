const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = /* html */ `
<style>
  .btn {
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 1rem 2rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
    
  }

  .btn:hover {
    background-color: #1d80f0;
  }

  .btn:disabled {
    background-color: #6aa8f0;
  }

  .fading {
    animation: fading 0.5s infinite;
  }

  @keyframes fading {
    0% {
      color: #6aa8f0;
    }

    50% {
      color: white;
    }

    100% {
      color: #6aa8f0;
    }
  }
</style>
<button class="btn">Button Text</button>
`;

class Button extends HTMLElement {
    constructor() {
      super(); // htmlelement's constructor?
    }

    connectedCallback() {
      const text = this.getAttribute('text');
      // this.innerHTML = `<button class="btn">${text}</button>`;
      // const buttonTemplate = document.querySelector('#button-template'); 
      // console.log(buttonTemplate.content.cloneNode(false));
      
      // It's important to clone, so it can be applied to multiple custom elements.
      // if you didn't use cloneNode, then the content inside the template would have 
      // been completely consumed for one time use only.
      this.appendChild(buttonTemplate.content.cloneNode(true));
      this.button = this.querySelector('button');
      this.button.textContent = text;
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
        this.button.textContent = "Loading...";
        this.button.setAttribute('disabled', 'true');
        this.button.classList.add('fading');
      } else {
        this.button.textContent = this.getAttribute('text');
        this.button.removeAttribute('disabled');
        this.button.classList.remove('fading');
      }
    }
  }

  customElements.define('app-button', Button);