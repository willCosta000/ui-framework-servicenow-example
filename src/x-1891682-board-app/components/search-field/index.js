import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import styles from './styles.scss';


const view = (state, {dispatch, updateState}) => {
    
    const { placeholder } = state.properties;

    const search = (term) => {
        const value = term.toString();  
        dispatch(({properties}) => ({
            type: 'SEARCH_FIELD#CHANGED',
            payload: {'text': value},
            shouldDispatch: !properties.disabled
        }));
    }


    return (
        <div className="x-search-field">
            <input
                id="x-search-field"
                placeholder={placeholder}
                on-keyup={(e) => {search(e.target.value)}}></input>
        </div>
    )

}

createEnhancedElement('search-field', {
    view,
    styles,
    properties: {
        placeholder: {
            default: 'Search',
        } 
    },
    dispatches: {
		'SEARCH_FIELD#CHANGED': {
				type: 'object',
				properties: {
					value: {
						type: 'string'	
					}
				}
			}
	},
	slots: {
		
		defaultSlot: {}
	}
});
