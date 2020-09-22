import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import EnhancedSelectInputOption from './EnhancedSelectInputOption';
import CheckInput from './CheckInput';
import styles from './MultiSelectInputOption.css';

class MultiSelectInputOption extends Component {

  //
  // Listeners

  onPress = () => {
    // EnhancedSelectInputOption takes care of this event
  }

  render() {
    const {
      id,
      value,
      hint,
      isSelected,
      isDisabled,
      isMobile,
      isWindows,
      ...otherProps
    } = this.props;

    return (
      <EnhancedSelectInputOption
        id={id}
        isSelected={false}
        isDisabled={isDisabled}
        isMobile={isMobile}
        {...otherProps}
      >
        <div className={classNames(
          styles.optionText,
          isMobile && styles.isMobile
        )}
        >
          <CheckInput
            containerClassName={styles.optionCheck}
            name={`select-${id}`}
            value={isSelected}
            isDisabled={isDisabled}
            onChange={this.onPress}
          />

          <div className={styles.optionCheckText}>
            {value}
          </div>

          {
            hint && <div className={styles.hintText}>
              {hint}
            </div>
          }
        </div>
      </EnhancedSelectInputOption>
    );
  }
}

MultiSelectInputOption.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.string.isRequired,
  hint: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  isMobile: PropTypes.bool.isRequired,
  isWindows: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

export default MultiSelectInputOption;
