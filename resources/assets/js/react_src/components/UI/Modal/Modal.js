import React, {Component, Fragment} from'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	
	shouldComponentUpdate (nextProps, nextState) {
		/*
		  updates modal component only if show prop changes otherwise not required 
		  to rerender. To check this lifecycle hooks working and if modal rerenders, 
		  console.log some text inside componentWillUpdate	
		*/
		return (nextProps.show !== this.props.show) || (nextProps.children !==this.props.children) ;
	}
	

	render () {
		return (
			<Fragment>	
				<Backdrop 
					show = {this.props.show} 
					clicked={() => this.props.modalClose(false)}
				/>
				<div className='Modal' style={{
					transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: this.props.show ? '1' : '0' 
				}}>
					{this.props.children}
				</div>
			</Fragment>
		);
	}

} 

export default Modal;