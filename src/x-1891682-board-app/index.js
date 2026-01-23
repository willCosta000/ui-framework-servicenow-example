
import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

import "@servicenow/now-button";
import "./components/search-field";


import "./components/drag-list";


// Web Component
import "./web-components/examples/button/Button";

const listButton = () =>{
	const buttons = (
		<div>
			<now-button label="Click me" variant="primary" size="lg" append-to-meta={{event: 'EVENT_UPDATE_RECORD', record: "oi"}} />
			<now-button label="Click me" variant="primary-negative" size="lg" />
		</div>
	)

	return buttons
	
}

const view = (state, dispatch) => {
	const {label, data} = state.properties;

	const buttons = listButton();
	const columns = [
		{ id: '1', title: 'New' },
		{ id: '2', title: 'In Progress' },
		{ id: '6', title: 'Resolved' }
	];
	
	/*
	const cards = [
		{ id: '1', title: 'Criar Story', column: 'todo' },
		{ id: '2', title: 'Desenvolver UI', column: 'doing' },
		{ id: '3', title: 'Testes', column: 'done' }
	];*/

	return (

		<div className="incident-list">
			<h1 className="title">servicenow app custom <b>{label}</b></h1>

			<div>
				<search-field placeholder="Search..." fields="number,short_description"></search-field>
			</div>

			<table>

				<thead>
                        <tr>
                            <th>Number</th>
                            <th>Short Description</th>   
							<th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
						
						{data.map(item =>
							<tr>
								<td>{item.number.displayValue}</td>
								<td>{item.short_description.displayValue}</td>
								<td>
									<now-button label="Edit" variant="primary" size="sm" append-to-meta={{event: 'EVENT_UPDATE_RECORD', record: item._row_data.uniqueValue}} />
									<now-button label="Delete" variant="primary-negative" size="sm" append-to-meta={{event: 'EVENT_DELETE_RECORD', record: item._row_data.uniqueValue}} />
								</td>
							</tr>
						)}


					</tbody>
			</table>

		
			<div>
				<drag-list columns={columns} list={data}></drag-list>
			</div>

			<div>
				<button-custom label="hello" variant="primary"></button-custom>
			</div>
			
		
		</div>
	)

	
};



createCustomElement('x-1891682-board-app', {
	renderer: { type: snabbdom },
    view,
	properties: {
        label: { default: "Hello World" },
        data: { default: [] }
    },
    actionHandlers: {
        'NOW_BUTTON#CLICKED': ({action, dispatch}) => {
			const event = action.meta.appended.event;
			const value = action.meta.appended.record;

			dispatch(event, {
				'record': value
			});
		},
		'SEARCH_FIELD#CHANGED': ({state, action, dispatch}) => {
			const text = action.payload.text
			dispatch('EVENT_SEARCH_RECORD', {'term': text})
			console.log(state)
		},

		'CARD#CHANGED': ({action, dispatch}) => {
			console.log('CARD#CHANGED',action)
			const record_id = action.payload.record_id;
			const state = action.payload.state;
			dispatch('EVENT_CHANGED_STATE_RECORD', {
				'record_id': record_id,
				'state': state
			})
		},
		
    },
	eventHandlers:[
		{
			events: ['my-event'],
			effect({action}){
				console.log(action.payload.event)
			}
		},
		
		{
			events: ['keyup'],
			effect(coeffects){
				const {dispatch, action: {payload: {event}}} = coeffects;
				const term = event.originalTarget.value;
				const element = event.originalTarget.attributes.id.value;
				
				console.log(element)
				if(element === 'search-incident'){
					console.log(term)
					dispatch('EVENT_SEARCH_RECORD', {'term': term})
				}
			}
		}

		
	],
    styles
	
});




