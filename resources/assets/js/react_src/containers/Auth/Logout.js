import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authLogout} from '../../store/actions'
import {Redirect} from 'react-router-dom';

class Logout extends Component {
	componentDidMount () {
		this.props.authLogout();
	}

	render() {
		return <Redirect to='/' />
	}
}

export default connect(null, {authLogout})(Logout);