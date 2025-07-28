import styled from 'styled-components';
import {
  avatarSide,
  borderSize,
  avatarInset,
  smPaddingX,
  toastIconSide,
  toastMargin,
  toastMarginMobile,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  colorWhite,
  colorGrayLighter,
  colorGrayLight,
  colorPrimary,
} from '/imports/ui/stylesheets/styled-components/palette';
import {
  fontSizeXL,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  smallOnly,
} from '/imports/ui/stylesheets/styled-components/breakpoints';
import Button from '/imports/ui/components/common/button/component';
import ToastStyled from '/imports/ui/components/common/toast/styles';

const Avatar = styled.div`
  cursor: pointer;
  outline: transparent;
  outline-style: dotted;
  outline-width: ${borderSize};
  width: ${avatarSide};
  height: ${avatarSide};
  color: ${colorWhite};
  border-radius: 50%;
  border: solid ${borderSize} ${colorWhite};
  margin-left: ${avatarInset};
  text-align: center;
  padding: 5px 0;

  &:hover,
  &:focus {
    border: solid ${borderSize} ${colorGrayLighter};
  }
`;

const AvatarsExtra = styled.div`
  background-color: ${colorGrayLight};
  outline: transparent;
  outline-style: dotted;
  outline-width: ${borderSize};
  width: ${avatarSide};
  height: ${avatarSide};
  color: ${colorWhite};
  border-radius: 50%;
  border: solid ${borderSize} ${colorWhite};
  margin-left: ${avatarInset};
  text-align: center;
  padding: 5px 0;
`;

const ToastContent = styled.div`
  margin-right: ${smPaddingX};
  display: flex;
  gap: 12px;
  // justify-content: flex-end;
  [dir="rtl"] & {
    margin-right: 0;
    margin-left: ${smPaddingX};
  }
`;

const IconWrapper = styled.div`
  background-color: #56D6FF;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  
`;

const ToastMessage = styled.div`
  margin-top: ${toastMargin};
  overflow: hidden;
  color: var(--Text-Primary, #FCFCFD);
  text-overflow: ellipsis;

  /* Medium/S */
  font-family: "FS PF BeauSans Pro", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */

  & > div {
    font-weight: bold;
    line-height: 2;
  }
`;

const ClearButton = styled(Button)`
  position: relative;
  width: 100%;
  margin-top: ${toastMargin};
  color: ${colorPrimary};

  &:focus,
  &:hover,
  &:active {
    color: ${colorPrimary};
    box-shadow: 0;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
`;

const ToastContentWrapper = styled.div`
  width: 100%;
`;

const ToastSeparator = styled(ToastStyled.Separator)``;

export default {
  Avatar,
  ToastContentWrapper,
  AvatarsExtra,
  ToastContent,
  IconWrapper,
  ToastMessage,
  ClearButton,
  ToastSeparator,
  AvatarWrapper,
};
