import React, {Fragment} from 'react';

const OrderSummary = ({orderDetails, purchaseCanceled, purchaseContiued, totalPrice}) => {
	const list = Object.keys(orderDetails).map( (igKey,i) =>  
		<li className="list-group-item borderless" key={igKey+i}>{igKey+' - '+orderDetails[igKey]}</li>);

	return (
		<Fragment>	
			<h3> Order Details </h3>
			<p className="text-info">A delicious burger with following ingredients:</p>
			<ul className="list-group  text-monospace">
			  {list}
			</ul>
			<p><strong>Total price : {totalPrice.toFixed(2)}</strong></p>
			<p className="mt-3">
				Go ahead with the order ?
				<button className='btn btn-link text-primary btn-sm m-2'onClick={purchaseContiued}> 
				continue 
			</button>
			<button className='btn btn-link btn-sm text-danger test m-2' onClick={()=>purchaseCanceled(false)}>
				Cancel 
			</button>
			</p>
			
		</Fragment>	
	);
};
export default OrderSummary;