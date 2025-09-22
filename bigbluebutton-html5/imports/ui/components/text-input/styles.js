import styled from 'styled-components';
import {
  smPaddingX,
  borderSize,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  colorText,
  colorGrayLighter,
  colorBlueLight,
  colorPrimary,
} from '/imports/ui/stylesheets/styled-components/palette';
import { fontSizeBase } from '/imports/ui/stylesheets/styled-components/typography';
import TextareaAutosize from 'react-autosize-textarea';
import Button from '/imports/ui/components/common/button/component';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextArea = styled(TextareaAutosize)`
  height: 32px;
  flex: 1;
  background-clip: padding-box;
  margin: 0;
  &::placeholder {
    color: ${colorText};
  }
  -webkit-appearance: none;
  padding: 7px 10px;
  resize: none;
  transition: none;
  font-size: ${fontSizeBase};
  min-height: 2.5rem;
  max-height: 10rem;
  box-shadow: 0 0 0 1px ${colorGrayLighter};
  border-radius: var(--p-border-radius-button);
  border: 0.66px solid var(--Border-01, #C8C8C8);
  background: var(--BG-00, #FFF);

  &:hover {
    outline: transparent;
    outline-style: dotted;
    outline-width: ${borderSize};
  }

  &:active,
  &:focus {
    outline: transparent;
    outline-width: ${borderSize};
    outline-style: solid;
  }

  &:focus {
    outline: none;
    border-radius: ${borderSize};
    box-shadow: 0 0 0 ${borderSize} ${colorBlueLight}, inset 0 0 0 1px ${colorPrimary};
  }
`;

const TextInputButton = styled(Button)`
  margin:0 0 0 ${smPaddingX};
  align-self: center;
  font-size: 0.9rem;
  width: 32px;

  [dir="rtl"]  & {
    margin: 0 ${smPaddingX} 0 0;
    -webkit-transform: scale(-1, 1);
    -moz-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
    &.btn.btn-primary{
      @media only screen and (max-width: 768px) {
        width: 40px;
        height: 40px !important;
      }
    }
`;

export default {
  Wrapper,
  TextArea,
  TextInputButton,
};
