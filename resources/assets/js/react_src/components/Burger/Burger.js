import React from 'react';
import _ from 'lodash';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ingredients}) => {
	
	let ingredientList = _.keys(ingredients).map(ingredient => {
		return [...new Array(ingredients[ingredient])]
			.map( (_, index) => <BurgerIngredient key={ingredient+index} type={ingredient}/> );			
	}).reduce((array, el) => array.concat(el), []); 

	if(ingredientList.length === 0) 
		ingredientList = <h5><b> Please start adding ingrediants! </b></h5>;

	return (
		<div className='row' >
			<div className='col-md-6 offset-md-3 burger'>
			
				<BurgerIngredient type='bread-top' />
				{ingredientList}
				<BurgerIngredient type='bread-bottom' />
		
			</div>
		</div>		
	);
}

export default Burger;