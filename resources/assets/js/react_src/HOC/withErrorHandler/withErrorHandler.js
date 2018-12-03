import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {

		constructor (props) {
			super(props);
			this.state = { errors : null };
			this.errorConfirmedHandler = this.errorConfirmedHandler.bind(this);
			/* interceptors are set in constructor bcoz interceptors should be set before axios 
			  request is made in <WrappedComponent /> . setting interceptors in 
			  componentWillMount also works but componentWillMount is depreciated.		
			*/
			this.reqInterceptors = axios.interceptors.request.use(request => {

				this.setState({errors : null}); 
				return request;
			});

			this.resInterceptors = axios.interceptors.response.use(
				response => response,
				error => { console.log(error);
					this.setState({errors : error});
					return Promise.reject(error);
				}
			);

		}

		componentWillUnmount () {
			/*
			every time this class component is created while using this HOC, intercetors are also
			created and the previous interceptors are stored in memory. so when the component
			is destroyed the interceptors needs to be ejected (removed)
			*/
			//console.log('before intercetors status', this.reqInterceptors, this.resInterceptors);
			axios.interceptors.request.eject(this.reqInterceptors);
			axios.interceptors.response.eject(this.resInterceptors);
			
		}
		
		errorConfirmedHandler (confirm) {
			if(!confirm) confirm = null;
			this.setState({errors : confirm});
		}

		render () {

			return (
				<Fragment>
					<Modal show={this.state.errors} modalClose={this.errorConfirmedHandler}> 
						{this.state.errors ? this.state.errors.message : null} 
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			);
		}
	}
	
};

export default withErrorHandler;

