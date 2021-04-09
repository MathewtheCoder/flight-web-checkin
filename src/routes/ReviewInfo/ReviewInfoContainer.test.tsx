import React from 'react';
import { shallow, toJson } from 'tests/enzyme';
import ReviewInfoContainer from './ReviewInfoContainer';

describe('ReviewInfoContainer tests', () => {
  it('renders correctly ReviewInfoContainer page', () => {
    const wrapper = shallow(<ReviewInfoContainer />);
    // Expect the wrapper object to be defined
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});