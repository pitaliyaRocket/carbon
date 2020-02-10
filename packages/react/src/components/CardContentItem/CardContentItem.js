import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import TooltipDefiniton from '../TooltipDefinition';

import { settings } from '@rocketsoftware/carbon-components';
const { prefix } = settings;

const CardContentItem = ({ info, cardContentRef, maxWidth }) => {
  const [overflowState, setOverflowState] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (cardContentRef !== undefined) {
      setOverflowState(
        contentRef.current.clientWidth > cardContentRef.current.clientWidth
      );
    }
  }, [cardContentRef]);

  return (
    <div ref={contentRef}>
      {!overflowState && (
        <h4
          style={{ whiteSpace: 'nowrap' }}
          className={`${prefix}--about__title--additional-info`}>
          {info}
        </h4>
      )}

      {overflowState && (
        <TooltipDefiniton
          assistiveTextClassName={`${prefix}--assistive-text__overflow`}
          triggerClassName={`${prefix}--card-text__overflow`}
          direction={'middle'}
          tooltipText={info}>
          <span
            className={`${prefix}--definition-text__span`}
            style={{ maxWidth: maxWidth }}>
            {info}
          </span>
        </TooltipDefiniton>
      )}
    </div>
  );
};

CardContentItem.propTypes = {
  /**
   * String of information to be shown on a card
   */
  info: PropTypes.string,

  /**
   * Prop for ref which is passed to it by the CardContent component
   */
  cardContentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),

  /**
   * Specify max-width of item (should be no bigger than the intended width of card)
   */
  maxWidth: PropTypes.string,
};

export default CardContentItem;
