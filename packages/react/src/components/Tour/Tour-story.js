import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Tour from '../Tour';
import Button from '../Button';

const targets = (
  <>
    <div
      id="one"
      style={{
        position: 'absolute',
        left: 20,
        top: 20,
        background: 'magenta',
        width: 40,
        height: 40,
      }}
    />

    <Button id="two" style={{ position: 'relative', left: 200 }}>
      I am a button!
    </Button>
    <div
      id="four"
      style={{
        position: 'absolute',
        left: 20,
        top: 280,
        background: 'green',
        width: 340,
        height: 40,
      }}
    />
    <div
      id="five"
      style={{
        position: 'absolute',
        left: -410,
        top: 30,
        background: 'red',
        width: 180,
        height: 180,
      }}
    />
    <div
      id="six"
      style={{
        position: 'absolute',
        left: 670,
        top: 20,
        background: 'orange',
        width: 40,
        height: 350,
      }}
    />
    <div
      id="three"
      style={{
        position: 'absolute',
        left: 20,
        top: 1800,
        background: 'orange',
        width: 40,
        height: 40,
      }}
    />
  </>
);

const steps = {
  default: () => [
    {
      selector: '#one',
      title: 'Welcome To The Tour',
      description: 'Use this component to point out new or important features.',
    },
    {
      selector: '#two',
      movingTarget: true,
      title: 'Interaction',
      description: 'You can interact with the elements being highlighted.',
    },
  ],
  withFlipBeforeClose: () => [
    {
      selector: '#one',
      title: 'Welcome To The Tour',
      description: 'Without flipBeforeClose.',
    },
    {
      selector: '#two',
      movingTarget: true,
      title: 'Interaction',
      description: 'With flipBeforeClose.',
      flipBeforeClose: true,
    },
  ],
  scroll: () => [
    {
      selector: '#one',
      title: 'Welcome To The Tour',
      description: 'Use this component to point out new or important features.',
    },
    {
      selector: '#three',
      description: 'You can scroll to ofscreen elements',
    },
  ],
  secondaryTargets: () => [
    {
      selector: '#one',
      title: 'Welcome To The Tour',
      description: 'Use this component to point out new or important features.',
      hidePrev: true,
      secondarySelectors: ['#four', '#five'],
    },
    {
      selector: '#two',
      movingTarget: true,
      title: 'Interaction',
      description: 'You can interact with the elements being highlighted.',
      hideNext: true,
      secondarySelectors: ['#one', '#four', '#six'],
    },
  ],
};

storiesOf('Pattern|Tour', module)
  .add('default', () => (
    <>
      {targets}
      <Tour steps={steps.default()} />
    </>
  ))
  .add('no mask', () => (
    <>
      {targets}
      <Tour steps={steps.default()} disableMask />
    </>
  ))
  .addDecorator(withKnobs)
  .add('with scrolling', () => (
    <>
      {targets}
      <Tour
        steps={steps.scroll()}
        disableAutoScroll={boolean('disable auto scroll', false)}
        disableSmoothScroll={boolean('disable smooth scroll', false)}
      />
    </>
  ))
  .add('hide buttons', () => (
    <>
      {targets}
      <Tour steps={steps.default()} hidePrev hideNext />
    </>
  ))
  .add('with flip', () => (
    <>
      {targets}
      <Tour
        enableFlip
        steps={steps.default()}
        flippedTitle={'Flipped Title'}
        flippedDescription={
          'Secondary description on the back side of the card. Currently, this is the same for all steps'
        }
      />
    </>
  ))
  .add('with flip before close', () => (
    <>
      {targets}
      <Tour
        steps={steps.withFlipBeforeClose()}
        flippedTitle={'Flipped Title'}
        flippedDescription={
          'Secondary description on the back side of the card. Currently, this is the same for all steps'
        }
      />
    </>
  ))
  .add('with secondary selectors and flip before close', () => (
    <>
      {targets}
      <Tour
        flipBeforeClose
        steps={steps.secondaryTargets()}
        flippedTitle={'Thanks for touring'}
        flippedDescription={
          'Secondary description on the back side of the card. Currently, this is the same for all steps'
        }
      />
    </>
  ));
