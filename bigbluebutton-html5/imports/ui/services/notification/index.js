/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { toast } from 'react-toastify';
import { isEqual } from 'radash';
import Styled from './styles';
import Toast from '/imports/ui/components/common/toast/component';

let lastToast = {
  id: null,
  message: null,
  type: null,
  icon: null,
};

export function notify(message, type = 'default', icon, options, content, small) {
  const settings = {
    ...options,
  };

  const { id: lastToastId, ...lastToastProps } = lastToast;
  const toastProps = {
    message,
    type,
    icon,
    content,
    small,
  };

  if (!toast.isActive(lastToast.id) || !isEqual(lastToastProps, toastProps)) {
    if (options?.helpLink != null && options?.helpLabel != null) {
      const element = (
        <div role="alert">
          <Toast {...toastProps} />
          <Styled.HelpLinkButton
            label={options.helpLabel}
            color="default"
            size="sm"
            onClick={() => { window.open(options.helpLink); }}
            data-test="helpLinkToastButton"
          />
        </div>
      );
      let id;

      switch (type) {
        case 'info':
          id = toast.info(element, settings);
          break;
        case 'success':
          id = toast.success(element, settings);
          break;
        case 'warning':
          id = toast.warn(element, settings);
          break;
        case 'error':
          id = toast.error(element, settings);
          break;
        default:
          id = toast(element, settings);
          break;
      }

      lastToast = { id, ...toastProps };

      return id;
    }
    if (toast.isActive(lastToast.id)
      && isEqual(lastToastProps.key, toastProps.key) && options?.autoClose > 0) {
      toast.update(
        lastToast.id,
        {
          render: <div role="alert"><Toast {...toastProps} /></div>,
          autoClose: options.autoClose,
        },
      );
    } else {
      const id = toast(<div role="alert"><Toast {...toastProps} /></div>, settings);

      lastToast = { id, ...toastProps };

      return id;
    }
  }
  return null;
}

export function notifyCustom(message, type = 'default', svgIcon, options, content, small) {
  const settings = {
    ...options,
  };

  const { id: lastToastId, ...lastToastProps } = lastToast;
  const toastProps = {
    message,
    type,
    svgIcon,
    content,
    small,
  };

  if (!toast.isActive(lastToast.id) || !isEqual(lastToastProps, toastProps)) {
    if (options?.helpLink != null && options?.helpLabel != null) {
      const element = (
        <div role="alert">
          <Toast {...toastProps} />
          <Styled.HelpLinkButton
            label={options.helpLabel}
            color="default"
            size="sm"
            onClick={() => { window.open(options.helpLink); }}
            data-test="helpLinkToastButton"
          />
        </div>
      );
      let id;

      switch (type) {
        case 'info':
          id = toast.info(element, settings);
          break;
        case 'success':
          id = toast.success(element, settings);
          break;
        case 'warning':
          id = toast.warn(element, settings);
          break;
        case 'error':
          id = toast.error(element, settings);
          break;
        default:
          id = toast(element, settings);
          break;
      }
      lastToast = { id, ...toastProps };

      return id;
    }
    if (toast.isActive(lastToast.id)
      && isEqual(lastToastProps.key, toastProps.key) && options?.autoClose > 0) {
      toast.update(
        lastToast.id,
        {
          render: <div role="alert"><Toast {...toastProps} /></div>,
          autoClose: options.autoClose,
        },
      );
    } else {
      const element = (<div role="alert"><Toast {...toastProps} /></div>);
      let id;

      switch (type) {
        case 'info':
          id = toast.info(element, settings);
          break;
        case 'success':
          id = toast.success(element, settings);
          break;
        case 'warning':
          id = toast.warn(element, settings);
          break;
        case 'error':
          id = toast.error(element, settings);
          break;
        default:
          id = toast(element, settings);
          break;
      }
      lastToast = { id, ...toastProps };

      return id;
    }
  }
  return null;
}

export default { notify, notifyCustom };
