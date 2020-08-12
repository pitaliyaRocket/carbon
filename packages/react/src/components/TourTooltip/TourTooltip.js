import React from 'react';
import PropTypes from 'prop-types';
import { settings } from '@rocketsoftware/carbon-components';
import cx from 'classnames';
import { Close20, Renew20 } from '@rocketsoftware/icons-react';

const { prefix } = settings;

class TourTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
  }

  render() {
    const {
      title,
      description,
      closeButtonAriaLabel,
      nextLabel,
      prevLabel,
      onNext,
      onPrev,
      onClose,
      disableNext,
      disablePrev,
      hideNext,
      hidePrev,
      hideClose, // eslint-disable-line react/prop-types
      enableFlip,
      flipped,
      onFlip,
      flippedTitle,
      flippedDescription,
      flipButtonAriaLabel,
      flipBeforeClose,
    } = this.props;

    const next = disableNext ? undefined : onNext;
    const prev = disablePrev ? undefined : onPrev;
    const close = onClose;
    const controlled = flipped === true || flipped === false;
    const flipStatus = controlled ? flipped : this.state.flipped;
    const flipTooltip = controlled
      ? onFlip
      : () => this.setState({ flipped: !this.state.flipped });

    return (
      <div className={`${prefix}--tour-tooltip--container`}>
        <div
          className={cx(`${prefix}--tour-tooltip`, {
            flipped: flipStatus,
          })}>
          <TooltipFace
            flip={flipTooltip}
            flipBeforeClose={flipBeforeClose}
            enableFlip={enableFlip}
            close={close}
            hideClose={hideClose}
            flipButtonAriaLabel={flipButtonAriaLabel}
            closeButtonAriaLabel={closeButtonAriaLabel}
            front={true}
            title={title}
            body={description}>
            {!(hideNext && hidePrev) && (
              <div className={`${prefix}--tour-tooltip__action-group`}>
                {!hidePrev && (
                  <button
                    onClick={prev}
                    disabled={disablePrev}
                    className={`${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--sm`}>
                    {prevLabel}
                  </button>
                )}
                {!hideNext && (
                  <button
                    onClick={next}
                    disabled={disableNext}
                    className={`${prefix}--btn ${prefix}--btn--primary ${prefix}--btn--sm`}>
                    {nextLabel}
                  </button>
                )}
              </div>
            )}
          </TooltipFace>

          {(enableFlip || flipBeforeClose) && (
            <TooltipFace
              enableFlip={enableFlip}
              flip={flipTooltip}
              flipBeforeClose={flipBeforeClose}
              close={close}
              flipButtonAriaLabel={flipButtonAriaLabel}
              closeButtonAriaLabel={closeButtonAriaLabel}
              front={false}
              title={flippedTitle}
              body={flippedDescription}
            />
          )}
        </div>
      </div>
    );
  }
}

const TooltipFace = (props) => {
  /* eslint-disable react/prop-types */
  const {
    enableFlip,
    front,
    flip,
    flipBeforeClose,
    flipButtonAriaLabel,
    close,
    closeButtonAriaLabel,
    title,
    body,
    hideClose,
  } = props;
  /* eslint-enable react/prop-types */
  return (
    <div
      className={cx(
        `${prefix}--tour-tooltip__face`,
        `${prefix}--tour-tooltip--${front ? 'front' : 'back'}`
      )}>
      <div className={`${prefix}--tour-tooltip__header`}>
        {!hideClose && (
          <button
            className={`${prefix}--tour-tooltip__close-button`}
            type="button"
            onClick={front && flipBeforeClose ? flip : close}
            aria-label={closeButtonAriaLabel}>
            <Close20 className={`${prefix}--tour-tooltip__close--icon`} />
          </button>
        )}
        {enableFlip && (
          <button
            className={`${prefix}--tour-tooltip__flip-button`}
            type="button"
            onClick={flip}
            aria-label={flipButtonAriaLabel}>
            <Renew20 className={`${prefix}--tour-tooltip__flip--icon`} />
          </button>
        )}
        <div className={`${prefix}--tour-tooltip__title`}>{title}</div>
      </div>
      <div className={`${prefix}--tour-tooltip__body`}>{body}</div>
      {
        props.children // eslint-disable-line react/prop-types
      }
    </div>
  );
};

TourTooltip.propTypes = {
  /**
   * Primary tooltip title
   */
  title: PropTypes.string,

  /**
   * Primary tooltip content
   */
  description: PropTypes.string,

  /**
   * Optional display text for the "next" button
   */
  nextLabel: PropTypes.string,

  /**
   * Optional display text for the "previous" button
   */
  prevLabel: PropTypes.string,

  /**
   * Accessibility label text for the "close" button
   */
  closeButtonAriaLabel: PropTypes.string,

  /**
   * Accessibility label text for the "flip" button
   */
  flipButtonAriaLabel: PropTypes.string,

  /**
   * Optionally specify whether the "next"" button should be disabled
   */
  disableNext: PropTypes.bool,

  /**
   * Optionally specify whether the "previous" button should be disabled
   */
  disablePrev: PropTypes.bool,

  /**
   * Optionally specify whether the "next"" button should be hidden
   */
  hideNext: PropTypes.bool,

  /**
   * Optionally specify whether the "previous" button should be hidden
   */
  hidePrev: PropTypes.bool,

  /**
   * Function to be called when "next" is clicked
   */
  onNext: PropTypes.func,

  /**
   * Function to be called when "prev" is clicked
   */
  onPrev: PropTypes.func,

  /**
   * Function to be called when "close" is clicked
   */
  onClose: PropTypes.func,

  /**
   * If true, the tooltip can be flipped over to expose more content. The back
   * face displays a title and description, much like the front. As with the front side,
   * the provided description can be a node to allow for custom content rendering.
   */
  enableFlip: PropTypes.bool,

  /**
   * If provided, the tooltip's flip state will be controlled by this prop.
   */
  flipped: PropTypes.bool,

  /**
   * Callback used to change the flip state. Should be used in conjunction with the `flipped` prop.
   */
  onFlip: PropTypes.func,

  /**
   * Secondary tooltip title, visible when tooltip is flipped.
   */
  flippedTitle: PropTypes.string,

  /**
   * Secondary tooltip content, visible when tooltip is flipped.
   */
  flippedDescription: PropTypes.string,

  /**
   * Supports an alternative use case for the flipped case where it will first flip to that face and then close
   * on second click.
   */
  flipBeforeClose: PropTypes.bool,
};

TourTooltip.defaultProps = {
  nextLabel: 'Next',
  prevLabel: 'Previous',
  closeButtonAriaLabel: 'Close',
  flipButtonAriaLabel: 'Flip',
  hideNext: false,
  hidePrev: false,
  hideClose: false,
  flipBeforeClose: false,
};

export default TourTooltip;
