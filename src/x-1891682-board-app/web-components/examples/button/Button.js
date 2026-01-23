const template = document.createElement('template')
template.id = "button-custom"
template.innerHTML =`
    <style>
        .custom-button {
            padding: 16px;
            border-radius: 8px;
        }

        .custom-button.primary{
            background-color: #788CFD;
        }

        .custom-button.secondary{
            background-color:lightpink;
        }
    </style>
    <div class="root">
        <button class="custom-button">
            
        </button>
    </div>
`


class ButtonCustom extends HTMLElement{
    constructor(){
        super();
        this.root = this.attachShadow({mode: 'closed'});
        //Shadowroot protege o web component de manipulacoes externas
        let clone = template.content.cloneNode(true);
        this.root.append(clone); 

        
    }

    static get observedAttributes(){
        return ['label', 'variant'];
    }

    get label(){
        return this.getAttribute('label')
    }

    set label(value){
        this.setAttribute('label', value) 
    }


    get variant(){
        return this.getAttribute('variant')
    }

    set variant(value){
        this.setAttribute('variant', value)
    }

    connectedCallback(){
        const button = this.root.querySelector('.root > button');
        console.log(button)
        button.addEventListener('click', (e) =>{
            console.log('clicked...')

            this.dispatchEvent(
                new CustomEvent('my-event', {
                    detail: {
                        data: ' o botao foi clicado'
                    },
                    bubbles: true,
                    composed: true
                })
            )

        })
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        const button = this.root.querySelector('.root > button')

         if(attrName === 'label'){
            const label = document.createElement('span');
            label.className = "label";
            label.textContent = newVal;
            button.append(label);
         }

         if(attrName === 'variant'){
            button.className += ` ${newVal}`
         }
    }

}

customElements.define('button-custom', ButtonCustom)