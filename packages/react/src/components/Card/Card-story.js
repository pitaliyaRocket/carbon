/* eslint-disable no-console */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import Button from '../Button';
import Link from '../Link';
import Card from './Card';
import CardFooter from '../CardFooter';
import CardContent from '../CardContent';
import CardContentItem from '../CardContentItem';
import mdx from './Card.mdx';

const props = {
  default: () => {
    return {
      onClick: action('onClick'),
      onFocus: action('onFocus'),
      className: text('class name', 'some-class'),
      description: text('description', 'description'),
    };
  },
};

export default {
  title: 'RocketPatterns/Card',
  decorators: [withKnobs],
  parameters: {
    component: Card,
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Card {...props.default()}>
    <CardContent
      cardTitle="Card Name"
      cardInfo={[
        'Lorem ipsum sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      ]}
      /* eslint-disable react/jsx-key, jsx-a11y/anchor-is-valid */
      cardLink={[
        <a href="#" className="bx--link bx--card-footer__link">
          Link
        </a>,
      ]} /* eslint-enable react/jsx-key, jsx-a11y/anchor-is-valid */
    >
      <OverflowMenu>
        <OverflowMenuItem itemText="Stop App" />
        <OverflowMenuItem itemText="Restart App" />
        <OverflowMenuItem itemText="Rename App" />
        <OverflowMenuItem itemText="Delete App" hasDivider />
      </OverflowMenu>
    </CardContent>
    <CardFooter>
      <Button size="small" kind="primary" style={{ width: 10 + '%' }}>
        Button
      </Button>
      <Link href="#" className="bx--card-footer__link">
        Link
      </Link>
    </CardFooter>
  </Card>
);

Default.story = {
  name: 'Card',
};

export const CustomItems = () => (
  <Card {...props.default()}>
    <CardContent
      cardTitle="Card Name"
      cardInfo={[
        'Lorem ipsum sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      ]}
      /* eslint-disable react/jsx-key, jsx-a11y/anchor-is-valid */
      cardLink={[
        <a href="#" className="bx--link bx--card-footer__link">
          Link
        </a>,
      ]}
      cardContentItems={[
        <CardContentItem
          info={
            'Lorem ipsum sit amet, consectetur adipisicing elit, sed do eiusmod tempor'
          }
          maxWidth={'10rem'}
        />,
      ]} /* eslint-enable react/jsx-key, jsx-a11y/anchor-is-valid */
    >
      <OverflowMenu>
        <OverflowMenuItem itemText="Stop App" />
        <OverflowMenuItem itemText="Restart App" />
        <OverflowMenuItem itemText="Rename App" />
        <OverflowMenuItem itemText="Delete App" hasDivider />
      </OverflowMenu>
    </CardContent>
    <CardFooter>
      <Button size="small" kind="primary" style={{ width: 10 + '%' }}>
        Button
      </Button>
      <Link href="#" className="bx--card-footer__link">
        Link
      </Link>
    </CardFooter>
  </Card>
);

CustomItems.story = {
  name: 'Card With Custom Items',
};
