import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import getOptimizedIngredients  from '../../utils/getOptimizedIngredients';

class Checkout extends Component {
	constructor (props) {
		super(props);
		this.onCheckoutContinue = this.onCheckoutContinue.bind(this);
		this.onCheckoutCancel = this.onCheckoutCancel.bind(this);
	}
	
	
	onCheckoutContinue () {
		this.props.history.replace('/checkout/contact-form');
	}

	onCheckoutCancel () {
		this.props.history.goBack();
	}	

	render () {
		const optIngredients = getOptimizedIngredients(this.props.ingredients);
		const sum = Object.keys(optIngredients)
			.reduce((sum, quantity) => sum + (optIngredients[quantity]), 0);
		

		let summary = <Redirect to='/' />
		if(sum) 
			summary = <div>
				<CheckoutSummary 
				ingredients={optIngredients}
				checkoutContinued ={this.onCheckoutContinue}
				checkoutCancelled ={this.onCheckoutCancel}
				/>
				<Route path={this.props.match.path + '/contact-form'} 
					render={() => 
						<ContactForm 
							history={this.props.history}/>
				}/>	
			</div>

		return summary;
	}
}

const mapStateToProps = ({burger}) => ({
	ingredients : burger.ingredients
})

export default connect(mapStateToProps)(Checkout);