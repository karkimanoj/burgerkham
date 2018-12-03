import React from 'react';

const Input = (props) => {
	const {elementType, elementConfig, value, changed, blured, error, touched, label} = props;
	let inputElement = null;
	switch (elementType) {
		case 'input' :
			inputElement = <input className={`form-control ${error && touched && 'is-invalid'}`}
				{...elementConfig} 
				value={value} 
				onChange={changed} 
				onBlur={blured}/>;
			break;
		case 'select' :
			inputElement = <select className={`form-control ${error && touched && 'is-invalid'}`}
				value={value} onChange={changed} onBlur={blured} name={elementConfig.name}>
				{elementConfig.options.map( option => (
					<option key={option.value} value={option.value}>
						{option.displayName}
					</option>
					))}
			</select>;
			break;
		case 'textarea' :
			inputElement = <textarea className={`form-control ${error && touched && 'is-invalid'}`}   
				{...elementConfig} 
				value={value} 
				onChange={changed}
				onBlur={blured} />;;
			break;
		default :
			inputElement = <input className={`form-control ${error && touched && 'is-invalid'}`} 
				{...elementConfig} 
				value={value} 
				onChange={changed} 
				onBlur={blured}/>;		
	}
	
	return ( 
		<div className='form-group'>
			{label && <label> {label} </label> }
			{inputElement}
			
			{ touched && error && <span  className="form-text text-danger">
							    	{error}  </span>}
		</div>
	);
};

export default Input;