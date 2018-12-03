import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
	ingredients : null, /*{
		salad : { quantity: 0, unitPrice : 0.5},
		cheese : { quantity: 0, unitPrice : 0.6},
		bacon : { quantity: 0, unitPrice : 0.6},				
		meat : { quantity: 0, unitPrice : 0.7}
	}*/
	totalPrice : 4,
	building : false,
	error : false
};

export default function (state = initialState, action) { 
	switch (action.type) { 
		case actionTypes.SET_INGREDIENTS :
			const ingredientsk=_.mapKeys(action.ingredients, 'name')
			return {
				...state,
				ingredients : ingredientsk,
				totalPrice : 4,
				error : false 
			};
		case actionTypes.SET_INGREDIENTS_FAILED :
			return {
				...state,
				error : true
			};	
		case actionTypes.ADD_INGREDIENT: 
		//console.log('ingredientName',action)
			return { 
				...state,
				ingredients : {
					...state.ingredients,
					[action.ingredientName] : {
						...state.ingredients[action.ingredientName] ,
						quantity : state.ingredients[action.ingredientName].quantity + 1
					}
				},
				totalPrice : state.totalPrice + state.ingredients[action.ingredientName].unitPrice ,
				building : true 
			};
		case actionTypes.REMOVE_INGREDIENT:
			return { 
				...state,
				ingredients : {
					...state.ingredients,
					[action.ingredientName] : {
						...state.ingredients[action.ingredientName],
						quantity : state.ingredients[action.ingredientName].quantity - 1
					}
				},
				totalPrice : state.totalPrice - state.ingredients[action.ingredientName].unitPrice,
				building : true ,
			};	
		case actionTypes.RESET_BURGER_BUILDING :
			return {
				...state,
				building : false
			};	
		default :
			return state;	
	}
	
}