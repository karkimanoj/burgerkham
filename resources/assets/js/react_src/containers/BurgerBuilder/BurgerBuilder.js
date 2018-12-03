import React, {Fragment, Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import {addIngredient, removeIngredient, fetchIngredients, resetBurgerBuilding} 
	from '../../store/actions/index';

export class BurgerBuilder extends Component {

	constructor (props){
		super(props);
		this.state = {
			purchasing : false,
		};

		this.handlePurchase = this.handlePurchase.bind(this);
		this.handleContinuePurchase = this.handleContinuePurchase.bind(this);
		
	}
	
	componentDidMount () {

		if(!this.props.building) 
			this.props.fetchIngredients();
	}

	handlePurchase (purchase) {
		if(this.props.isAuthenticated)
			this.setState({purchasing : purchase});
		else 
			this.props.history.push('/register');
	}

	handleContinuePurchase () {
		this.props.resetBurgerBuilding();
		this.props.history.push({
			pathname : '/checkout',
		});
	}

	render () {  
	console.log('purchasing', this.state.purchasing);
		const {ingredients, totalPrice, error} = this.props;
		const optIngredients = {};
		
		for(let key in ingredients)
			optIngredients[key] = ingredients[key].quantity;
		
		let orderSummary = null;		
		let burgerInterface = <Spinner />;
		
		if (error) 
			burgerInterface = <center> <h1 className='mt-5 text-danger'> 
				Ingredients loading failed! 
			</h1></center>;
		else
		{
			if(ingredients) {
				burgerInterface = (
					<Fragment>
						<div className='col-md-12'>
							<Burger ingredients={optIngredients} />
						</div>
						<div className='w-100'></div>
						<div className='col-md-12'>
							<BurgerControls ingredients={optIngredients}
							addIngredient= {this.props.addIngredient} 
							removeIngredient= {this.props.removeIngredient}
							totalPrice= {totalPrice} 
							handlePurchase= {this.handlePurchase}
							isAuthenticated= {this.props.isAuthenticated}/>	
						</div>
					</Fragment>
				);

				orderSummary = <OrderSummary  
					purchaseCanceled={this.handlePurchase}  
					orderDetails={optIngredients}
					purchaseContiued={this.handleContinuePurchase}
					totalPrice={totalPrice} />;
			}
		}
		//if(this.state.loading) orderSummary = <Spinner />;		

		return(
			<div className='row' className='gap-height'>
				<Modal show={this.state.purchasing} modalClose={this.handlePurchase}>
					{orderSummary}
				</Modal>
				 {burgerInterface}
			</div>
		);
	}
}

const mapStateToProps = ({burger, auth}) => ({
	ingredients : burger.ingredients,
	totalPrice : burger.totalPrice,
	error : burger.error,
	building : burger.building,
	isAuthenticated : auth.idToken !== null
});

const mapDispatchToProps = {addIngredient, removeIngredient, fetchIngredients, resetBurgerBuilding};

export default connect(mapStateToProps, mapDispatchToProps
	)(withErrorHandler(BurgerBuilder, axios));   