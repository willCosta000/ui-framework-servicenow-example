import {createCustomElement, actionTypes} from '@servicenow/ui-core';

import styles from "./styles.scss"

function generateCards(list) {
    let cards = [];

    if(!list){
        console.log('nao ha itens')
        return;
    }

    list.map(item => {
        cards.push({
            id: item._row_data.uniqueValue,
            title: `${item.number.displayValue} - ${item.short_description.displayValue}`,
            column: item.state.value
        })
    })

    return cards;
}

createCustomElement('drag-list', {
	view(state, {dispatch}) {
		return (
			<div className="kanban-board">
				{state.columns.map(column => (
					<div
						className="kanban-column"
						ondragover={e => e.preventDefault()}
						ondrop={e => {
							const cardId = e.dataTransfer.getData('card_id');
							dispatch('KANBAN_CARD_DROPPED', {
								cardId,
								toColumn: column.id
							});
						}}
					>
						<h3>{column.title}</h3>

						{state.cards
							.filter(card => card.column === column.id)
							.map(card => (
								<div
									className="kanban-card"
									draggable="true"
									ondragstart={e => {
										e.dataTransfer.setData('card_id', card.id);
									}}
								>
									{card.title}
								</div>
							))}
					</div>
				))}
			</div>
		);
	},

	styles,

    properties: {
        columns: {
            default: [],
        },
        cards: {
            default: []
        },
        list:{
            default: []
        }
    },

	initialState: {
		columns: [],
		cards: []
	},

	actionHandlers: {
        [actionTypes.COMPONENT_BOOTSTRAPPED]: ({properties, updateState}) =>{
           // setTimeout(() => {
                console.log('CB', properties)
                
                const list = properties.list;
                const cards = generateCards(list);

                updateState({
                    columns: properties.columns,
                    cards: cards
                })
            //}, 500);
            
        },

        [actionTypes.COMPONENT_PROPERTY_CHANGED]: ({properties, updateState}) =>{
           // setTimeout(() => {
                console.log('COMPONENT_PROPERTY_CHANGED', properties)
                const list = properties.list;
                const cards = generateCards(list);

                updateState({
                    columns: properties.columns,
                    cards: cards
                })
                
               
        },  
        
		'KANBAN_CARD_DROPPED': ({state, action, updateState, dispatch}) => {
			const {cardId, toColumn} = action.payload;

			updateState({
				cards: state.cards.map(card =>
					card.id === cardId
						? {...card, column: toColumn}
						: card
				)
			});

            dispatch('CARD#CHANGED', {
                record_id: cardId,
                state: toColumn
            })
		}
	}
});


