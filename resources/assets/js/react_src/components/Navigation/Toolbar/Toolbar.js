import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../Sidebar/SideDrawerToggle/SideDrawerToggle';

const ToolBar = props => (
	<header className='ToolBar'>
		<SideDrawerToggle clicked ={props.sideDrawerToggleClicked}/>
		<div> 
			<Logo /> 
		</div>
		<nav className='ToolbarDesktopOnly'>
			<NavigationItems isAuthenticated={props.isAuthenticated}/>
		</nav>
	</header>
);

export default ToolBar;