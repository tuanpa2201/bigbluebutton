import React from 'react';
import Styled from './styles';
import { getSettingsSingletonInstance } from '/imports/ui/services/settings';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

class ToastContainer extends React.Component {
  // we never want this component to update since will break Toastify
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const Settings = getSettingsSingletonInstance();
    const { animations } = Settings.application;

    return (
      <Styled.ToastifyContainer
        closeButton={(<Styled.CloseIcon data-test="closeToastBtn" className="icon-primary-dark" iconName="cross" animations={animations}><SvgIcon iconName="cross" /></Styled.CloseIcon>)}
        autoClose={5000}
        toastClassName="toastClass"
        bodyClassName="toastBodyClass"
        progressClassName="toastProgressClass"
        newestOnTop={false}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        icon={false}
        theme="light"
        position="bottom-right"
      />
    );
  }
}

export default ToastContainer;
