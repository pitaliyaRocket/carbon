import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const CardActionItem = ({
  className,
  id,
  ariaLabel,
  iconName,
  description,
  ...other
}) => {
  const cardActionItemClasses = classNames({
    'bx--app-actions__button': true,
    [className]: className,
  });

  return (
    <button
      {...other}
      className={cardActionItemClasses}
      type="button"
      id={id}
      aria-label={ariaLabel}>
      {iconName ? (
        <Icon
          className="bx--app-actions__button--icon"
          icon={iconName}
          name={'icon'}
          description={description}
        />
      ) : null}
    </button>
  );
};

CardActionItem.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  iconName: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string,
    svgData: PropTypes.object,
  }),
  id: PropTypes.string,
};

CardActionItem.defaultProps = {
  ariaLabel: '',
  description: 'card action',
};

export default CardActionItem;
