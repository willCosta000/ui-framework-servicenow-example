
import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

import "@servicenow/now-button";
import "./components/search-field";

//import "./web-components/drag-and-drop"
import "./components/drag-list"

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
	const cards = [
		{number: '0001', title: 'hello'},
		{number: '0002', title: 'hello 2'},
		{number: '0003', title: 'hello 3'},
		{number: '0004', title: 'hello 4'}
	]

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

			

			<div>{buttons}</div>

			<div>{JSON.stringify(cards)}</div>


			<div>
				<drag-list items={cards}></drag-list>

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
			console.log(action)
			const event = action.meta.appended.event;
			const value = action.meta.appended.record;

			dispatch(event, {
				'record': value
			});
		},
		'SEARCH_FIELD#CHANGED': ({action, dispatch}) => {
			const text = action.payload.text
			dispatch('EVENT_SEARCH_RECORD', {'term': text})
		}
    },
	/*eventHandlers:[
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
	],*/
    styles
	
});




