import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import {fetchOrders} from '../../store/actions';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends Component {

	componentDidMount () {
		this.props.fetchOrders();
		this.renderList = this.renderList.bind(this);		
	}
	
	renderList(orders) {
		return Object.keys(orders).map( key => (
			<Order key={key} 
				ingredients={orders[key].ingredients} 
				quantity={orders[key].quantity}
				totalPrice={orders[key].totalPrice} />
		))
	}

	render () { 
		const {orders} = this.props;

		if(orders)
		return(
				<div className='container-fluid mt-3'>
				<h1 className='text-center'> Your Orders ! </h1>
				{ this.renderList(orders) }
			</div>
			);
		else
			return <Spinner />;

		
	}
}

const mapStateToProps = ({order}) => ({orders : order.orders});

export default connect(mapStateToProps, {fetchOrders})(withErrorHandler(Orders, axios));