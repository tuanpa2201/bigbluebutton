import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Icon from '/imports/ui/components/common/icon/component';
import Styled from './styles';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

const propTypes = {
  icon: PropTypes.string,
  svgIcon: PropTypes.string,
  message: PropTypes.node.isRequired,
};

const defaultIcons = {
  info: 'help',
  success: 'checkmark',
  warning: 'warning',
  error: 'close',
  default: 'about',
};

const defaultSvgIcons = {
  info: 'info',
  success: 'check_circle',
  warning: 'alert_triangle',
  error: 'cross_circle',
  default: 'info',
};

const Toast = ({
  icon = null,
  svgIcon = null,
  type,
  message,
  content,
  small,
}) => (
  <Styled.ToastContainer small={small} data-test="toastContainer">
    <Styled.Toast type={type}>
      {svgIcon
        ? (
          <Styled.ToastIcon small={small}>
            <SvgIcon iconName={svgIcon} />
          </Styled.ToastIcon>
        )
        : (
          <Styled.ToastIcon className="toastIcon" small={small}>
            {icon && <Icon iconName={icon || defaultIcons[type]} />}
            {!icon && <SvgIcon iconName={defaultSvgIcons[type] || defaultSvgIcons.default} />}

          </Styled.ToastIcon>
        )}
      <Styled.ToastMessage data-test="toastSmallMsg">
        <span>{message}</span>
      </Styled.ToastMessage>
    </Styled.Toast>
    {content
      ? (
        <Styled.BackgroundColorInherit>
          <Styled.Separator />
          <Styled.BackgroundColorInherit>
            {content}
          </Styled.BackgroundColorInherit>
        </Styled.BackgroundColorInherit>
      ) : null}
  </Styled.ToastContainer>
);

export default Toast;

Toast.propTypes = propTypes;
