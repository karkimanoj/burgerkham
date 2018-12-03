import React from 'react';

const Order = (props) => (
	<div className='row'>
		<div className='col-md-8 offset-md-2'>
			<div className="card mt-3" >
			  <div className="card-body">
			    
			  
			    <p className="card-text">
			    Ingredients : 
			    	{props.ingredients.map(ingredient => 
			    		<span className='badge badge-light ml-2 mr-2 p-2 text-capitalize' key={ingredient}>
			    			{ingredient.name +' - '+ingredient.quantity }
			    		</span>)}
					<br/>
					Quantity :  <strong> {props.quantity}  </strong>
					&ensp;&ensp;
					Total price : <strong> USD {props.totalPrice} </strong>
			    </p>
			   
			  </div>
			</div>
		</div>
	</div>
	
);

export default Order;