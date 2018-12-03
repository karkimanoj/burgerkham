import * as actionTypes from './actionTypes';
import axios from 'axios';

export function orderBurgerStart() {
	return {
		type : actionTypes.ORDER_BURGER_START
	};
}

export function orderBurgerSuccess() {
	return {
		type : actionTypes.ORDER_BURGER_SUCCESS,
	};
}

export function orderBurgerFailed() {
	return {
		type : actionTypes.ORDER_BURGER_FAILED
	};
}

export function orderBurgerInit(order, successCallback) {
	return (dispatch, getState) => {

		const {idToken} = getState().auth;
		dispatch(orderBurgerStart());
		//can use authorization header to attach token to axios request like this
		//let config = { headers: { Authorization: `Bearer ${idToken}` } };

		axios.post(`/api/order`, order, config
		).then( response => {
			dispatch(orderBurgerSuccess())			
		})/*.then( 
			() => successCallback()
		)*/.catch( error => {
			dispatch(orderBurgerFailed());
		});
		
	}
}

export function fetchOrdersFailed() {
	return { type : actionTypes.FETCH_ORDERS_FAILED }
}

export function fetchOrdersSuccess(orders) {
	return {
		type : actionTypes.FETCH_ORDERS_SUCCESS,
		orders
	};
}

export function fetchOrders() {
	return (dispatch, getState) => {
		const {idToken, localId} = getState().auth;
		//localId is userId
		//const params = `?token=${idToken}`;
		let config = { headers: { Authorization: `Bearer ${idToken}` } };
		axios.get('/api/order', config)
		.then( response => //console.log(response) 
			dispatch(fetchOrdersSuccess(response.data.data))
		).catch( error => 
			dispatch(fetchOrdersFailed())
		);
	}
}