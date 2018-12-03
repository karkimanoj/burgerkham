import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
	orders : null,
	ordering : false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ORDER_BURGER_START :
			return {
				...state,
				ordering : true
			};
		case actionTypes.ORDER_BURGER_SUCCESS :
		case actionTypes.ORDER_BURGER_FAILED :
			return {
				...state,
				ordering : false
			};	
		case actionTypes.FETCH_ORDERS_SUCCESS :
		const orders=_.mapKeys(action.orders, 'id')
			return {
				...state,
				orders : orders
			};
		//case actionTypes.FETCH_INGREDIENTS_FAILED :

		default :
			return state;
	}
}
