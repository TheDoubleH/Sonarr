import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnhancedSelectInput from './EnhancedSelectInput';
import MultiSelectInputSelectedValue from './MultiSelectInputSelectedValue';
import MultiSelectInputOption from './MultiSelectInputOption';

function createMapStateToProps() {
  return {};
}

const mapDispatchToProps = {
};

class MultiSelectInputConnector extends Component {

  //
  // Lifecycle

  // componentDidMount() {
  // }

  //
  // Render

  render() {
    return (
      <EnhancedSelectInput
        {...this.props}
        selectedValueComponent={MultiSelectInputSelectedValue}
        optionComponent={MultiSelectInputOption}
        onChange={this.props.onChange}
      />
    );
  }
}

MultiSelectInputConnector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(MultiSelectInputConnector);
