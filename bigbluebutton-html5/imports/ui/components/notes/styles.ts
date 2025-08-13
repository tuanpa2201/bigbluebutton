import styled from 'styled-components';
import {
  mdPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import { colorWhite } from '/imports/ui/stylesheets/styled-components/palette';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import CommonHeader from '/imports/ui/components/common/control-header/component';

const Notes = styled.div<{ isChrome: boolean }>`
  background-color: ${colorWhite};
  padding: ${mdPaddingX};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  ${({ isChrome }) => isChrome && `
    transform: translateZ(0);
  `}

  @media ${smallOnly} {
    transform: none !important;
    &.no-padding {
      padding: 0;
    }
  }
`;

const Header = styled(CommonHeader)`
  padding-bottom: .2rem;
`;

const CloseButtonMobile = styled.button`
  border: none;
  margin: 12px 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 40px;
  height: 40px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  background: none;

  @media (min-width: 1024px) {
    display: none !important;
  }
`;

export default {
  Notes,
  CloseButtonMobile,
  Header,
};
