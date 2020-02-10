import React from 'react';
import { mount } from 'enzyme';
import CardContentItem from './CardContentItem';
import { settings } from '@rocketsoftware/carbon-components';

const { prefix } = settings;

describe('CardContentItem', () => {
  describe('Renders as expected', () => {
    const props = {
      info: 'testinfo 1',
      maxWidth: '10rem',
    };
    const wrapper = mount(<CardContentItem {...props} />);
    const text = wrapper.find('h4');
    it('renders as expected', () => {
      expect(text.hasClass(`${prefix}--about__title--additional-info`)).toEqual(
        true
      );
    });
  });
});
