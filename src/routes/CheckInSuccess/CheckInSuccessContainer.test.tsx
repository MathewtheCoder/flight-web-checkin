import React from 'react';
import { shallow, toJson } from 'tests/enzyme';
import CheckInSuccessContainer from './CheckInSuccessContainer';

describe('CheckInSuccessContainer tests', () => {

  it('renders correctly CheckInSuccess page', () => {
    const wrapper = shallow(<CheckInSuccessContainer />);
    // Expect the wrapper object to be defined
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});