import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '../Button';
import FloatingMenu, {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
} from '../../internal/FloatingMenu';
import { keys, matches as keyCodeMatches } from '../../internal/keyboard';
import { ButtonKinds } from '../../prop-types/types';
import { ChevronDown16 } from '@rocketsoftware/icons-react';
import ClickListener from '../../internal/ClickListener';
import { settings } from '@rocketsoftware/carbon-components';
import mergeRefs from '../../tools/mergeRefs';

const { prefix } = settings;

const on = (element, ...args) => {
  element.addEventListener(...args);
  return {
    release() {
      element.removeEventListener(...args);
      return null;
    },
  };
};

const getOffset = trigger => {
  const { top } = trigger.getBoundingClientRect();

  return {
    top: top * -1,
    left: 'auto',
  };
};

class ButtonGroup extends Component {
  state = {};

  static propTypes = {
    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

    /**
     * Specify button label
     */
    buttonLabel: PropTypes.string,

    /**
     * Specify button size
     */
    size: PropTypes.oneOf(['default', 'field', 'small']),

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffset: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * Specify button type
     */
    kind: PropTypes.oneOf(ButtonKinds).isRequired,

    /**
     * The menu direction.
     */
    direction: PropTypes.oneOf([DIRECTION_TOP, DIRECTION_BOTTOM]),

    /**
     * Optional callback used to obtain a custom 'viewport' that differs from the window.
     */
    getViewport: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    kind: 'primary',
    size: 'default',
    direction: DIRECTION_BOTTOM,
    menuOffset: getOffset,
  };

  /**
   * The handle of `onfocusin` or `focus` event handler.
   * @private
   */
  _hFocusIn = null;

  /**
   * The timeout handle for handling `blur` event.
   * @private
   */
  _hBlurTimeout;

  /**
   * The element ref of the tooltip's trigger button.
   * @type {React.RefObject<Element>}
   * @private
   */
  _triggerRef = React.createRef();

  getPrimaryFocusableElement = () => {
    const { current: triggerEl } = this._triggerRef;
    if (triggerEl) {
      const primaryFocusPropEl = triggerEl.querySelector(
        '[data-floating-menu-primary-focus]'
      );
      if (primaryFocusPropEl) {
        return primaryFocusPropEl;
      }
    }
    const firstItem = this.overflowMenuItem0;
    if (
      firstItem &&
      firstItem.overflowMenuItem &&
      firstItem.overflowMenuItem.current
    ) {
      return firstItem.overflowMenuItem.current;
    }
  };

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  componentWillUnmount() {
    if (typeof this._hBlurTimeout === 'number') {
      clearTimeout(this._hBlurTimeout);
      this._hBlurTimeout = undefined;
    }
  }

  handleClick = evt => {
    if (!this._menuBody || !this._menuBody.contains(evt.target)) {
      this.setState({ open: !this.state.open });
    }
  };

  handleKeyDown = evt => {
    if (keyCodeMatches(evt, [keys.ArrowDown])) {
      this.setState({ open: !this.state.open });
    }
  };

  handleKeyPress = evt => {
    if (
      this.state.open &&
      keyCodeMatches(evt, [
        keys.ArrowUp,
        keys.ArrowRight,
        keys.ArrowDown,
        keys.ArrowLeft,
      ])
    ) {
      evt.preventDefault();
    }

    // Close the overflow menu on escape
    if (keyCodeMatches(evt, [keys.Escape])) {
      this.closeMenu();
      // Stop the esc keypress from bubbling out and closing something it shouldn't
      evt.stopPropagation();
    }
  };

  handleClickOutside = evt => {
    if (
      this.state.open &&
      (!this._menuBody || !this._menuBody.contains(evt.target))
    ) {
      this.closeMenu();
    }
  };

  closeMenu = () => {
    let wasOpen = this.state.open;
    this.setState({ open: false }, () => {
      if (wasOpen) {
        this.focusMenuEl();
      }
    });
  };

  focusMenuEl = () => {
    const { current: triggerEl } = this._triggerRef;
    if (triggerEl) {
      triggerEl.focus();
    }
  };

  handleOverflowMenuItemFocus = index => {
    const i = (() => {
      switch (index) {
        case -1:
          return React.Children.count(this.props.children) - 1;
        case React.Children.count(this.props.children):
          return 0;
        default:
          return index;
      }
    })();
    const { overflowMenuItem } =
      this[`overflowMenuItem${i}`] ||
      React.Children.toArray(this.props.children)[i];
    if (overflowMenuItem && overflowMenuItem.current) {
      overflowMenuItem.current.focus();
    }
  };

  /**
   * Handles the floating menu being unmounted or non-floating menu being
   * mounted or unmounted.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _bindMenuBody = menuBody => {
    if (!menuBody) {
      this._menuBody = menuBody;
    }
    if (!menuBody && this._hFocusIn) {
      this._hFocusIn = this._hFocusIn.release();
    }
  };

  /**
   * Handles the floating menu being placed.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _handlePlace = menuBody => {
    if (menuBody) {
      this._menuBody = menuBody;
      const primaryFocus =
        menuBody.querySelector('[data-floating-menu-primary-focus]') ||
        menuBody;
      primaryFocus.focus();
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this._hFocusIn = on(
        menuBody.ownerDocument,
        focusinEventName,
        event => {
          const { target } = event;
          const { current: triggerEl } = this._triggerRef;
          if (
            !menuBody.contains(target) &&
            triggerEl &&
            !target.matches(
              `.${prefix}--overflow-menu,.${prefix}--overflow-menu-options`
            )
          ) {
            this.closeMenu();
          }
        },
        !hasFocusin
      );
    }
  };

  /**
   * @returns {Element} The DOM element where the floating menu is placed in.
   */
  _getTarget = () => {
    const { current: triggerEl } = this._triggerRef;
    return (
      (triggerEl && triggerEl.closest('[data-floating-menu-container]')) ||
      document.body
    );
  };

  render() {
    const {
      ariaLabel,
      buttonLabel,
      menuOffset,
      children,
      direction,
      size,
      kind,
      disabled,
      innerRef: ref,
      getViewport,
      ...other
    } = this.props;

    const { open } = this.state;

    const iconClasses = classNames(`${prefix}--btn-group-icon`, {
      [`${prefix}--btn-group-icon__open`]: open,
    });

    const overflowMenuOptionsClasses = classNames(
      `${prefix}--overflow-menu-options`,
      {
        [`${prefix}--overflow-menu-options--open`]: open,
      }
    );

    const childrenWithProps = React.Children.toArray(children).map(
      (child, index) =>
        React.cloneElement(child, {
          closeMenu: this.closeMenu,
          onKeyDown: this.handleKeyPress,
          handleOverflowMenuItemFocus: this.handleOverflowMenuItemFocus,
          ref: e => {
            this[`overflowMenuItem${index}`] = e;
          },
          index,
        })
    );

    const menuBody = (
      <ul
        className={overflowMenuOptionsClasses}
        tabIndex="-1"
        role="menu"
        aria-label={ariaLabel}>
        {childrenWithProps}
      </ul>
    );

    const wrappedMenuBody = (
      <FloatingMenu
        menuDirection={direction}
        menuOffset={menuOffset}
        getViewport={getViewport}
        menuRef={this._bindMenuBody}
        flipped={false}
        target={this._getTarget}
        onPlace={this._handlePlace}
        triggerRef={this._triggerRef}>
        {React.cloneElement(menuBody, {
          'data-floating-menu-direction': direction,
        })}
      </FloatingMenu>
    );

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div data-floating-menu-container className={`${prefix}--btn-group`}>
          <Button
            aria-haspopup
            aria-expanded={this.state.open}
            className={iconClasses}
            renderIcon={ChevronDown16}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyPress}
            kind={kind}
            size={size}
            disabled={disabled}
            ref={mergeRefs(this._triggerRef, ref)}
            {...other}>
            {buttonLabel}
          </Button>
          {open && wrappedMenuBody}
        </div>
      </ClickListener>
    );
  }
}

export default (() => {
  const forwardRef = (props, ref) => <ButtonGroup {...props} innerRef={ref} />;
  forwardRef.displayName = 'ButtonGroup';
  return React.forwardRef(forwardRef);
})();
