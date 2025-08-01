import styled from 'styled-components';
import {
  borderSize,
  borderRadius,
  smPaddingY,
  mdPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  colorText,
  colorGrayLighter,
  colorGray,
  colorBlueLight,
  colorPrimary,
} from '/imports/ui/stylesheets/styled-components/palette';
import { fontSizeSmall } from '/imports/ui/stylesheets/styled-components/typography';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import Button from '/imports/ui/components/common/button/component';

type urlProps = {
  animations: boolean;
}

const UrlError = styled.div<urlProps>`
  color: red;
  padding: 1em 0 2.5em 0;

  ${({ animations }) => animations && `
    transition: 1s;
  `}
`;

const ExternalVideoModal = styled(ModalSimple)`
  //padding: 1rem;
  //min-height: 23rem;
`;

const Label = styled.label`
    color: var(--Text-Primary, #313131);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`
const InputUrl = styled.input`
    display: flex !important;
    padding: 6px 12px !important;
    align-items: center !important;
    border-radius: var(--p-border-radius-button) !important;
    border: 0.66px solid var(--Border-01, #C8C8C8) !important;
    background: var(--BG-00, #FFF);
    line-height: 20px !important;
    margin: 4px 0 0 !important;
`

const Content = styled.div`
    padding-bottom: 16px;
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //padding: 0;
  //margin-right: auto;
  //margin-left: auto;
  //width: 100%;
`;

const ButtonFooter = styled.div`
    display: flex;
    padding-top: 12px;
    border-top: 1px solid var(--Border-00, #EFEFEF);
    background: var(--BG-00, #FFF);
    gap: 8px;
    justify-content: end;
`;


const VideoUrl = styled.div<urlProps>`
  //margin: 0 ${borderSize} 0 ${borderSize};

  & > label {
    display: block;
  }

  & > label input {
    display: block;
    margin: 10px 0 10px 0;
    //padding: 0.4em;
    //color: ${colorText};
    //line-height: 2rem;
    width: 100%;
    font-family: inherit;
    font-weight: inherit;
    //border: 1px solid ${colorGrayLighter};
    //border-radius: ${borderRadius};

    ${({ animations }) => animations && `
      transition: box-shadow .2s;
    `}

    &:focus {
      outline: none;
      //border-radius: ${borderSize};
      // box-shadow: 0 0 0 ${borderSize} ${colorBlueLight}, inset 0 0 0 1px ${colorPrimary};
    }
  }

  & > span {
    font-weight: 600;
  }
`;

const ExternalVideoNote = styled.div`
  color: var(--Text-Secondary, #6F767E);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  padding-top: 16px; 
    
  //color: ${colorGray};
  //font-size: ${fontSizeSmall};
  //font-style: italic;
  //padding-top: ${smPaddingY};
`;

const CancelButton = styled(Button)`

`;


// @ts-ignore - Button is JSX element
const StartButton = styled(Button)`
  display: flex;
  align-self: center;

  &:focus {
    outline: none !important;
  }

  & > i {
    color: #3c5764;
  }

  margin: 0;
  display: block;
  //position: absolute;
  //bottom: ${mdPaddingX};
`;

export default {
  UrlError,
  ExternalVideoModal,
  Content,
  ButtonFooter,
  VideoUrl,
  ExternalVideoNote,
  StartButton,
  CancelButton,
  InputUrl,
  Label,
};
