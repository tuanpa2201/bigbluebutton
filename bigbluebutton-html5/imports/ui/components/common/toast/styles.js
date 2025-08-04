import styled from 'styled-components';
import { ToastContainer as Toastify } from 'react-toastify';
import {
  fontSizeSmallest,
  fontSizeSmaller,
  fontSizeSmall,
  lineHeightComputed,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  colorGrayDark,
  toastDefaultColor,
  toastDefaultBg,
  toastInfoColor,
  toastInfoBg,
  toastSuccessColor,
  toastSuccessBg,
  toastErrorColor,
  toastErrorBg,
  toastWarningColor,
  toastWarningBg,
  colorGrayLighter,
} from '/imports/ui/stylesheets/styled-components/palette';
import {
  toastOffsetSm,
  smPaddingX,
  borderSizeSmall,
  toastIconMd,
  toastIconSm,
  jumboPaddingY,
} from '/imports/ui/stylesheets/styled-components/general';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

const CloseIcon = styled.div`
  //align-self: flex-start;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  //opacity: .5;
  font-size: ${fontSizeSmallest};
  //color: ${colorGrayDark};
  color: #2F384C !important;
  line-height: 0;
  position: relative;
  font-size: 70%;
  font-weight: 500;
  //left: ${toastOffsetSm};
  //left: 8px;
  padding-left: 8px;
  [dir="rtl"] & {
    left: auto;
    right: ${toastOffsetSm};
  }

  ${({ animations }) => animations && `
    transition: .3s ease;
  `}

  &:before {
    margin: inherit inherit inherit -.4rem;

    [dir="rtl"] & {
      margin: inherit -.4rem inherit inherit;
    }
  }

  &:hover,
  &:focus {
    opacity: 1;
  }

  @media ${smallOnly} {
    position: relative;
    font-size: ${fontSizeSmaller};
    left: auto;
  }
`;

const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ small }) => small && `
    background-color: inherit;
  `}
`;

const ToastIcon = styled.div`
  align-self: flex-start;
  margin: auto ${smPaddingX} auto 0;
  width: ${toastIconMd};
  height: ${toastIconMd};
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;

  [dir="rtl"]  & {
    margin: 0 0 auto ${smPaddingX};
  }

  & > i {
    line-height: 0;
    color: inherit;
    position: absolute;
    top: 50%;
    width: 100%;
  }
    
  & > svg {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ small }) => small && `
    width: ${toastIconSm};
    height: ${toastIconSm};
    & > i {
      font-size: 70%;
    }
  `}
`;

const ToastMessage = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  font-size: ${fontSizeSmall};
  max-height: 15vh;
  overflow: auto;
  color: black !important;

  ${({ small }) => small && `
    font-size: 80%;
  `}
`;

const BackgroundColorInherit = styled.div`
  position: relative;
`;

const Separator = styled.div`
  position: relative;
  width: 100%;
  height: ${borderSizeSmall};
  background-color: ${colorGrayLighter};
  margin-top: calc(${lineHeightComputed} * .5);
  margin-bottom: calc(${lineHeightComputed} * .5);
`;

const Toast = styled.div`
  display: flex;

  ${({ type }) => type === 'default' && `
    & .toastIcon {
      color: #C8C8C8;
    }
  `}

  ${({ type }) => type === 'error' && `
    & .toastIcon {
      color: #FF5565;
    }
  `}

  ${({ type }) => type === 'info' && `
    & .toastIcon {
      color: #C8C8C8;
    }
  `}

  ${({ type }) => type === 'success' && `
    & .toastIcon {
      color: #6CC17C;
    }
  `}

  ${({ type }) => type === 'warning' && `
    & .toastIcon {
      color: #EBB94C;
    }
  `}
`;

const ToastifyContainer = styled(Toastify)`
  z-index: 998;
  position: fixed;
  min-width: 20rem !important;
  max-width: 320px !important;
  box-sizing: border-box;
  right: ${jumboPaddingY};
  left: auto;
  max-height: 75vh;
  overflow: hidden;

  [dir="rtl"] & {
    right: auto;
    left: ${jumboPaddingY};
  }

  @media ${smallOnly} {
    width: 75%;
  }
`;

export default {
  CloseIcon,
  ToastContainer,
  ToastIcon,
  ToastMessage,
  BackgroundColorInherit,
  Separator,
  Toast,
  ToastifyContainer,
};
