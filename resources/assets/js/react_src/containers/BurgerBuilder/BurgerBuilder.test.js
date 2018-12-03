import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BurgerControls from '../../components/BurgerControls/BurgerControls';

configure({adapter : new Adapter()});

describe('<BurgerBuilder />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder building/>);
	});

	it('should have <BurgerControls/>', () => {
		wrapper.setProps({ingredients : {salad : { quantity: 0, unitPrice : 0.5}}});
		expect(wrapper.find(BurgerControls)).toHaveLength(1);
	});
});