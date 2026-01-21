import {createCustomElement, actionTypes} from '@servicenow/ui-core';

import styles from "./styles.scss"


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
        }
    },

	initialState: {
		columns: [],
		cards: []
	},

	actionHandlers: {
        [actionTypes.COMPONENT_BOOTSTRAPPED]: ({properties, updateState}) =>{
            updateState({
                columns: properties.columns,
                cards: properties.cards
            })
        },

		'KANBAN_CARD_DROPPED': ({state, action, updateState}) => {
			const {cardId, toColumn} = action.payload;

			updateState({
				cards: state.cards.map(card =>
					card.id === cardId
						? {...card, column: toColumn}
						: card
				)
			});
		}
	}
});


