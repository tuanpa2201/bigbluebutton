import styled from 'styled-components';
import {
  innerToastWidth,
  toastIconSide,
  smPaddingX,
  smPaddingY,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  colorPrimary,
  colorWhite,
  colorGrayLightest,
  colorOffWhite,
} from '/imports/ui/stylesheets/styled-components/palette';
import {
  fontSizeLarger,
} from '/imports/ui/stylesheets/styled-components/typography';
import FullscreenButtonContainer from '/imports/ui/components/common/fullscreen-button/container';
import ToastStyled from '/imports/ui/components/common/toast/styles';

const VisuallyHidden = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px; width: 1px;
  margin: -1px; padding: 0; border: 0;
`;

const PresentationSvg = styled.svg`
  object-fit: contain;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  //always show an arrow by default
  cursor: default;

  //double click on the whiteboard shouldn't change the cursor
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const PresentationFullscreenButton = styled(FullscreenButtonContainer)`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  cursor: pointer;

  [dir="rtl"] & {
    right: auto;
    left : 0;
  }
`;

const InnerToastWrapper = styled.div`
  width: ${innerToastWidth};
`;

const ToastIcon = styled.div`
  margin-right: ${smPaddingX};
  [dir="rtl"] & {
    margin-right: 0;
    margin-left: ${smPaddingX};
  }
`;

const IconWrapper = styled.div`
  background-color: ${colorPrimary};
  width: ${toastIconSide};
  height: ${toastIconSide};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > i {
    position: relative;
    color: ${colorWhite};
    font-size: ${fontSizeLarger};
  }
`;

const ToastTextContent = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: ${smPaddingY};
  color: black;

  & > div:first-of-type {
    font-weight: bold;
    line-height: 2;
  }
`;

const PresentationName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ToastDownload = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: ${colorPrimary};
    cursor: pointer;
    text-decoration: none;

    &:focus,
    &:hover,
    &:active {
      color: ${colorPrimary};
      box-shadow: 0;
    }
  }
`;

const PresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--BG-Meet-bg, #2B2E32);
`;

const Presentation = styled.div`
  order: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SvgContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const WhiteboardSizeAvailable = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const PresentationToolbar = styled.div`
  display: flex;
  overflow-x: visible;
  order: 2;
  position: absolute;
  bottom: 0;
  z-index: 0;
`;

const ToastSeparator = styled(ToastStyled.Separator)``;

const Button = styled.button`
  background-color: ${colorOffWhite};
  border: none;
  color: #2d2d2d;
  cursor: pointer;
  padding: 0;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background: var(--BG-04---hover, #EFEFEF);
  box-shadow: 0 4px 6px -2px rgba(26, 26, 26, 0.20), 1px 0 0 0 rgba(0, 0, 0, 0.13) inset, -1px 0 0 0 rgba(0, 0, 0, 0.13) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.17) inset, 0 1px 0 0 rgba(204, 204, 204, 0.50) inset;
  justify-content: center;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: ${colorGrayLightest};
  }

  [data-darkreader-scheme="dark"] & {
    background-color: var(--bg-00-dark, #3B3F43);
    color: var(--text-primary-dark, #FCFCFD) !important;
  }
`;

const ExtraTools = styled.div`
  position: absolute;
  top: 16px;
  right: 67px;
  z-index: 399;
  display: flex;
  gap: 16px;

  [dir="rtl"] & {
    right: auto;
    left: 43px;
  }

  ${({ isToolbarVisible }) => !isToolbarVisible && `
    display: none;
  `}
`;

export default {
  VisuallyHidden,
  PresentationSvg,
  PresentationFullscreenButton,
  InnerToastWrapper,
  ToastIcon,
  IconWrapper,
  ToastTextContent,
  PresentationName,
  ToastDownload,
  PresentationContainer,
  Presentation,
  SvgContainer,
  WhiteboardSizeAvailable,
  PresentationToolbar,
  ToastSeparator,
  Button,
  ExtraTools,
};
