import styled, { css, keyframes } from 'styled-components';
import Button from '/imports/ui/components/common/button/component';
import {
  smPaddingX,
  smPaddingY,
  lgPaddingX,
  borderRadius,
  borderSize,
  pollInputHeight,
  pollSmMargin,
  pollMdMargin,
  mdPaddingX,
  pollStatsElementWidth,
  pollResultWidth,
  borderSizeLarge,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  colorText,
  colorBlueLight,
  colorGray,
  colorGrayLight,
  colorGrayLighter,
  colorGrayLightest,
  colorDanger,
  colorWarning,
  colorHeading,
  colorPrimary,
  colorGrayDark,
  colorWhite,
  pollBlue,
  pollStatsBorderColor,
} from '/imports/ui/stylesheets/styled-components/palette';
import { fontSizeBase, fontSizeSmall } from '/imports/ui/stylesheets/styled-components/typography';

const ToggleLabel = styled.span`
  margin-right: ${smPaddingX};

  [dir="rtl"] & {
    margin: 0 0 0 ${smPaddingX};
  }
`;

const PollOptionInput = styled.input`
  [dir="rtl"] & {
      margin-right: 0;
      margin-left: 1rem;
  }
  height: 40px;

  &:focus {
    outline: none;
    border-radius: ${borderSize};
    box-shadow: 0 0 0 ${borderSize} ${colorBlueLight}, inset 0 0 0 1px ${colorPrimary};
  }

  width: 100%;
  color: ${colorText};
  -webkit-appearance: none;
  //padding: calc(${smPaddingY} * 2) ${smPaddingX};
  //border-radius: ${borderRadius};
  font-size: ${fontSizeBase};
  // border: 1px solid ${colorGrayLighter};
  box-shadow: 0 0 0 1px ${colorGrayLighter};

    border-radius: var(--p-border-radius-button);
    border: 0.66px solid var(--Border-01, #C8C8C8);
    background: var(--BG-00, #FFF);
    padding: 6px 12px;
  
  @media (min-width: 376px) and (max-width: 768px) {
    font-size: 16px !important;
  }
`;
// @ts-ignore - Button is a JS Component
const DeletePollOptionButton = styled(Button)` 
    //font-size: ${fontSizeBase};
    flex: none;
    //width: 40px;
    position: relative;
    padding: 6px;
    border-radius: 8px;

    & > i {
        //font-size: 150%;
    }

    & > span {
        background: transparent !important;
    }

    &:hover {
        background: var(--BG-04---hover, #EFEFEF);
    }
    
`;

const ErrorSpacer = styled.div`
  position: relative;
  height: 10px;
  @media (min-width: 376px) and (max-width: 1366px) {
    height: 12px;
  }
`;

const InputError = styled(ErrorSpacer)`
  color: ${colorDanger};
  font-size: ${fontSizeSmall};
`;

const Instructions = styled.div`
  color: var(--Text-Secondary, #6F767E);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  
  margin-bottom: 16px;

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
  //color: ${colorText};
`;

type PollQuestionAreaProps = {
  hasError: boolean;
};

const PollQuestionArea = styled.textarea<PollQuestionAreaProps>`
  resize: none;

  &:focus {
    outline: none;
    //border-radius: ${borderSize};
    //box-shadow: 0 0 0 ${borderSize} ${colorBlueLight}, inset 0 0 0 1px ${colorPrimary};
  }

  width: 100%;
  //color: ${colorText};
  -webkit-appearance: none;
  padding: calc(${smPaddingY} * 2) ${smPaddingX};
  // border-radius: ${borderRadius};
  font-size: ${fontSizeBase};

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
  // border: 1px solid ${colorGrayLighter};
  //box-shadow: 0 0 0 1px ${colorGrayLighter};

  ${({ hasError }) => hasError && `
    border-color: ${colorDanger};
    box-shadow: 0 0 0 1px ${colorDanger};
  `}
  
  padding: 6px 12px;
  border-radius: var(--p-border-radius-button);
  border: 0.66px solid var(--Border-01, #C8C8C8);
  background: var(--BG-00, #FFF);
`;

const SectionHeading = styled.h4`
  margin-top: 0;
  font-weight: 600;
  //color: ${colorHeading};
  //margin-bottom: .25rem; 
  margin-bottom: 16px;
  @media (min-width: 769px) and (max-width: 1366px) {
    margin-bottom: 14px;
  }
  @media (min-width: 376px) and (max-width: 768px) {
    margin-bottom: 12px;
  }
  padding-bottom: 0 !important;

  color: var(--Text-Primary, #313131);
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const ResponseTypes = styled.div`
  margin-top: 16px;
`;

const ResponseChoices = styled.div`
  margin-top: 16px;
  @media (min-width: 376px) and (max-width: 768px) {
    margin-top: 24px;
  }
`;

const ResponseType = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  overflow-wrap: break-word;
  position: relative;
  width: 100%;
  margin-bottom: ${lgPaddingX};
  gap: 8px;
  & > button {
    position: relative;
    width: 100%;
  }
  @media (min-width: 769px) and (max-width: 1366px) {
    margin-bottom: 20px;
  }
  @media (min-width: 376px) and (max-width: 768px) {
    margin-bottom: 24px;
    gap: 12px;
  }
`;

// @ts-ignore - Button is a JS Component
const PollConfigButton = styled(Button)`
  //border: solid ${colorGrayLight} 1px;
  min-height: ${pollInputHeight};
  font-size: ${fontSizeBase};
  width: calc(50% - 4px) !important;
  @media (min-width: 376px) and (max-width: 768px) {
    width: calc(50% - 6px) !important;
  }
  white-space: pre-wrap;
  //margin-bottom: 1rem;

  border-radius: 8px;
  background: var(--BG-01, #F7F8F9);
  padding: 0 12px;
  
  & > span {
    color: var(--Text-Primary, #313131);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    
    &:hover {
      opacity: 1;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 16px;
    }
  }

  ${({ selected }) => selected && `
    // background-color: ${colorGrayLightest};
    background: var(--Highlight-Light-Red, #EB5366);
    // font-size: ${fontSizeBase};

    box-shadow: none !important;
    & > span {
      color: var(--Neutral-00, #FFF);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
    }
    &:hover,
    &:focus,
    &:active {
      // background-color: ${colorGrayLightest} !important;
      background-color: var(--Highlight-Light-Red, #EB5366) !important;
      box-shadow: none !important;
    }
  `}

  ${({ small }) => small && `
    width: 49% !important;
  `}

  ${({ full }) => full && `
    width: 100%;
  `}
`;

const PollParagraph = styled.div`
  //color: ${colorText};
  //margin-bottom: 0.9rem;
  margin-bottom: 16px;

  color: var(--Text-Primary, #313131);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const PollCheckbox = styled.div`
  display: inline-block;
  //margin-right: ${pollSmMargin};
  //margin-bottom: ${pollMdMargin};
    margin-bottom: 22px;
  @media (min-width: 376px) and (max-width: 768px) {
    margin-bottom: 16px;
  }

  .checkbox-label {
    span:nth-of-type(2) {
      @media (min-width: 768px) and (max-width: 1024px) {
        font-size: 16px;
      }
    }
  }
`;

// @ts-ignore - Button is a JS Component
const AddItemButton = styled(Button)`
  top: 1px;
  position: relative;
  //display: block;
  //width: 100%;
  text-align: left;
  //color: ${colorPrimary};
  padding-left: 0;
  padding-right: 0;
  //font-size: ${fontSizeBase};
  white-space: pre-wrap;
    
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--Color-01, #E03);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
    
  &:hover {
    & > span {
      opacity: 1;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: wrap;
  flex-grow: 1;
  justify-content: space-between;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
`;

const Warning = styled.div`
  color: ${colorWarning};
  font-size: ${fontSizeSmall};
`;

const CustomInputRow = styled.div`
  display: flex;
  flex-flow: nowrap;
  flex-grow: 1;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  flex-grow: 1;
  
  &:last-child {
    padding-right: 0;
    padding-left: 1rem;

    [dir="rtl"] & {
      padding-right: 0.1rem;
      padding-left: 0;
    }
  }
`;

const Toggle = styled.label`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

// @ts-ignore - Button is a JS Component
const StartPollBtn = styled(Button)`
  position: relative;
  width: 100%;
  min-height: ${pollInputHeight};
  //margin-top: 1rem;
  font-size: ${fontSizeBase};
  overflow-wrap: break-word;
  white-space: pre-wrap;
  &:hover {
    & > span {
      opacity: 1;
    }
  }
`;
const StartPoll = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 28px;
    
  @media (min-width: 376px) and (max-width: 768px) {
    padding: 20px;
  }
  @media (max-width: 375px) {
    padding: 16px;
  }
    background: #FFF;
  @media (max-width: 768px) {
    padding: 28px;
    position: fixed;
  }
`;

const NoSlidePanelContainer = styled.div`
  color: ${colorGrayDark};
  text-align: center;
`;

// @ts-ignore - Button is a JS Component
const PollButton = styled(Button)`
  margin-top: ${smPaddingY};
  margin-bottom: ${smPaddingY};
  // background-color: ${colorWhite};
  box-shadow: 0 0 0 1px ${colorPrimary};
  color: ${colorWhite};
  background-color: ${colorPrimary}

  & > span {
    color: ${colorGray};
  }

  & > span:hover {
    color: ${colorWhite};
    opacity: 1;
  }

  &:active {
    background-color: ${colorWhite};
    box-shadow: 0 0 0 1px ${pollBlue};

    & > span {
      color: ${pollBlue};
    }
  }

  &:focus {
    background-color: ${colorWhite};
    box-shadow: 0 0 0 1px ${pollBlue};

    & > span {
      color: ${pollBlue};
    }
  }

  &:nth-child(even) {
    margin-right: inherit;
    margin-left: ${smPaddingY};

    [dir="rtl"] & {
      margin-right: ${smPaddingY};
      margin-left: inherit;
    }
  }

  &:nth-child(odd) {
    margin-right: 1rem;
    margin-left: inherit;

    [dir="rtl"] & {
      margin-right: inherit;
      margin-left: ${smPaddingY};
    }
  }

  &:hover {
    box-shadow: 0 0 0 1px ${colorWhite};
    background-color: ${colorWhite};
    color: ${pollBlue};

    & > span {
      color: ${pollBlue};
      opacity: 1;
    }
  }
`;

const DragAndDropPollContainer = styled.div`
  width: 200px !important;
  height: 200px !important;
`;

const Question = styled.div`
  margin-bottom: ${lgPaddingX};
`;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
    gap: 8px;
`;

const ResponseArea = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const CustomInputHeading = styled(SectionHeading)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: ${mdPaddingX};

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const CustomInputHeadingCol = styled(Col)`
  overflow: hidden;
`;

const CustomInputToggleCol = styled(Col)`
  flex-shrink: 0;
`;

const AnonymousHeading = styled(CustomInputHeading)``;

const AnonymousHeadingCol = styled(CustomInputHeadingCol)``;

const AnonymousToggleCol = styled(CustomInputToggleCol)``;

const AnonymousRow = styled(Row)`
  flex-flow: nowrap;
  width: 100%;
  border-top: 1px solid rgb(239, 239, 239);
  padding-top: 20px;
  @media (min-width: 769px) and (max-width: 1366px) {
    margin-top: 20px;
    padding-top: 20px;
  }
  @media (min-width: 376px) and (max-width: 768px) {
    margin-top: 24px;
    padding-top: 24px;
  }
`;

const ResultLeft = styled.td`
    //padding: 0 .5rem 0 0;
        //border-bottom: 1px solid ${colorGrayLightest};

    [dir="rtl"] & {
        //padding: 0 0 0 .5rem;
    }

    //padding-bottom: .25rem;
    word-break: break-all;

    color: var(--Text-Primary, #313131);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    //padding-bottom: 12px;
    padding-top: 12px;
  @media (min-width: 376px) and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ResultRight = styled.td`
    //padding-bottom: .25rem;

    //padding-bottom: 12px;
    padding-top: 12px;
    word-break: break-all;
    color: var(--Text-Primary, #313131);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  @media (min-width: 376px) and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  font-weight: bold;
  max-width: ${pollResultWidth};
  min-width: ${pollStatsElementWidth};
  word-wrap: break-word;
  flex: 6;

  padding: ${smPaddingY};
  margin-top: ${pollSmMargin};
  margin-bottom: ${pollSmMargin};
  color: ${colorText};

  position: relative;
`;

const Center = styled.div`
  position: relative;
  flex: 3;
  border-left: 1px solid ${colorGrayLighter};
  border-right : none;
  width: 100%;
  height: 100%;

  [dir="rtl"] & {
    border-left: none;
    border-right: 1px solid ${colorGrayLighter};
  }

  padding: ${smPaddingY};
  margin-top: ${pollSmMargin};
  margin-bottom: ${pollSmMargin};
  color: ${colorText};
`;

const Right = styled.div`
  text-align: right;
  max-width: ${pollStatsElementWidth};
  min-width: ${pollStatsElementWidth};
  flex: 1;

  [dir="rtl"] & {
    text-align: left;
  }

  padding: ${smPaddingY};
  margin-top: ${pollSmMargin};
  margin-bottom: ${pollSmMargin};
  color: ${colorText};

  position: relative;
`;

const BarShade = styled.div`
  background-color: ${colorGrayLighter};
  height: 100%;
  min-height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

const BarVal = styled.div`
  position: inherit;
`;

const Stats = styled.div`
  margin-bottom: ${smPaddingX};
  display: flex;
  flex-direction: column;
  //border: 1px solid ${pollStatsBorderColor};
  border-radius: ${borderSizeLarge};
  //padding: ${mdPaddingX};

  & > div {
    display: flex;
    flex-direction: row;

    & > div:nth-child(even) {
      position: relative;
      height: 75%;
      width: 50%;
      text-align: center;
    }
  }
`;

const Title = styled.span`
  font-weight: bold;
  word-break: break-all;
  white-space: pre-wrap;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const Status = styled.div`
  margin-bottom: .5rem;
`;

const ellipsis = keyframes`
  to {
    width: 1.25em;
    margin-right: 0;
    margin-left: 0;
  }
`;

interface ConnectingAnimationProps {
  animations: boolean;
}

const ConnectingAnimation = styled.span<ConnectingAnimationProps>`
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    content: "\\2026"; /* ascii code for the ellipsis character */
    width: 0;
    margin: 0 1.25em 0 0;

    [dir="rtl"] & {
      margin: 0 0 0 1.25em;
    }

    ${({ animations }) => animations && css`
      animation: ${ellipsis} steps(4, end) 900ms infinite;
    `}
  }
`;

const ButtonsActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  background: #FFF;
`;

// @ts-ignore - Button is a JS Component
const PublishButton = styled(Button)`
  width: 48%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const CancelButton = styled(PublishButton)``;

// @ts-ignore - Button is a JS Component
const LiveResultButton = styled(Button)`
  width: 100%;
  margin-top: ${smPaddingY};
  margin-bottom: ${smPaddingY};
  font-size: ${fontSizeBase};
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const Separator = styled.div`
  display: flex;
  flex: 1 1 100%;
  height: 1px;
  min-height: 1px;
  background-color: ${colorGrayLightest};
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const THeading = styled.th`
  text-align: left;

  [dir="rtl"] & {
    text-align: right;
  }

    border-bottom: 1px solid var(--Border-00,#EFEFEF);
    padding-bottom: 12px;

    color: var(--Text-Secondary, #6F767E);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  
  @media (min-width: 376px) and (max-width: 768px) {
    font-size: 16px;
  }
`;

const DndTextArea = styled.textarea<{ active: boolean }>`
  height: 124px;
  padding: 6px 12px;
  border-radius: var(--p-border-radius-button);
  border: 0.66px solid var(--Border-01, #C8C8C8);
  background: var(--BG-00, #FFF);
  
  ${({ active }) => active && `
    background: ${colorGrayLighter};
  `}

  ${({ active }) => !active && `
    background: ${colorWhite};
  `}
`;

const PollHeader = styled.div`
    display: flex;
    align-items: center;
    color: var(--Text-Primary, #313131);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
    padding: 16px 0px;
    margin-bottom: 16px;

    @media (max-width: 1024px) {
      max-height: 64px;
    }
  
    .header-title {
      @media (max-width: 375px) {
        font-size: 18px;
      }
    }
`;

const ClosePollButton = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 12px;
    box-shadow: unset;
    color: #2F384C;
    cursor: pointer;
    padding: 6px;
    display: none;
    align-items: center;
    justify-content: center;
    tab-index: 0;
    margin-left: auto;

    &:hover {
        background-color: ${colorGrayLightest};
    }

    @media (min-width: 1025px) {
      display: flex !important;
    }
`;

const ClosePollButtonMobile = styled.button`
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

  @media (min-width: 1025px) {
    display: none !important;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const TableResult = styled.table`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 0.66px solid var(--Border-01, #C8C8C8);
`;



export default {
  ClosePollButton,
  ClosePollButtonMobile,
  PollHeader,
  ToggleLabel,
  PollOptionInput,
  DeletePollOptionButton,
  ErrorSpacer,
  InputError,
  Instructions,
  PollQuestionArea,
  SectionHeading,
  ResponseType,
  ResponseTypes,
  ResponseChoices,
  PollConfigButton,
  PollParagraph,
  PollCheckbox,
  AddItemButton,
  Row,
  Col,
  Toggle,
  StartPollBtn,
  NoSlidePanelContainer,
  PollButton,
  DragAndDropPollContainer,
  Warning,
  CustomInputRow,
  Question,
  OptionWrapper,
  ResponseArea,
  CustomInputHeading,
  CustomInputHeadingCol,
  CustomInputToggleCol,
  AnonymousHeading,
  AnonymousHeadingCol,
  AnonymousToggleCol,
  AnonymousRow,
  ResultLeft,
  ResultRight,
  Main,
  Left,
  Center,
  Right,
  BarShade,
  BarVal,
  Stats,
  Title,
  Status,
  ConnectingAnimation,
  ButtonsActions,
  PublishButton,
  CancelButton,
  LiveResultButton,
  Separator,
  THeading,
  DndTextArea,
  TableResult,
  StartPoll,
};
