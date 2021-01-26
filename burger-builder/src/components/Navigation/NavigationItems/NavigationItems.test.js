import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    let wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> item elements if not Authenticated', () => {
      wrapper = shallow(<NavigationItems />);
      expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> item elements if not Authenticated', () => {
      wrapper = shallow(<NavigationItems isAuthenticated/>);
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

});
