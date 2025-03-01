/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import { settings } from '@rocketsoftware/carbon-components';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { CARBON_SIDENAV_ITEMS } from './_utils';
import SideNavFooter from './SideNavFooter';

const { prefix } = settings;

const SideNav = React.forwardRef(function SideNav(props, ref) {
  const {
    expanded: expandedProp,
    defaultExpanded,
    globalExpand,
    isChildOfHeader,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    onToggle,
    className: customClassName,
    // translateById: t,
    isFixedNav,
    isRail,
    isPersistent,
    addFocusListeners,
    addMouseListeners,
    onOverlayClick,
    ...other
  } = props;

  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedViaHoverState, setExpandedViaHoverState] = useState(false);
  const [expandedViaFocusState, setExpandedViaFocusState] = useState(false);
  const [toggleState, setToggleState] = useState(() => {
    if (globalExpand !== undefined && controlled && defaultExpanded == true) {
      globalExpand();
      return false;
    }
    if (globalExpand == undefined && !controlled && defaultExpanded == true) {
      return true;
    }
    return false;
  });
  const expanded =
    expandedProp ||
    expandedViaHoverState ||
    expandedViaFocusState ||
    toggleState;

  const handleToggle = (event, value = !toggleState) => {
    if (onToggle) {
      onToggle(event, value);
    }
    if (controlled || isRail) {
      setToggleState(value);
    }
  };

  const handleHover = (value) => {
    if (expandedViaHoverState !== value && (controlled || isRail)) {
      setExpandedViaHoverState(value);
    }
  };

  const debounceHandleHover = debounce((value) => handleHover(value), 500);

  const handleFocus = (value) => {
    if (controlled || isRail) {
      setExpandedViaFocusState(value);
    }
  };

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  // const assistiveText = expanded
  //   ? t('carbon.sidenav.state.open')
  //   : t('carbon.sidenav.state.closed');

  const className = cx({
    [`${prefix}--side-nav`]: true,
    [`${prefix}--side-nav--expanded`]: expanded,
    [`${prefix}--side-nav--collapsed`]:
      (!expanded && isFixedNav) || (controlled && !expanded && !isRail),
    [`${prefix}--side-nav--rail`]: isRail,
    [customClassName]: !!customClassName,
    [`${prefix}--side-nav--ux`]: isChildOfHeader,
    [`${prefix}--side-nav--hidden`]: !isPersistent,
  });

  const overlayClassName = cx({
    [`${prefix}--side-nav__overlay`]: true,
    [`${prefix}--side-nav__overlay-active`]: expanded || expandedViaHoverState,
  });

  let childrenToRender = children;

  // if a rail, pass the expansion state as a prop, so children can update themselves to match
  if (isRail) {
    childrenToRender = React.Children.map(children, (child) => {
      // if we are controlled, check for if we have hovered over or the expanded state, else just use the expanded state (uncontrolled)
      let currentExpansionState = controlled
        ? expandedViaHoverState || expanded
        : expanded;
      // avoid spreading `isSideNavExpanded` to non-Carbon UI Shell children
      return React.cloneElement(child, {
        ...(CARBON_SIDENAV_ITEMS.includes(child.type?.displayName)
          ? {
              isSideNavExpanded: currentExpansionState,
            }
          : {}),
      });
    });
  }

  let eventHandlers = {};

  if (addFocusListeners) {
    eventHandlers.onFocus = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleFocus(true);
      }
    };
    eventHandlers.onBlur = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleFocus(false);
      }
    };
  }

  if (addMouseListeners && isRail) {
    eventHandlers.onMouseEnter = () => debounceHandleHover(true);
    eventHandlers.onMouseLeave = () => debounceHandleHover(false);
  }

  return (
    <>
      {isFixedNav ? null : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={overlayClassName} onClick={onOverlayClick} />
      )}
      <nav
        aria-hidden={!expanded}
        ref={ref}
        className={`${prefix}--side-nav__navigation ${className}`}
        {...accessibilityLabel}
        {...eventHandlers}
        {...other}>
        {childrenToRender}
        {expandedProp !== undefined || isFixedNav ? null : (
          <SideNavFooter
            // assistiveText={assistiveText}
            expanded={toggleState}
            onToggle={handleToggle}
          />
        )}
      </nav>
    </>
  );
});

SideNav.defaultProps = {
  // TO-DO: comment back in when footer is added for rails
  // translateById: (id) => {
  //   const translations = {
  //     'carbon.sidenav.state.open': 'Close',
  //     'carbon.sidenav.state.closed': 'Open',
  //   };
  //   return translations[id];
  // },
  defaultExpanded: false,
  isChildOfHeader: true,
  isFixedNav: false,
  isPersistent: true,
  addFocusListeners: true,
  addMouseListeners: true,
};

SideNav.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners: PropTypes.bool,

  /**
   * Specify whether mouse entry/exit listeners are added. They are by default.
   */
  addMouseListeners: PropTypes.bool,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * If `true`, the SideNav will be open on initial render.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * If `true`, the SideNav will be expanded, otherwise it will be collapsed.
   * Using this prop causes SideNav to become a controled component.
   */
  expanded: PropTypes.bool,

  /**
   * Provide the callback function from HeaderContainer
   */
  globalExpand: PropTypes.func,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  isChildOfHeader: PropTypes.bool,

  /**
   * Specify if sideNav is standalone
   */
  isFixedNav: PropTypes.bool,

  /**
   * Specify if the sideNav will be persistent above the lg breakpoint
   */
  isPersistent: PropTypes.bool,

  /**
   * Optional prop to display the side nav rail.
   */
  isRail: PropTypes.bool,

  /**
   * An optional listener that is called when the SideNav overlay is clicked
   *
   * @param {object} event
   */
  onOverlayClick: PropTypes.func,

  /**
   * An optional listener that is called when an event that would cause
   * toggling the SideNav occurs.
   *
   * @param {object} event
   * @param {boolean} value
   */
  onToggle: PropTypes.func,

  /**
   * Provide a custom function for translating all message ids within this
   * component. This function will take in two arguments: the mesasge Id and the
   * state of the component. From this, you should return a string representing
   * the label you want displayed or read by screen readers.
   */
  translateById: PropTypes.func,
};

export default SideNav;
