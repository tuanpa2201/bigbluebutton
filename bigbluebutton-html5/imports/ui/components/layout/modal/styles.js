import styled from 'styled-components';
import {
  colorWhite,
} from '/imports/ui/stylesheets/styled-components/palette';
import { phoneOnly, smallOnly, tabletOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import Button from '/imports/ui/components/common/button/component';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import ModalStyles from '/imports/ui/components/common/modal/simple/styles';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2px 0 12px 0;
  overflow: hidden;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    padding: 0px 0 20px 0;
  }
`;

const LayoutModal = styled(ModalSimple)`
  max-width: 500px;
  @media ${smallOnly} {
    height: unset;
  }

   ${({ isPhone }) => isPhone && `
    min-width: 100%;
    border-radius: 0;
  `}

  ${ModalStyles.Content} {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    .footer-model-custom-tablet{
      padding-top: 20px;
    }
    .modal-content {
      padding: 20px !important;
    }
    .modal-header {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }
  }

  @media ${phoneOnly} {
    .footer-model-custom-tablet{
      padding-top: 12px;
    }
    .modal-content {
      padding-bottom: 12px !important;
    }
  }
`;

const BodyContainer = styled.div`
  width: 100%;
`;

const IconSvg = styled.img`
  border-radius: 8px;

  @media ${smallOnly} {
    height: 20%;
  }
`;

const LayoutBtn = styled(Button)`
  display: flex;
  box-shadow: unset !important;
  background-color: ${colorWhite};
  align-items: center;
  flex-direction: column;
  padding: 0 !important;
  width: fit-content;

  @media ${smallOnly} {

    ${({ layout }) => (layout === 'custom') && `
      display: none;
    `};

    border: ${colorWhite} solid 6px;
    border-radius: 10px;
    width: fit-content;
  }
`;

const ButtonLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${smallOnly} {
    align-items: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .MuiFormControlLabel-label {
    font-size: 14px!important;
    line-height: 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .MuiFormControlLabel-label {
      /* Medium/M */
      font-size: 16px!important;
      line-height: 24px; /* 150% */
    }
  }
`;

const ButtonBottomContainer = styled.div`
  display: flex;
  justify-content: end;
  align-self: end;
  padding: 16px 0px 0px;
  width: 100%;

  border-top: 1px solid var(--Border-00, #EFEFEF);

  @media ${smallOnly} {
    align-self: center;
    padding-right: unset;
    position: relative;
  }

  @media ${tabletOnly} {
    border-top: unset !important;
  }
`;

const LabelLayoutNames = styled.label`
  text-align: center;
  margin: 0 0 0.1rem 0;

  @media ${smallOnly} {
    ${({ layout }) => (layout === 'custom') && `
     display: none;
    `};
    margin: 0 0 1.5rem 0;
  };
`;

const ToggleLabel = styled.span`
  margin-right: .5rem;
  min-width: 4rem;
  text-align: end;
`;

const ToggleStatusWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  justify-content: flex-end;
  align-items: center;
  
  @media ${smallOnly} {
  position: relative;
  right: 2rem;
  }

  @media ${tabletOnly} {
    height: 40px;
  }
`;

const PushContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  border-top: 1px solid #EFEFEF;
  padding: 18px 0px 10px;
  margin-top: 18px;

  @media ${tabletOnly} {
    padding: 20px 0px 0px;
  }
`;

const LabelPushLayout = styled.div`
  color: var(--Text-Primary, #313131);

  /* Regular/S */
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */

  @media ${tabletOnly} {
    font-size: 16px;
    line-height: 24px;
  }
`;

export default {
  Content,
  LayoutModal,
  BodyContainer,
  IconSvg,
  LayoutBtn,
  ButtonLayoutContainer,
  ButtonsContainer,
  ButtonBottomContainer,
  LabelLayoutNames,
  PushContainer,
  LabelPushLayout,
  ToggleStatusWrapper,
  ToggleLabel,
};
