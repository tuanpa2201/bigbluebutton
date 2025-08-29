import styled from 'styled-components';
import { mdPaddingX, borderRadius } from '/imports/ui/stylesheets/styled-components/general';
import {
  fontSizeXL,
} from '/imports/ui/stylesheets/styled-components/typography';
import { colorWhite, colorTipBg } from '/imports/ui/stylesheets/styled-components/palette';
import { smallOnly, phoneOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';

const MuteWarning = styled.div`
  position: absolute !important;
  color: ${colorWhite};
  background-color: ${colorTipBg};
  text-align: center;
  line-height: 1;
  font-size: ${fontSizeXL};
  padding: ${mdPaddingX};
  border-radius: ${borderRadius};
  top: -100%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  cursor: pointer;

  @media ${phoneOnly} {
    transform: translate(0%, -50%);
  }

  > span {
    white-space: nowrap;
     font-size: 16px;
  }

  @media ${smallOnly} {
    font-size: 16px;
  }

  ${({ alignForMod }) => alignForMod && `
    left: 72.25%;

    [dir="rtl"] & {
      left: 20%;
    }
  `}

  ${({ alignForViewer }) => alignForViewer && `
    left: 80%;
  
    [dir="rtl"] & {
      left: 20%;
    }
  `}
`;

export default {
  MuteWarning,
};
