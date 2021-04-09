import React from 'react';
import { shallow, toJson } from 'tests/enzyme';
import PersonalInfoContainer from './PersonalInfoContainer';

describe('PersonalInfoContainer tests', () => {

  it('renders correctly PersonalInfoContainer page', () => {
    const wrapper = shallow(<PersonalInfoContainer />);
    // Expect the wrapper object to be defined
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});