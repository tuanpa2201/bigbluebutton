import styled from 'styled-components';
import Button from '/imports/ui/components/common/button/component';
import { TitleElipsis } from '/imports/ui/stylesheets/styled-components/placeholders';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import {
  colorGrayDark,
  colorGrayLighter,
  colorText,
} from '/imports/ui/stylesheets/styled-components/palette';
import {
  mdPaddingX,
  borderSize, smPaddingX, smPadding,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  btnFontWeight,
  fontSizeBase,
  fontSizeLarge,
  lineHeightComputed,
} from '/imports/ui/stylesheets/styled-components/typography';

const Header = styled.header`
  padding: 12px 16px;
  align-items: center;
  background: var(--bg-01-light, #F2F2F2);
  border-bottom: 1px solid var(--Border-00, #EFEFEF);
  
  margin: 0;
  //padding: 0;
  //border: none;
  display: grid;

  ${({ $headerOnTop }) => $headerOnTop && `
    grid-template-columns: auto min-content;
    grid-template-rows: min-content;
  `}

  ${({ $innerHeader }) => $innerHeader && `
    grid-template-columns: auto;
    grid-template-rows: min-content min-content;
  `}

  ${({ $hideBorder }) => !$hideBorder && `
    padding: calc(${lineHeightComputed} / 2) 0;
    border-bottom: ${borderSize} solid ${colorGrayLighter};
  `}
`;

const Title = styled(TitleElipsis)`
  color: var(--Text-Primary, #313131);
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin: 0 ;
  display: block;
  //text-align: center;
  //font-weight: ${btnFontWeight};
  // font-size: calc(${fontSizeLarge} + 0.05rem);
  // color: ${colorGrayDark};
  white-space: normal;
  //margin: ${smPadding} 0 0;
  //line-height: calc(${lineHeightComputed} * 2);

  @media ${smallOnly} {
    font-size: ${fontSizeBase};
    padding: 0 ${mdPaddingX};
  }

  ${({ $headerOnTop }) => $headerOnTop && `
    grid-area: 1 / 1 / 2 / 3;
  `}

  ${({ $innerHeader }) => $innerHeader && `
    grid-area: 1 / 1 / 3 / 2;
  `}

  ${({ $hasMarginBottom }) => $hasMarginBottom && `
    // margin-bottom: ${smPaddingX};
  `}
`;

const DismissButton = styled(Button)`
  & > span:first-child {
    border-color: transparent !important;
    background-color: transparent !important;
    box-shadow: unset !important;
    padding: 6px;
    border: unset;
    & > i { color: ${colorText}; }
    &:focus{
      background: transparent !important;
    }
  }

  ${({ $headerOnTop }) => $headerOnTop && `
    grid-area: 1 / 1 / 2 / 3;
  `}

  ${({ $innerHeader }) => $innerHeader && `
    grid-area: 1 / 1 / 2 / 2;
  `}

  justify-self: end;
`;

export default {
  Header,
  Title,
  DismissButton,
};
