import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import {
  FlatProgressIndicator,
  FlatProgressStep,
} from '../FlatProgressIndicator';
import FlatProgressIndicatorSkeleton from '../FlatProgressIndicator/FlatProgressIndicator.Skeleton';
import Tooltip from '../Tooltip';
import { settings } from '@rocketsoftware/carbon-components';

const { prefix } = settings;

export default {
  title: 'RocketPatterns/FlatProgressIndicator',
  decorators: [withKnobs],
  parameters: {
    component: FlatProgressIndicator,
  },
};

export const _Default = () => (
  <FlatProgressIndicator
    currentIndex={number('Current progress (currentIndex)', 1)}>
    <FlatProgressStep
      label="First step"
      description="Step 1: Getting started with Carbon Design System"
      secondaryLabel="Optional label"
      skip
    />
    <FlatProgressStep
      label="Second step with tooltip"
      description="Step 2: Getting started with Carbon Design System"
      renderLabel={() => (
        <Tooltip
          direction="bottom"
          showIcon={false}
          triggerClassName={`${prefix}--progress-label`}
          triggerText={'Second step with tooltip'}
          tooltipId="tooltipId-0">
          <p>Overflow tooltip content.</p>
        </Tooltip>
      )}
    />
    <FlatProgressStep
      label="Third step with tooltip"
      description="Step 3: Getting started with Carbon Design System"
      renderLabel={() => (
        <Tooltip
          direction="bottom"
          showIcon={false}
          triggerClassName={`${prefix}--progress-label`}
          triggerText={'Third step with tooltip'}
          tooltipId="tooltipId-1">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
            consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
            blanditiis cumque maxime tenetur veniam est illo deserunt sint quae
            pariatur. Laboriosam, consequatur.
          </p>
        </Tooltip>
      )}
    />
    <FlatProgressStep
      label="Fourth step"
      description="Step 4: Getting started with Carbon Design System"
      invalid
      secondaryLabel="Example invalid step"
    />
    <FlatProgressStep
      label="Fifth step"
      description="Step 5: Getting started with Carbon Design System"
      disabled
    />
  </FlatProgressIndicator>
);

export const interactive = () => (
  <FlatProgressIndicator
    currentIndex={number('Current progress (currentIndex)', 1)}
    onChange={action('onChange')}>
    <FlatProgressStep
      label="Click me"
      description="Step 1: Register a onChange event"
    />
    <FlatProgressStep
      label="Really long label"
      description="The progress indicator will listen for clicks on the steps"
    />
    <FlatProgressStep
      label="Tooltip and really long label"
      description="The progress indicator will listen for clicks on the steps"
      renderLabel={() => (
        <Tooltip
          direction="bottom"
          showIcon={false}
          triggerClassName={`${prefix}--progress-label`}
          triggerText="Tooltip and really long label"
          tooltipId="tooltipId-1">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
            consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
            blanditiis cumque maxime tenetur veniam est illo deserunt sint quae
            pariatur. Laboriosam, consequatur.
          </p>
        </Tooltip>
      )}
    />
  </FlatProgressIndicator>
);

export const skeleton = () => <FlatProgressIndicatorSkeleton />;
