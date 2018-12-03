import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authenticateUser = (authData, isSignUp) => {
	

	let URL = '/api/register';
	if (!isSignUp)
		URL = '/api/login';
	
	return dispatch => {
		dispatch(authStart()); 

		axios.post(URL, authData)
		.then(response => {		console.log(response);	
			dispatch(authSuccess(response.data.data));

			const expirationDate = new Date(new Date().getTime() + 3600*1000)
			localStorage.setItem('idToken', response.data.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('localId', response.data.data.localId);	
			localStorage.setItem('email', response.data.data.email);		

			return Promise.resolve(3600);
		})
		.then(expiresIn => {
			console.log('email checck',localStorage.getItem('email'));
			dispatch(checkAuthTimeout(expiresIn));
			//console.log('expiresIn', expiresIn);
		})
		.catch(errorbag => { console.log(response);
			dispatch(authFailed(errorbag.response.data.error.message));
		});  
	} 
}

export const authStart = () => {
	return {
		type : actionTypes.AUTH_START
	};
}

export const authSuccess = (data) => {

	return {
		type : actionTypes.AUTH_SUCCESS,
		idToken : data.idToken,
		localId :data.localId,
		email : data.email 
	};
}

export const authFailed = (error) => {
	return {
		type : actionTypes.AUTH_FAILED,
		error 
	};
}

export const checkAuthTimeout = (expiresIn = 3600) => {
	return dispatch => {
		//converting expiresIn from seconds to misiseconds
		setTimeout(() => dispatch(authLogout()), expiresIn * 1000);
	}
}

export const authLogout = () => {
	localStorage.removeItem('idToken');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('localId');
	localStorage.removeItem('email');		
	return {
		type : actionTypes.AUTH_LOGOUT
	}
}

export const authCheckState = () => {
	return dispatch => {
		const idToken = localStorage.getItem('idToken');
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		const localId = localStorage.getItem('localId');
		const email = localStorage.getItem('email');		
		const data = {idToken, localId, email};

		if(idToken && expirationDate >= new Date())
		{	console.log(data)
			dispatch(authSuccess(data));
			//converting miliseconds to seconds
			dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
			
		} else
			dispatch(authLogout());
	}
};