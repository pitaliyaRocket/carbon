import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import FooterWrapper from './FooterWrapper';
import Button from '../Button';

import HeaderContainer from '../UIShell/HeaderContainer';
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  // Temporarily comment these out until they are needed again
  // SideNavHeader,
  // SideNavDetails,
  // SideNavSwitcher,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from '../UIShell';

import {
  Search20,
  Notification20,
  AppSwitcher20,
} from '@rocketsoftware/icons-react';

const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true">
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);

const StoryContent = () => {
  const content = (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-13">
          <h2 style={{ fontWeight: '800', margin: '30px 0', fontSize: '20px' }}>
            Purpose and function
          </h2>
          <p style={{ lineHeight: '20px' }}>
            The shell is perhaps the most crucial piece of any UI built with
            Carbon. It contains the shared navigation framework for the entire
            design system and ties the products in IBM’s portfolio together in a
            cohesive and elegant way. The shell is the home of the topmost
            navigation, where users can quickly and dependably gain their
            bearings and move between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the shell
            ensures compliance with IBM design standards, simplifies development
            efforts, and provides great user experiences. All IBM products built
            with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the “shell” of MacOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top of
            the screen, as well as a universal dock along the bottom or side of
            the screen. The Carbon UI shell is roughly analogous in function to
            these parts of the Mac UI. For example, the app switcher portion of
            the shell can be compared to the dock in MacOS.
          </p>
          <h2 style={{ fontWeight: '800', margin: '30px 0', fontSize: '20px' }}>
            Header responsive behavior
          </h2>
          <p style={{ lineHeight: '20px' }}>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            “hamburger” menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2 style={{ fontWeight: '800', margin: '30px 0', fontSize: '20px' }}>
            Secondary navigation
          </h2>
          <p style={{ lineHeight: '20px' }}>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and category
            lists can be used in the side-nav and may be mixed together. There
            are several configurations of the side-nav, but only one
            configuration should be used per product section. If tabs are needed
            on a page when using a side-nav, then the tabs are secondary in
            hierarchy to the side-nav.
            <br />
            <br />
            If you are using side-nav alongside the header and header-container
            as well as specifying the defaultExpanded prop, globalExpand is then
            required.
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <Content id="main-content" style={{ padding: 0 }}>
      {content}
    </Content>
  );
};

const props = () => ({
  id: text('Dropdown ID (id)', 'carbon-dropdown-example'),
  inZowe: boolean('In Zowe', false),
  className: text('Classname', 'classname'),
});

export default {
  title: 'RocketPatterns/FooterWrapper',
  decorators: [withKnobs],
  parameters: {
    component: FooterWrapper,
  },
};

export const SetWidth = () => (
  <div style={{ width: 200 + 'vh' }}>
    <FooterWrapper {...props()}>
      <Button kind="secondary">Button</Button>
      <Button kind="primary">Button</Button>
    </FooterWrapper>
  </div>
);

export const SideNavRail = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}>
              <AppSwitcher20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        <SideNav
          aria-label="Side navigation"
          isRail
          expanded={isSideNavExpanded}>
          <SideNavItems>
            <SideNavMenu renderIcon={Fade16} title="Category title">
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
              <SideNavMenuItem
                isActive
                aria-current="page"
                href="javascript:void(0)">
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Fade16} title="Category title">
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
              <SideNavMenuItem
                aria-current="page"
                isActive
                href="javascript:void(0)">
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Fade16} title="Category title">
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
              <SideNavMenuItem
                isActive
                aria-current="page"
                href="javascript:void(0)">
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
            </SideNavMenu>
            <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
              Link
            </SideNavLink>
            <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
              Link
            </SideNavLink>
          </SideNavItems>
        </SideNav>
        <StoryContent />
        <FooterWrapper {...props}>
          <div style={{ textAlign: 'right' }}>
            <Button kind="secondary">Button</Button>
            <Button style={{ marginLeft: 1 + 'rem' }} kind="primary">
              Button
            </Button>
          </div>
        </FooterWrapper>
      </>
    )}
  />
);

SideNavRail.story = {
  name: 'SideNav Rail w/ Header',
};
