import styled from 'styled-components';
import Styled from '../base/component';
import {
  borderSize,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  colorWhite,
  colorText,
} from '/imports/ui/stylesheets/styled-components/palette';
import ModalHeader from '/imports/ui/components/common/modal/header/component';
import { tabletOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';

const SimpleModal = styled(Styled.BaseModal)`
  outline: transparent;
  outline-width: ${borderSize};
  outline-style: solid;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  background-color: ${colorWhite} !important;
`;

const Header = styled(ModalHeader)``;

const Content = styled.div`
  overflow: visible;
  color: ${colorText};
  font-weight: normal;
  //padding: 0;
  
  padding: 16px;

  @media ${tabletOnly} {
    padding-bottom: 24px;
  }
  
  @media (min-width: 376px) and (max-width: 768px) {
    padding-bottom: 12px;
  }
`;

export default {
  SimpleModal,
  Header,
  Content,
};
