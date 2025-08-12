import styled, { css, keyframes } from 'styled-components';
import Button from '/imports/ui/components/common/button/component';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import {
  borderSizeSmall,
  mdPaddingX,
  mdPaddingY,
  jumboPaddingX,
  jumboPaddingY,
} from '/imports/ui/stylesheets/styled-components/general';
import { colorGrayLightest } from '/imports/ui/stylesheets/styled-components/palette';
import {
  lineHeightComputed,
  fontSizeSmall,
} from '/imports/ui/stylesheets/styled-components/typography';

const FormWrapper = styled.div`
  min-width: 100%;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: ${mdPaddingY} ${mdPaddingX} 0 ${mdPaddingX};
  column-gap: ${jumboPaddingX};
  row-gap: ${mdPaddingY};
  @media ${smallOnly} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const AudioNote = styled.div`
  display: block;
  margin: 0 ${mdPaddingX} ${jumboPaddingY} ${mdPaddingX};
  text-align: center;
  @media ${smallOnly} {
    font-size: ${fontSizeSmall};
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 0 0 12px !important;
  }

  @media (max-width: 767px) {
    margin: 0 0 12px !important;
  }
`;

const FormElement = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  flex-grow: 1;

  @media (min-width: 768px) and (max-width: 1024px) {
    &.pb-20 {
      padding-bottom: 12px !important;
    }
  }

  @media (max-width: 767px) {
    &.pb-20 {
      padding-bottom: 12px !important;
    }
  }
`;

const LabelSmall = styled.label`
  color: black;
  font-size: ${fontSizeSmall};
  font-weight: 600;

  & > :first-child {
    margin: 4px 0 0 0 !important;
  }
`;

const LabelSmallFullWidth = styled(LabelSmall)`
  width: 100%;
`;

const EnterAudio = styled.div`
  margin: 0 ${mdPaddingX} 0 0;
  display: flex;
  justify-content: flex-end;

  [dir="rtl"] & {
    margin: 0 0 0 ${mdPaddingX};
  }
`;

const BackButton = styled(Button)`
  border: none;

  [dir="rtl"] & {
    margin: 0 0 0 ${mdPaddingX};
  }

  &:first-child {
    margin: 0 0.5rem 0 0 !important;
  }
`;

const ellipsis = keyframes`
  to {
    width: 1.5em;
  }
`;

const FetchingAnimation = styled.span`
  margin: auto;
  display: inline-block;
  width: 1.5em;

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    content: "\\2026"; /* ascii code for the ellipsis character */
    width: 0;
    margin-left: 0.25em;

    ${({ animations }) => animations
      && css`
        animation: ${ellipsis} steps(4, end) 900ms infinite;
      `}
  }
`;

const BottomSeparator = styled.div`
  position: relative;
  width: inherit;
  height: ${borderSizeSmall};
  background-color: ${colorGrayLightest};
  margin: calc(${lineHeightComputed} * 1.25) ${mdPaddingX}
    calc(${lineHeightComputed} * 1.25) ${mdPaddingX};
`;

export default {
  BottomSeparator,
  FormWrapper,
  Form,
  EnterAudio,
  AudioNote,
  FormElement,
  LabelSmall,
  LabelSmallFullWidth,
  BackButton,
  FetchingAnimation,
};
