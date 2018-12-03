import React,{Component} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import {authenticateUser} from '../../store/actions';

const schema = yup.object().shape({
	email : yup.string().required().email(),
	password : yup.string().required().min(6).max(255)
});

class Login extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			loginForm : {
				email : '',
				password : ''
			},
			touched : {
				email : false,
				password : false
			},
			validationErrors : null
			//loading : false,
			//error : null
		}
		this.onInputchange = this.onInputchange.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this)
	}

	onInputchange(e) {
		const {name, value} = e.target;
		this.setState((prevState) => {
			const updatedLoginForm = {
				...this.state.loginForm,
				[name] : value
			};
			const updatedTouched = {
				...this.state.touched,
				[name] : true
			};
			return {loginForm : updatedLoginForm, touched : updatedTouched };
		});
		this.validateForm();
	}

	onInputBlur(e) {
		const {name} = e.target;
		this.setState((prevState) => {
			const updatedTouched = {
				...this.state.touched,
				[name] : true
			};
			return {touched : updatedTouched };
		});
		this.validateForm();
	}
	
	validateForm() {

		schema.validate(this.state.loginForm, {abortEarly : false})
		.then(() => {
			this.setState({ validationErrors : null });
		})
		.catch((errorBag) => {
			let validationErrors = {};
				for(let error of  errorBag.inner) {
					if(!validationErrors[error.path])
						validationErrors[error.path] = error.message ;
				}
				this.setState({validationErrors});	
		});
	}

	onFormSubmit(e) {
		e.preventDefault();
		
		this.props.authenticateUser(this.state.loginForm, false);
/*
		axios.post('/api/login', this.state.loginForm)
		.then((response) => {
			console.log(response);
			this.setState({loading : false, error : null});
		})
		.catch(error => {
			console.log(error.response);
			this.setState({loading : false, error : error.response.error});
		});
*/
	}	

	render () {	

		const formElements = {
			email : {
				elementType : 'input',
				elementConfig : {
					name : 'email',
					type : 'email',
					placeholder : 'Your email address'
				}
			},
			password : {
				elementType : 'input',
				elementConfig : {
					name : 'password',
					type : 'password',
					placeholder : 'password'
				}
			}
		};

		const {loginForm, validationErrors, touched } = this.state;
		
		let form =(
			<div className='row '>
				<div className='col-md-8 offset-md-2 mt-4 form-shadow'>
					<form className='mt-2' onSubmit={this.onFormSubmit}>
						<center><h3 className='mb-3'> 
							Sign In
						</h3></center>

						{this.props.error && 
							<div className="alert alert-danger" >
							  {this.props.error}
							</div>
						}
						{ 
							
							 
							Object.keys(formElements).map(el => {
								let vError = null;
								if(validationErrors !== null) 
									if(validationErrors.hasOwnProperty(el)) 
										vError = validationErrors[el];	

								return <Input key={el}
									elementType = {formElements[el].elementType}
									elementConfig = {formElements[el].elementConfig}
									value = {loginForm[el]}
									changed = {this.onInputchange}
									blured = {this.onInputBlur}
									error = {vError}
									touched = {touched[el]}/>	
							})
						}

						<div className='form-group text-center'>
							<button type = 'submit' 
								disabled = { !schema.isValidSync(loginForm) }
								className = 'btn btn-lg btn-success text-center'>
							 	{this.props.loading ? 'logging...' : 'login'} 
							</button>
						</div>					
					</form>		
				</div>
			</div>		
		);		

		//if(this.props.loading) form = <Spinner/>
		
		return (
			form
		);
	}
}

const mapStateToProps = ({auth}) => ({
	loading : auth.loading,
	error : auth.error
});

export default connect(mapStateToProps, {authenticateUser})(Login);