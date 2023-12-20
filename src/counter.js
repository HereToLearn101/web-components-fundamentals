class Counter extends HTMLElement {
    constructor() {
      super();
      console.log('constructor');
      this.count = 0;
    }

    // method when element is added to the DOM
    connectedCallback() {
      console.log('connected');
      this.innerHTML = this.count;
      const until = this.getAttribute('until');
      this.interval = setInterval(() => {
        console.log('interval is running', Date.now());
        if (this.count < until) {
          this.count++;
          this.innerHTML = this.count;
        } else {
          clearInterval(this.interval);
        }
      }, 1000);
    }

    // method when element is removed from the DOM
    disconnectedCallback() {
      console.log('disconnected');
      clearInterval(this.interval);
    }

    attributeChangedCallback(attribute, oldVal, newVal) {
      console.log('attribute changed');
    }

    // this method callback is triggered when the element is moved into a new document
    adoptedCallback() {

    }
  }

  customElements.define('app-counter', Counter);