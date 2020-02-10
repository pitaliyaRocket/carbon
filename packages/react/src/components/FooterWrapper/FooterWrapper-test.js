import React from 'react';
import { mount } from 'enzyme';

import FooterWrapper from './FooterWrapper';
import Button from '../Button';

describe('FooterWrapper', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      id: 'test-footer',
      className: 'test-class',
      inZowe: false,
    };
  });
  it('should render', () => {
    const wrapper = mount(
      <FooterWrapper {...mockProps}>
        <Button kind="secondary">Button</Button>
        <Button kind="primary">Button</Button>
      </FooterWrapper>
    );
    expect(wrapper.prop('inZowe')).toEqual(false);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.prop('children').length).toEqual(2);
  });
});
