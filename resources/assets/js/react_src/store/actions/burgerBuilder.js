import * as actionTypes from './actionTypes';
import axios from 'axios';


export function setIngredients(ingredients) {
	return {
		type : actionTypes.SET_INGREDIENTS,
		ingredients : ingredients
	}
}

export function setIngredientsFailed() {
	return {
		type : actionTypes.SET_INGREDIENTS_FAILED
	}
}

export function fetchIngredients() {
	
	return (dispatch) => {
		axios.get('/api/ingredients')
			.then(response => {
			
				dispatch(setIngredients(response.data.data));
			})
			.catch( error => {
				dispatch(setIngredientsFailed());
			});
	}	
}

export function addIngredient(ingredientName) {

	return { 
		type : actionTypes.ADD_INGREDIENT,
		ingredientName : ingredientName
	};
}

export function removeIngredient(ingredientName) {
	return { 
			type : actionTypes.REMOVE_INGREDIENT, 
			ingredientName : ingredientName 
	};
}

export const resetBurgerBuilding = () => {
	return {
		type : actionTypes.RESET_BURGER_BUILDING
	}
}