/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';
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

const readmeURL = 'https://bit.ly/2Z9PGsC';
const props = {
  default: () => {
    return {
      onClick: action('onClick'),
      onFocus: action('onFocus'),
      className: text('class name', 'some-class'),
      // iconName: text('icon name', 'Add16'),
      description: text('description', 'description'),
    };
  },
};

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add(
    'card',
    () => {
      return (
        <Card {...props.default()}>
          <CardContent
            cardTitle="Card Name"
            cardInfo={[
              'Lorem ipsum sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
            ]}
            cardLink={[
              <a href="#" class="bx--link bx--card-footer__link">
                Link
              </a>,
            ]}>
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
    },
    {
      info: {
        /* eslint-disable no-useless-escape */
        text: `
        Cards provide an at-a glance preview of the content they link to and frequently contain
        easily-consumable content. The example below shows an empty card. Create Card Content, Card Footer,
        Card Status and Card Actions components to add content to your card.
          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
        /* eslint-enable no-useless-escape */
      },
    }
  )
  .add(
    'card with custom items',
    () => {
      return (
        <Card {...props.default()}>
          <CardContent
            cardTitle="Card Name"
            cardInfo={[
              'Lorem ipsum sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
            ]}
            cardLink={[
              <a href="#" class="bx--link bx--card-footer__link">
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
            ]}>
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
    },
    {
      info: {
        /* eslint-disable no-useless-escape */
        text: `
        Cards provide an at-a glance preview of the content they link to and frequently contain
        easily-consumable content. The example below shows an empty card. Create Card Content, Card Footer,
        Card Status and Card Actions components to add content to your card.
          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
        /* eslint-enable no-useless-escape */
      },
    }
  );
