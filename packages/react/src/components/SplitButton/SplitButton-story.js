import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import SplitButton from '../SplitButton';
import OverflowMenuItem from '../OverflowMenuItem';

const sizes = {
  Default: 'default',
  Field: 'field',
  Small: 'small',
};

const props = {
  regular: () => {
    return {
      classNameContainer: 'some-class',
      classNameButton: 'some-class',
      classNameOverflow: 'some-class',
      size: select('Button size (size)', sizes, 'default'),
      disabled: boolean('Disabled (disabled)', false),
    };
  },
  items: () => {
    return {
      onClick: action('onClick'),
    };
  },
};

SplitButton.displayName = 'Button';

export default {
  title: 'RocketPatterns/SplitButton',
  decorators: [withKnobs],
  parameters: {
    component: SplitButton,
  },
};

export const _Default = () => (
  <SplitButton {...props.regular()}>
    <OverflowMenuItem itemText={'Item 1'} {...props.items()} />
    <OverflowMenuItem itemText={'Item 2'} {...props.items()} />
    <OverflowMenuItem itemText={'Item 3'} {...props.items()} />
    <OverflowMenuItem itemText={'Item 4'} {...props.items()} />
  </SplitButton>
);
