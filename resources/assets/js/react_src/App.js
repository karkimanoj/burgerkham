import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout';

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';

import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {authCheckState} from './store/actions';

class App extends Component {

	componentDidMount() {
		this.props.tryAutoLogin();
	}

	render() { 
		
		let routes = (
			<Switch>
			  	<Route path='/login' component={Login}/>	
			  	<Route path='/register' component={Register}/>	
			  	<Route path='/' exact component={BurgerBuilder}/>
			  	<Redirect to='/' />	
		  	</Switch>
		);
		
		if(this.props.isAuthenticated)
			routes = (
				<Switch>
				  	<Route path='/logout' component={Logout}/>
				  	<Route path='/checkout' component={Checkout}/>
				  	<Route path='/orders'  component={Orders}  />
					<Route path='/' exact component={BurgerBuilder}/>
					<Redirect to='/' />	
				</Switch>
			);
		

	return (
	  <Layout >
	    <div style = {{marginTop : '56px'}}>
		  {routes}
		 </div>
	  </Layout>
	);
	}
}

const mapStateToProps = ({auth}) => { 
	return { isAuthenticated : auth.idToken !== null};
}

//withRouter HOC is used bcoz the react-router-dom Route is breaked by connect HOC
export default withRouter(connect(mapStateToProps, {tryAutoLogin: authCheckState})(App));
