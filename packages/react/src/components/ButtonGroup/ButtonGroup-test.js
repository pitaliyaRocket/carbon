import React from 'react';
import ButtonGroup from '../ButtonGroup';
import OverflowMenuItem from '../OverflowMenuItem';
import Button from '../Button';
import { mount } from 'enzyme';

describe('ButtonGroup', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <ButtonGroup buttonLabel={'Button Label'}>
        <OverflowMenuItem itemText={'Item 1'} />
        <OverflowMenuItem itemText={'Item 2'} />
        <OverflowMenuItem itemText={'Item 2'} />
      </ButtonGroup>
    );

    it('displays the correct menu text', () => {
      expect(wrapper.find(Button).props().children).toEqual('Button Label');
    });

    it('renders all children as expected', () => {
      const menu = wrapper.find(Button);

      menu.simulate('click');

      expect(wrapper.find('FloatingMenu ul').props().children.length).toEqual(
        3
      );
    });
  });
});
