import React from 'react';
import { shallow, toJson } from 'tests/enzyme';
import App from './App';

describe('App tests', () => {
  it('renders correctly App page', () => {
    const wrapper = shallow(<App />);
    // Expect the wrapper object to be defined
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});