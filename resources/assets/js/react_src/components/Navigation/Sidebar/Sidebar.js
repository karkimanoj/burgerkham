import React, { Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'; 
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidebar = (props) => {
	let attachedClasses = 'SideDrawer Close';
	if(props.open) attachedClasses = 'SideDrawer Open';

	return (
		<Fragment>
			<Backdrop show= {props.open} clicked={props.closed}/>
			<div className={attachedClasses}>

				<div>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuthenticated} closed={props.closed}/>
				</nav>
			</div>
		</Fragment>
	);
};

export default Sidebar;