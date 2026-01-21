/*import { createCustomElement, actionTypes } from '@servicenow/ui-core';

createCustomElement('drag-list', {
    view: (state, { dispatch }) => {
        //console.log(state)
        const { items } = state;

        return (
            <div className="list">
                {items.map((item, index) => (
                    <div
                        className="item"
                        draggable="true"
                        ondragstart={() => dispatch(({properties}) => ({
                            type: 'DRAG_START',
                            payload: {'index': index}
                        }))}
                        ondragovr={(e) => e.preventDefault()}
                        ondragover={() => dispatch(({properties}) => ({
                            type: 'DROP',
                            payload: {'index': index}
                        }))}
                    >
                        <strong>{item.number}</strong> - {item.title}
                    </div>

                ))}
            </div>
        );
    },

    
    properties: {
        items: {
            default: []
        }
    },

    initialState: {
        items: [],
        draggedIndex: null
    },

    actionHandlers: {
        
        [actionTypes.COMPONENT_BOOTSTRAPPED]: ({properties, updateState}) => {
            console.log("initialize.....")
            
            updateState({
                items: properties.items,
            })
                
        },
        
        'DRAG_START': ({ state,action, updateState }) => {
            console.log('DRAG',action)
            updateState({
                draggedIndex: action.payload.index
            });
            //state.draggedIndex = action.payload.index
            console.log(state)
        },

        'DROP': ({ state, action, updateState, dispatch }) => {
            console.log('DROP', action)
            const from = state.draggedIndex;
            const to = action.payload.index;

            console.log(from, to)

            if (from === null || to === null || from === to) return;

            const updated = [...state.items];
            const [moved] = updated.splice(from, 1);
            updated.splice(to, 0, moved);

            updateState({
                items: updated,
                draggedIndex: null
            });

            console.log(state)

            // Evento para o UI Builder
            dispatch('DRAG_LIST_CHANGE', {
                value: updated
            });
        }
    },

    
    styles: `
        .list {
            display: flex;
            flex-direction: column;
            gap: 8px;
 
  padding: 5px;
  border: 1px solid black;

        }

        .item {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            background: #f9f9f9;
            cursor: grab;
        }

    `
});*/

import {createCustomElement} from '@servicenow/ui-core';

const KANBAN_CARD_DROPPED = 'KANBAN_CARD_DROPPED';

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
							dispatch(KANBAN_CARD_DROPPED, {
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

	styles: `
		.kanban-board {
			display: flex;
			gap: 16px;
			padding: 16px;
		}

		.kanban-column {
			background: #f4f4f4;
			padding: 12px;
			width: 250px;
			border-radius: 6px;
			min-height: 300px;
		}

		.kanban-card {
			background: #fff;
			padding: 10px;
			margin-bottom: 8px;
			border-radius: 4px;
			cursor: grab;
			box-shadow: 0 1px 3px rgba(0,0,0,.2);
		}
	`,

	initialState: {
		columns: [
			{ id: 'todo', title: 'To Do' },
			{ id: 'doing', title: 'Doing' },
			{ id: 'done', title: 'Done' }
		],
		cards: [
			{ id: '1', title: 'Criar Story', column: 'todo' },
			{ id: '2', title: 'Desenvolver UI', column: 'doing' },
			{ id: '3', title: 'Testes', column: 'done' }
		]
	},

	actionHandlers: {
		[KANBAN_CARD_DROPPED]: ({state, action, updateState}) => {
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