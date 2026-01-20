
import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import "@servicenow/now-button";
import "./components/search-field";

//import jQuery from './web-components/tabulator/dataTables/jquery';
import jQuery from 'jquery';

import DataTable from 'datatables.net-dt';

//import { TabulatorTable } from './web-components/tabulator/Tabulator.js'

const listButton = () =>{
	return (
		<div>
			<now-button label="Click me" variant="primary" size="lg" />
			<now-button label="Click me" variant="primary-negative" size="lg" />
		</div>
	)
	
}


const tableTabulator = () => {

	/*const component = document.createElement('tabulator-table');
    component.setAttribute('title-text', 'Uma Instancia do web component');
    document.body.appendChild(component);*/


	const component = document.createElement('table');
	component.setAttribute('id', 'example-table-000')
	document.body.appendChild(component);

	let table = jQuery('#example-table-000').DataTable();
		table.destroy();

		table = jQuery('#example-table-000').DataTable( {
		data: [
			{
				"name":       "Tiger Nixon",
				"position":   "System Architect",
				"salary":     "$3,120",
				"start_date": "2011/04/25",
				"office":     "Edinburgh",
				"extn":       "5421"
			},
			{
				"name":       "Garrett Winters",
				"position":   "Director",
				"salary":     "$5,300",
				"start_date": "2011/07/25",
				"office":     "Edinburgh",
				"extn":       "8422"
			}
		],
		columns: [
			{ data: 'name' },
			{ data: 'position' },
			{ data: 'salary' },
			{ data: 'office' }
		]
	} );

	

	
	
}


//{properties: {label, data, buttons = listButton()}}

const view = (state, dispatch) => {
	const {label, data} = state.properties;

	const buttons = listButton();
	const table = tableTabulator();

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

			<div>{table}</div>

			
		
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
