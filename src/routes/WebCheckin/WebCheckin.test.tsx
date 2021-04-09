import React from 'react';
import { shallow, toJson } from 'tests/enzyme';
import WebCheckinContainer from './WebCheckinContainer';

describe('WebCheckinContainer tests', () => {

  it('renders correctly ReviewInfoContainer page', () => {
    const wrapper = shallow(<WebCheckinContainer />);
    // Expect the wrapper object to be defined
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});