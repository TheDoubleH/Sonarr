import PropTypes from 'prop-types';
import React from 'react';
import Label from 'Components/Label';
import EnhancedSelectInputSelectedValue from './EnhancedSelectInputSelectedValue';
import styles from './MultiSelectInputSelectedValue.css';

function MultiSelectInputSelectedValue(props) {
  const {
    value,
    values,
    ...otherProps
  } = props;

  return (
    <EnhancedSelectInputSelectedValue
      className={styles.selectedValue}
      {...otherProps}
    >
      <div className={styles.valueText}>
        {
          value.map((key, index) => {
            const v = values.find((i) => i.key === key);
            return (
              <Label key={key}>
                {v ? v.value : key}
              </Label>
            );
          })
        }
      </div>
    </EnhancedSelectInputSelectedValue>
  );
}

MultiSelectInputSelectedValue.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired
};

MultiSelectInputSelectedValue.defaultProps = {

};

export default MultiSelectInputSelectedValue;
