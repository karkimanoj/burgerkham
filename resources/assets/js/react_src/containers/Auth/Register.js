import React,{Component} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import {authenticateUser} from '../../store/actions';

const schema = yup.object().shape({
	name : yup.string().required().min(3).max(255),
	email : yup.string().required().email(),
	password : yup.string().required().min(6).max(255)
});

class Register extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			signUpform : {
				name : '',
				email : '',
				password : ''
			},
			touched : {
				name : false,
				email : false,
				password : false
			},
			validationErrors : null,
		}

		this.onInputchange = this.onInputchange.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this)
	}

	onInputchange(e) {
		const {name, value} = e.target;
		this.setState((prevState) => {
			const updatedsignUpform = {
				...this.state.signUpform,
				[name] : value
			};
			const updatedTouched = {
				...this.state.touched,
				[name] : true,
			};
			return {signUpform : updatedsignUpform, touched : updatedTouched };
		});
		this.validateForm();
	}

	onInputBlur(e) {
		const {name} = e.target;
		this.setState((prevState) => {
			const updatedTouched = {
				...this.state.touched,
				[name] : true,
			};
			return {touched : updatedTouched };
		});
		this.validateForm();
	}
	
	validateForm() {

		schema.validate(this.state.signUpform, {abortEarly : false})
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
		e.preventDefault(); console.log(this.state);
		
		this.props.authenticateUser(this.state.signUpform, true);
	
	}	

	render () {	//console.log(this.state.validationErrors);

		const formElements = {
			name : {
				elementType : 'input',
				elementConfig : {
					name : 'name',
					type : 'text',
					placeholder : 'Name'
				}
			},
			email : {
				elementType : 'input',
				elementConfig : {
					name : 'email',
					type : 'email',
					placeholder : 'Email'
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

		const {signUpform, validationErrors, touched } = this.state;
		
		let form =(
			<form className='mt-2' onSubmit={this.onFormSubmit}>
				<center><h3 className='mb-3'> 
					Sign Up
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
							value = {signUpform[el]}
							changed = {this.onInputchange}
							blured = {this.onInputBlur}
							error = {vError}
							touched = {touched[el]}/>	
					})
				}

				<div className='form-group text-center'>
					<button type = 'submit' 
						disabled = { !schema.isValidSync(signUpform) }
						className = 'btn btn-lg btn-success text-center'>
					 	{this.props.loading ? 'submitting...' : 'SUBMIT'} 
					</button>
				</div>					
			</form>				
		);		

		//if(this.props.loading) form = <Spinner/>
		{/*this.isAuthenticated && <Redirect to='/' />*/}
		return (
			<div className='row'>
				<div className='col-md-8 offset-md-2 mt-4 form-shadow'>
					{form}
				</div>
			</div>
					
		);
	}
}

const mapStateToProps = ({auth}) => ({
	loading : auth.loading,
	error : auth.error
});

export default connect(mapStateToProps, {authenticateUser})(Register);
