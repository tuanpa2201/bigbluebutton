import styled from 'styled-components';
import {
  colorWhite,
} from '/imports/ui/stylesheets/styled-components/palette';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import Button from '/imports/ui/components/common/button/component';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import ModalStyles from '/imports/ui/components/common/modal/simple/styles';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2px 0 12px 0;
  overflow: hidden;
`;

const LayoutModal = styled(ModalSimple)`
  max-width: 500px;
  @media ${smallOnly} {
    height: unset;
  }

   ${({ isPhone }) => isPhone && `
    min-height: 100%;
    min-width: 100%;
    border-radius: 0;
  `}

  ${ModalStyles.Content} {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    right: 1rem;
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
`;

const PushContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LabelPushLayout = styled.div`
  padding-right: 0.5rem;
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
