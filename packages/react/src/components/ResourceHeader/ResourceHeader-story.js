import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ResourceHeader from './ResourceHeader';
import {
  Breadcrumb,
  BreadcrumbItem,
} from '@rocketsoftware/carbon-components-react';

const props = {
  simple: () => ({
    title: text('Title', 'Page Header'),
    subtitle: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium varius dolor, elementum vestibulum massa congue nec. Fusce at massa vitae urna mattis vestibulum. Pellentesque semper dolor ipsum, et rutrum libero molestie et. Curabitur in facilisis magna. Sed est libero, pellentesque vel accumsan ut, aliquet feugiat nunc.',
    ],
  }),
};

export default {
  title: 'RocketPatterns/ResourceHeader',
  decorators: [withKnobs],
  parameters: {
    component: ResourceHeader,
  },
};

export const PageHeader = () => (
  <div style={{ width: 80 + '%' }}>
    <ResourceHeader
      renderBreadcrumbs={() => (
        <Breadcrumb>
          <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
          <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        </Breadcrumb>
      )}
      {...props.simple()}
    />
  </div>
);
