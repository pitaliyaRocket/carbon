import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from '@rocketsoftware/carbon-components';

const { prefix } = settings;

const FooterWrapper = ({ children, className, inZowe, id }) => {
  const wrapperClasses = cx({
    [`${prefix}--footer-wrapper`]: true,
    [`in-zowe`]: inZowe,
    [className]: className,
  });

  return (
    <div className={wrapperClasses} id={id}>
      {children}
    </div>
  );
};
FooterWrapper.propTypes = {
  /**
   * Specify an id for the wrapper
   */
  id: PropTypes.string,

  /**
   * Provide nodes to be rendered within the wrapper
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be added to the wrapper
   */
  className: PropTypes.string,

  /**
   * Specify whether the footer will be used in Zowe
   */
  inZowe: PropTypes.bool,
};

FooterWrapper.defaultProps = {
  inZowe: true,
};
export default FooterWrapper;
