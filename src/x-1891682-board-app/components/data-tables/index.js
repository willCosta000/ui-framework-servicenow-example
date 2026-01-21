import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import styles from './styles.scss';


import jQuery from 'jquery';
import DataTable from 'datatables.net-dt';


const tableTabulator = () => {

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

const view = (state, {dispatch, updateState}) => {
    
   const table = tableTabulator();

   return (
        <div>
            {
                (() => {
                    const parentElement = document.getElementsByTagName('x-1891682-board-app')[0].parentNode
                    const tableElement = document.getElementById('example-table-000_wrapper')
                    console.log(tableElement)
                    if(tableElement){
                        const clone = tableElement.cloneNode(true)
                        clone.className +=  " clone"
                        console.log(clone)
                    }

                    console.log(parentElement)
                    console.log(this.shadowRoot.querySelector('x-1891682-board-app'))

                    
                })()
            }
        </div>
    )

}

createEnhancedElement('data-tables', {
    view,
    styles,
    properties: {
        placeholder: {
            default: 'Search',
        } 
    },
    dispatches: {
        
    },
    slots: {
        
        defaultSlot: {}
    }
});
