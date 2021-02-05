import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const CardContent = ({
  className,
  children,
  cardIcon,
  cardTitle,
  cardLink,
  cardInfo,
  cardContentItems,
  iconDescription,
  ...other
}) => {
  const cardContentRef = useRef(null);

  const cardContentClasses = classNames({
    'bx--card__card-overview': true,
    [className]: className,
  });

  const cardLinkContent = cardLink
    ? cardLink.map((link, key) => (
        <div key={key} className="bx--about__title--link">
          {link}
        </div>
      ))
    : '';

  const cardInfoContent = cardInfo
    ? cardInfo.map((info, key) => (
        <h4 key={key} className="bx--about__title--additional-info">
          {info}
        </h4>
      ))
    : '';

  const cardItems = cardContentItems
    ? React.Children.map(cardContentItems, (item) => {
        if (React.isValidElement(item)) {
          return React.cloneElement(item, { cardContentRef });
        }
      })
    : null;

  const cardLinkContentArray = Object.keys(cardLinkContent);
  const cardInfoContentArray = Object.keys(cardInfoContent);

  return (
    <div {...other} ref={cardContentRef} className={cardContentClasses}>
      {children}
      <div className="bx--card-overview__about">
        {cardIcon ? (
          <div className="bx--about__icon">
            <Icon
              icon={cardIcon}
              name={cardTitle}
              description={iconDescription}
            />
          </div>
        ) : null}

        <div className="bx--about__title">
          <p id="card-app-title" className="bx--about__title--name">
            {cardTitle}
          </p>
          {cardLinkContentArray.map((info, key) => cardLinkContent[key])}
          {cardInfoContentArray.map((info, key) => cardInfoContent[key])}
          {cardItems}
        </div>
      </div>
    </div>
  );
};

CardContent.propTypes = {
  cardContentItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  cardIcon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string,
    svgData: PropTypes.object,
  }),
  cardInfo: PropTypes.array,
  cardLink: PropTypes.node,
  cardTitle: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  iconDescription: PropTypes.string,
};

CardContent.defaultProps = {
  iconDescription: 'card icon',
  cardTitle: 'card title',
};

export default CardContent;
