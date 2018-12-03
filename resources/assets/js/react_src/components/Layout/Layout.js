import React, {Component, Fragment} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import {connect} from 'react-redux';

class Layout extends Component {
	constructor (props) {
		super(props);
		this.state = { showSideDrawer : false };
		this.sideDrawerCloseHandler = this.sideDrawerCloseHandler.bind(this);
		this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
	}
	
	sideDrawerCloseHandler () {
		this.setState({ showSideDrawer : false});
	}

	sideDrawerToggleHandler () {
		this.setState( (prevState) => ({
			showSideDrawer : !prevState.showSideDrawer 
			})
		);

	}

	render () { 
		const {isAuthenticated} = this.props;
		
		return(
			<Fragment>	
				<Toolbar 
					isAuthenticated={isAuthenticated}
					sideDrawerToggleClicked = {this.sideDrawerToggleHandler} 
				/>
				<Sidebar 
					open = {this.state.showSideDrawer} 
					closed = {this.sideDrawerCloseHandler} 
					isAuthenticated={isAuthenticated}
				/>

		        <main >
					{this.props.children}
		        </main>	       
		    </Fragment>    
		);
	}
	
}

const mapStateToProps = ({auth}) => ({ isAuthenticated : auth.idToken !== null})

export default connect(mapStateToProps)(Layout);