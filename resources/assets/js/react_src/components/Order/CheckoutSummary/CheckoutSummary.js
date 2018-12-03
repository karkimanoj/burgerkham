import React from 'react';
import Burger from '../../Burger/Burger';

const CheckoutSummary = ({ingredients, checkoutContinued, checkoutCancelled}) =>  {

	return (
		<div className='row'>
			<div className='col-md-12 text-center mt-2'>
				<h1> You have a delicious burger here! </h1>
				<Burger ingredients={ingredients}/>
				<p className="mt-3" >
					
					<button className='btn btn-link btn-lg text-primary m-2'
						onClick = {checkoutContinued}> 
						continue 
					</button>
					<button className='btn btn-link btn-lg text-danger test m-2' 
						onClick = {checkoutCancelled}>
						Cancel 
					</button>
				</p>
			</div>
		</div>
	);
}


export default CheckoutSummary;