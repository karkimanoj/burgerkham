import reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
	it(' should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			idToken : null,
			localId : null,
			email : null,
			loading : false,
			error : null
		});
	});

	it(' should return new state', () => {
		expect(reducer({
			idToken : null,
			localId : null,
			email : null,
			loading : false,
			error : null
		}, {
			type : actionTypes.AUTH_SUCCESS,
			idToken : 'data idToken',
			localId :'data localId',
			email : 'data email' 
		})).toEqual({
			idToken : 'data idToken',
			localId : 'data localId',
			email : 'data email',
			loading : false,
			error : null
		});
	});

});