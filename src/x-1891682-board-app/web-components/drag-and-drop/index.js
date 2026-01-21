class DragList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.data = [];
      this.i = "";
      this.draggedIndex = null;
    }

    static get observedAttributes() {
      return ["items"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('oi')
      //if (name === "items") {
        this.data = newValue;
        this.render();
     // }
    }

    connectedCallback() {
      this.render();

          console.log('My custom element added to the page.');
          console.log(this.data)


    }

    render() {
        
      this.shadowRoot.innerHTML = `
        <style>
          .list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .item {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            background: #f9f9f9;
            cursor: grab;
          }

          .item.dragging {
            opacity: 0.5;
          }
        </style>

        <div>oi</div>

        <div class="list">
            <div>
          ${this.data
            .map(
              (item, index) => `
              <div
                class="item"
                draggable="true"
                data-index="${index}">
                <strong>${item.number}</strong> - ${item.title}
              </div>
            `)
            .join("")}
        </div>
      `;

      this.addDragEvents();
    }

    addDragEvents() {
      const items = this.shadowRoot.querySelectorAll(".item");

      items.forEach(item => {
        item.addEventListener("dragstart", e => {
          this.draggedIndex = item.dataset.index;
          item.classList.add("dragging");
        });

        item.addEventListener("dragend", e => {
          item.classList.remove("dragging");
        });

        item.addEventListener("dragover", e => {
          e.preventDefault();
        });

        item.addEventListener("drop", e => {
          e.preventDefault();
          const targetIndex = item.dataset.index;
          this.reorder(this.draggedIndex, targetIndex);
        });
      });
    }

    reorder(from, to) {
      const updated = [...this.data];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      this.data = updated;
      this.render();

      // Evento customizado com a nova ordem
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: this.data
        })
      );
    }
  }

  customElements.define("drag-list", DragList);
