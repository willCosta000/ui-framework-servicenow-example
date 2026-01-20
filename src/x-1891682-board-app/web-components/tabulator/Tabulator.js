class TabulatorTable extends HTMLElement {
  constructor() {
    super(); // Always call super() first in the constructor

    // Attach a shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' }); // 'open' means the shadow DOM can be accessed from outside the component

    // Define the component's internal structure and styles
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          padding: 10px;
          border: 1px solid black;
          background-color: lightgray;
        }
        .title {
          font-weight: bold;
          color: var(--title-color, blue); /* Use CSS variables for customizability */
        }
      </style>
      <div class="container">
        <div class="title">Hello World</div>
        <slot></slot> <!-- A placeholder for child content -->
      </div>
    `;
  }

  // Lifecycle callback when the element is added to the document
  connectedCallback() {
    console.log('My custom element added to the page.');
  }

  // Lifecycle callback when observed attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title-text') {
      this.shadowRoot.querySelector('.title').textContent = newValue;
    }
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['title-text'];
  }
}


customElements.define('tabulator-table', TabulatorTable);