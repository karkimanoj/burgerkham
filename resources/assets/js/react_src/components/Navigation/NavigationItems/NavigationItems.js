import React, {Fragement} from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
	let navigationItems = (
		<ul className='NavigationItems' onClick={props.closed}>
			<NavigationItem link='/'  exact> Burgr Builder </NavigationItem>
			<NavigationItem link='/login' > Login </NavigationItem> 
			<NavigationItem link='/register' > Register </NavigationItem>
		</ul>
	);

	if(props.isAuthenticated)
		navigationItems =(
			<ul className='NavigationItems' onClick={props.closed}>
			    <NavigationItem link='/'  exact> Burgr Builder </NavigationItem>
				<NavigationItem link='/orders' > orders </NavigationItem>
				<NavigationItem link='/logout' > Log Out </NavigationItem>
			</ul>
		);
	
	return (
		navigationItems
	);
}

export default NavigationItems;