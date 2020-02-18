import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from '@rocketsoftware/carbon-components';

const { prefix } = settings;

const step = (
  <li
    className={`${prefix}--flat-progress-step ${prefix}--flat-progress-step--incomplete`}>
    <div
      className={`${prefix}--flat-progress-step-button ${prefix}--flat-progress-step-button--unclickable`}>
      <svg>
        <path d="M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0" />
      </svg>
      <p className={`${prefix}--flat-progress-label`} />
      <span className={`${prefix}--flat-progress-line`} />
    </div>
  </li>
);

function FlatProgressIndicatorSkeleton({ className, ...rest }) {
  return (
    <ul
      className={cx(
        `${prefix}--flat-progress`,
        `${prefix}--skeleton`,
        className
      )}
      {...rest}>
      {step}
      {step}
      {step}
      {step}
    </ul>
  );
}

FlatProgressIndicatorSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default FlatProgressIndicatorSkeleton;
