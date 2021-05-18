import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import TourTooltip from '../TourTooltip';
const props = {
  default: () => ({
    title: 'Tooltip Title: Text',
    description: `Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    onNext: () => alert('next'),
    onPrev: () => alert('prev'),
    onClose: () => alert('close'),
  }),
};

export default {
  title: 'RocketPatterns/TourTooltip',
  decorators: [withKnobs],
  parameters: {
    component: TourTooltip,
  },
};

export const _Default = () => <TourTooltip {...props.default()} />;

export const CustomLabels = () => (
  <TourTooltip
    {...props.default()}
    nextLabel={'Next Page'}
    closeLabel={'End Tour'}
    prevLabel={'Back'}
  />
);

export const HiddenInputs = () => (
  <TourTooltip
    {...props.default()}
    nextLabel={text('Next label', 'Next Page')}
    closeLabel={text('Close label', 'End Tour')}
    prevLabel={text('Prev label', 'Back')}
    hideClose={boolean('Hide "close" button', true)}
    hidePrev={boolean('Hide "previous" button', true)}
    hideNext={boolean('Hide "next" button', false)}
    hideCheckbox={boolean('Hide checkbox', true)}
    checkboxLabel={text('Checkbox label', undefined)}
  />
);

export const WithFlip = () => (
  <TourTooltip
    {...props.default()}
    enableFlip
    flippedTitle={'Secondary Title'}
    flippedDescription={`It is an ancient Mariner,
          And he stoppeth one of three.
          'By thy long grey beard and glittering eye,
          Now wherefore stopp'st thou me? `}
    nextLabel={'Next Page'}
    closeLabel={'End Tour'}
    prevLabel={'Back'}
  />
);
