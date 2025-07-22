import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
} from 'react-intl';
import Styled from './styles';
import { uniqueId } from '/imports/utils/string-utils';
// Import CustomDropdown
import CustomDropdown from '/imports/ui/components/CustomDropdown/CustomDropdown';
import logger from "/imports/startup/client/logger";

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  kind: PropTypes.oneOf(['audioinput', 'audiooutput']),
  onChange: PropTypes.func.isRequired,
  blocked: PropTypes.bool,
  deviceId: PropTypes.string,
  devices: PropTypes.arrayOf(PropTypes.shape({
    deviceId: PropTypes.string,
    label: PropTypes.string,
  })),
  supportsTransparentListenOnly: PropTypes.bool.isRequired,
};

const defaultProps = {
  kind: 'audioinput',
  blocked: false,
  deviceId: '',
  devices: [],
};

const intlMessages = defineMessages({
  fallbackInputLabel: {
    id: 'app.audio.audioSettings.fallbackInputLabel',
    description: 'Audio input device label',
  },
  fallbackOutputLabel: {
    id: 'app.audio.audioSettings.fallbackOutputLabel',
    description: 'Audio output device label',
  },
  defaultOutputDeviceLabel: {
    id: 'app.audio.audioSettings.defaultOutputDeviceLabel',
    description: 'Default output device label',
  },
  findingDevicesLabel: {
    id: 'app.audio.audioSettings.findingDevicesLabel',
    description: 'Finding devices label',
  },
  noDeviceFoundLabel: {
    id: 'app.audio.noDeviceFound',
    description: 'No audio device found',
  },
  noMicListenOnlyLabel: {
    id: 'app.audio.audioSettings.noMicListenOnly',
    description: 'No microphone, listen only mode label',
  },
});

class DeviceSelector extends Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    // event.target.value for both native and CustomDropdown
    console.log('DeviceSelector.handleSelectChange', event);
    const { value } = event.target;
    const { devices, onChange } = this.props;
    const selectedDeviceId = (value === 'listen-only')
      ? value
      : devices.find((d) => d.deviceId === value)?.deviceId;
    onChange(selectedDeviceId);
  }

  getFallbackLabel(index) {
    const { intl, kind } = this.props;
    const label = kind === 'audioinput' ? intlMessages.fallbackInputLabel : intlMessages.fallbackOutputLabel;

    return intl.formatMessage(label, { 0: index });
  }

  render() {
    const {
      intl,
      kind,
      blocked,
      deviceId,
      devices,
      supportsTransparentListenOnly,
    } = this.props;

    const options = devices.map((d, i) => ({
      label: d.label || this.getFallbackLabel(i),
      value: d.deviceId,
      key: uniqueId('device-option-'),
    }));

    if (kind === 'audioinput' && supportsTransparentListenOnly && !blocked) {
      options.push({
        label: intl.formatMessage(intlMessages.noMicListenOnlyLabel),
        value: 'listen-only',
        key: uniqueId('device-option-'),
      });
    }

    let notFoundOption;

    if (blocked) {
      notFoundOption = {
        label: intl.formatMessage(intlMessages.findingDevicesLabel),
        value: 'finding',
        key: uniqueId('device-option-'),
      };
    } else if (kind === 'audiooutput' && !('setSinkId' in HTMLMediaElement.prototype)) {
      const defaultOutputDeviceLabel = intl.formatMessage(intlMessages.defaultOutputDeviceLabel);
      notFoundOption = {
        label: defaultOutputDeviceLabel,
        value: 'not-found',
        key: uniqueId('device-option-'),
      };
    } else {
      const noDeviceFoundLabel = intl.formatMessage(intlMessages.noDeviceFoundLabel);
      notFoundOption = {
        label: noDeviceFoundLabel,
        value: 'not-found',
        key: uniqueId('device-option-'),
      };
    }

    // Render CustomDropdown
    return (
      <CustomDropdown
        options={options.length ? options : [notFoundOption]}
        value={deviceId}
        onChange={this.handleSelectChange}
        disabled={!options.length}
      />
    );
  }
}

DeviceSelector.propTypes = propTypes;
DeviceSelector.defaultProps = defaultProps;

export default DeviceSelector;
