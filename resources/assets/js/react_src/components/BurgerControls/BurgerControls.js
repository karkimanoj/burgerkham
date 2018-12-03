import React from 'react';
import _ from 'lodash';

const BurgerControl = ({type, addIngredient, removeIngredient, disabled}) => {
	return (
		<div className="row">
		    <label className="col-sm-2 col-form-label font-weight-bold">{type}</label>
		    <div className="col-sm-10">
				<button className="btn btn-outline-light m-2" style={{width : '40%'}}
				onClick={()=>removeIngredient(type)}  disabled={disabled}> less </button>
				<button className="btn btn-success m-2" style={{width : '40%'}} onClick={()=>addIngredient(type)}>
				more </button>
		    </div>
		</div>
	);
}

const BurgerControls = props => {
	const {	addIngredient, removeIngredient,  totalPrice, 
			ingredients, handlePurchase, isAuthenticated} = props;

	const ingredientsArray=_.keys(ingredients);
	const sum = ingredientsArray.map( ingredient => ingredients[ingredient])
			.reduce((sum, el) => sum+=el, 0); 
			
	return (
	
		<div className='row mt-4 burger-controls-bg-color'>
			<div className='col-md-8 offset-md-2 p-4 text-center'>
				<p> Total Price : <strong> {totalPrice.toFixed(2)} </strong> </p>
				
				{ 
					ingredientsArray.map( (ingredient, i) => 
					<BurgerControl key={ingredient+i} type={ingredient} 
					disabled={ingredients[ingredient] <= 0}
					addIngredient = {addIngredient} 
					removeIngredient = {removeIngredient}/>	)
				}

				<button className='bn btn-light btn-lg' 
					disabled={sum <= 0} 
					onClick={() => handlePurchase(true)}> 
					{isAuthenticated ? 'Order' : 'Sign Up To Order'} 

				</button>
			</div>
		</div>	
	
	);
}
 export default BurgerControls;