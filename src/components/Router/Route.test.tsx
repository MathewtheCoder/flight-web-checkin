import React from 'react';
import { shallow, toJson } from 'tests/enzyme';
import Router from './Router';

describe('Router tests', () => {

  it('renders correctly Router', () => {
    const wrapper = shallow(<Router />);
    // Expect the wrapper object to be defined
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});