import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchOptions, clearOptions } from 'Store/Actions/providerOptionActions';
import EnhancedSelectInput from './EnhancedSelectInput';
import MultiSelectInputSelectedValue from './MultiSelectInputSelectedValue';
import MultiSelectInputOption from './MultiSelectInputOption';

function getSelectOptions(items) {
  return items.map((option) => {
    return {
      key: option.value,
      value: option.name,
      hint: option.hint
    };
  });
}

function createMapStateToProps() {
  return createSelector(
    (state, { value, selectOptionsProviderAction }) => [value, selectOptionsProviderAction],
    (state) => state.providerOptions,
    ([value, selectOptionsProviderAction], options) => {
      if (selectOptionsProviderAction) {
        return {
          isFetching: options.isFetching,
          values: getSelectOptions(options.items)
        };
      }
    }
  );
}

const mapDispatchToProps = {
  dispatchFetchOptions: fetchOptions,
  dispatchClearOptions: clearOptions
};

class MultiSelectInputConnector extends Component {

  //
  // Lifecycle

  componentDidMount = () => {
    this._populate();
  }

  componentWillUnmount = () => {
    this.props.dispatchClearOptions();
  }

  //
  // Control

  _populate() {
    const {
      provider,
      providerData,
      selectOptionsProviderAction,
      dispatchFetchOptions
    } = this.props;

    if (selectOptionsProviderAction) {
      dispatchFetchOptions({
        action: selectOptionsProviderAction,
        provider,
        providerData
      });
    }
  }

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
  provider: PropTypes.string.isRequired,
  providerData: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectOptionsProviderAction: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dispatchFetchOptions: PropTypes.func.isRequired,
  dispatchClearOptions: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(MultiSelectInputConnector);
