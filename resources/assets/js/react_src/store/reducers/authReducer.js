import * as actionTypes from '../actions/actionTypes';

const initialState = {
	idToken : null,
	localId : null,
	email : null,
	loading : false,
	error : null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actionTypes.AUTH_START :
			return {
				...state,
				loading : true,
				error : null
			};
		case actionTypes.AUTH_SUCCESS :

			return {
				...state,
				idToken : action.idToken,
				localId : action.localId,
				email : action.email,
				loading : false
			};
		case actionTypes.AUTH_FAILED :
			return {
				...state,
				loading : false,
				error : action.error
			};	
		case actionTypes.AUTH_LOGOUT :
			return {
				...state,
				idToken : null,
				localId : null,
				email : null,
			};			
		default :
			return state;	
	}
}