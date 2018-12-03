export default (ingredients) => {
		let optIngredients = {};
		
		for(let key in ingredients)
			optIngredients[key] = ingredients[key].quantity;

		return optIngredients;
}