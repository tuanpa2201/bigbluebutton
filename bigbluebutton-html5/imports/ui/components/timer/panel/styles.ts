import styled from 'styled-components';
import {
  borderSize,
  borderSizeLarge,
  smPaddingX,
  toastContentWidth,
  borderRadius,
} from '../../../stylesheets/styled-components/general';
import {
  colorGrayDark,
  colorGrayLighter,
  colorGrayLightest,
  colorGray,
  colorBlueLight,
  colorWhite,
  colorPrimary,
} from '../../../stylesheets/styled-components/palette';
import { TextElipsis } from '../../../stylesheets/styled-components/placeholders';
import Button from '/imports/ui/components/common/button/component';

const TimerSidebarContent = styled.div`
  background-color: ${colorWhite};
  //padding: ${smPaddingX};
  padding: 0 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  height: 100%;
  transform: translateZ(0);
`;

const CloseTimerButtonPC = styled.button`
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

const CloseTimerButtonMobile = styled.button`
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
  
  svg {
    @media (min-width: 376px) and (max-width: 768px) {
      width: 24px;
      height: 24px;
    }
  }
`;


const TimerHeader = styled.div`
    display: flex;
    align-items: center;
    color: var(--Text-Primary, #313131);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
    padding: 16px 0px;

    & > .header-title-container {
      display: flex;
      align-items: center;
      flex: 1;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    @media (max-width: 1024px) {
      padding: 8px 0;
      max-height: 64px;
    }
`;

const TimerTitle = styled.div`
  ${TextElipsis};
  flex: 1;

  & > button, button:hover {
    max-width: ${toastContentWidth};
  }
`;
// @ts-ignore - JS code
const TimerMinimizeButton = styled(Button)`
  position: relative;
  background-color: ${colorWhite};
  display: block;
  margin: ${borderSizeLarge};
  margin-bottom: ${borderSize};
  padding-left: 0;
  padding-right: inherit;

  [dir="rtl"] & {
    padding-left: inherit;
    padding-right: 0;
  }

  > i {
      color: ${colorGrayDark};
      font-size: smaller;

      [dir="rtl"] & {
        -webkit-transform: scale(-1, 1);
        -moz-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        transform: scale(-1, 1);
      }
  }

  &:hover {
      background-color: ${colorWhite};
  }
`;

const TimerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TimerCurrent = styled.span`
  // border-bottom: 1px solid ${colorGrayLightest};
  // border-top: 1px solid ${colorGrayLightest};
  display: flex;
  //font-size: xxx-large;
  justify-content: center;

    border-radius: 8px;
    border: 0.66px solid var(--Border-01, #C8C8C8);
    padding: 24px 0;
    color: var(--Text-Primary, #313131);
    text-align: center;
    font-size: 44px;
    font-style: normal;
    font-weight: 500;
    line-height: 48px;
    margin-top: 36px;
  
  @media (min-width: 376px) and (max-width: 768px) {
    line-height: 136px;
  }
`;

const TimerType = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  //padding-top: 2rem;
    margin-top: 16px;
    gap: 8px;
`;
// @ts-ignore - JS code
const TimerSwitchButton = styled(Button)`
  width: 100%;
  //height: 2rem;
  //margin: 0 .5rem;
    padding: 6px 12px;
    justify-content: center;
    align-items: center;
    border-radius: var(--p-border-radius-button);
    border: unset !important;
    font-size: 12px;
    font-style: normal;
    line-height: 16px;
    color: var(--Text-Primary, #313131);
    opacity: 1 !important;
    
    ${({ color }) => color === 'primary' && `
      background: var(--BG-04---hover, #EFEFEF);
      font-weight: 600;
      &:hover {
        background-color: var(--BG-04---hover, #EFEFEF) !important;
        color: var(--Text-Primary, #313131) !important;
      }
    `}

    ${({ color }) => color === 'secondary' && `
      background: transparent;
      font-weight: 400;
    `}
    
    & span{
        color: var(--Text-Primary, #313131) !important;
        &:hover{
            color: var(--Text-Primary, #313131) !important;
            opacity: 1;
        }
    }


  @media (min-width: 769px) and (max-width: 1366px) {
    font-size: 16px;
    height: 40px;
  }
  
  @media (min-width: 376px) and (max-width: 768px) {
    font-size: 16px;
    height: 40px;
  }

  @media (max-width: 376px) {
    font-size: 14px;
    height: 40px;
  }
`;

const StopwatchTime = styled.div`
  display: flex;
  //margin-top: 4rem;
  margin-top: 36px;
  width: 100%;
  //height: 3rem;
  font-size: x-large;
  justify-content: center;

  input {
    //width: 5rem;
      width: 100%;
  }
    gap: 6px;
`;

const StopwatchTimeInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .label {
    display: flex;
    font-size: small;
    justify-content: center;
  }
`;

const StopwatchTimeInputLabel = styled.div`
  display: flex;
  justify-content: center;
    
    color: var(--Text-Secondary, #6F767E);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; 
    margin-top: 8px;
    text-transform: capitalize;
  @media (min-width: 376px) and (max-width: 768px) {
    font-size: 14px;
  }
`;

const StopwatchTimeColon = styled.span`
    align-self: center;
    //padding: 0 .25rem;
    padding: 0 0 20px;

  color: var(--Text-Primary, #313131);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const TimerSongsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 4rem;
  margin-bottom: -2rem;
`;

const TimerRow = `
  display: flex;
  flex-flow: row;
  flex-grow: 1;
`;

const TimerCol = `
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  flex-basis: 0;
`;
type TimerSongsTitleProps = {
  stopwatch: boolean;
};
const TimerSongsTitle = styled.div<TimerSongsTitleProps>`
  ${TimerRow}
  display: flex;
  font-weight: bold;
  font-size: 1.1rem;
  opacity: ${({ stopwatch }) => (stopwatch ? '50%' : '100%')}
`;

const TimerTracks = styled.div`
  ${TimerCol}
  display: flex;
  margin-top: 0.8rem;
  margin-bottom: 2rem;
  
  .row {
    margin: 0.5rem auto;
  }

  label {
    display: flex;
  }
  
  input {
    margin: auto 0.5rem;
  }
`;

const TimerTrackItem = styled.div`
  ${TimerRow}
`;

const TimerControls = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 48px;
  gap: 8px;
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;
// @ts-ignore - JS code
const TimerControlButton = styled(Button)`
  width: 50%;
  //margin: 0 1rem;
`;

const TimerInput = styled.input`
  flex: 1;
  //border: 1px solid ${colorGrayLighter};
  border: unset;
  width: 50%;
  text-align: center;
  //padding: .25rem;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--BG-01, #F7F8F9);
  //border-radius: ${borderRadius};
  background-clip: padding-box;
  outline: none;
  
  @media (min-width: 376px) and (max-width: 768px) {
    font-size: 18px;
  }

  &::placeholder {
    color: ${colorGray};
    opacity: 1;
  }

  &:focus {
    border-radius: ${borderSize};
    box-shadow: 0 0 0 ${borderSize} ${colorBlueLight}, inset 0 0 0 1px ${colorPrimary};
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: .75;
    background-color: rgba(167,179,189,0.25);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }

  color: var(--Text-Primary, #313131);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
    
`;

const BottomSection = styled.div`
  @media (max-width: 1024px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export default {
  TimerSidebarContent,
  TimerHeader,
  TimerTitle,
  TimerMinimizeButton,
  TimerContent,
  TimerCurrent,
  TimerType,
  TimerSwitchButton,
  StopwatchTime,
  StopwatchTimeInput,
  StopwatchTimeInputLabel,
  StopwatchTimeColon,
  TimerSongsWrapper,
  TimerSongsTitle,
  TimerTracks,
  TimerTrackItem,
  TimerControls,
  TimerControlButton,
  TimerInput,
  CloseTimerButtonPC,
  CloseTimerButtonMobile,
  BottomSection,
};
