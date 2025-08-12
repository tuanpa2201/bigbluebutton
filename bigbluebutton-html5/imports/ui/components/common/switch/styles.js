import styled, { css } from 'styled-components';
import { borderSize } from '/imports/ui/stylesheets/styled-components/general';
import { colorDanger, colorSuccess } from '/imports/ui/stylesheets/styled-components/palette';
import { phoneOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';

const Switch = styled.div`
  &:hover,
  &:focus,
  &:focus-within {
    outline: transparent;
    outline-style: dotted;
    outline-width: ${borderSize};
  }

  &:focus,
  &:focus-within {
    outline-style: solid;
  }

  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;

  ${({ disabled }) => disabled && `
    cursor: not-allowed;
    opacity: 0.5;
  `}

  ${({ disabled, animations }) => disabled && animations && `
    transition: opacity 0.25s;
  `}
`;

const ToggleTrack = styled.div`
  overflow: hidden;
  //width: 2.5rem;
  //height: 1.5rem;
  padding: 0;
  border-radius: 6px;
  // background-color: ${colorDanger};
  
  width: 32px;
  height: 20px;
  background: #EFEFEF;
  
  [dir="rtl"] & {
    width: 3rem;
  }

  ${({ animations }) => animations && `
    transition: all 0.2s ease;
  `}

  ${({ checked }) => checked && `
    // background-color: ${colorSuccess};
    background-color: #EE0033;
  `}

  ${({ invertColors, checked }) => invertColors && !checked && `
    background-color: ${colorSuccess} !important;
  `}

  ${({ invertColors, checked }) => invertColors && checked && `
    background-color: ${colorDanger} !important;
  `}
  @media ${phoneOnly} {
    width: 40px;
    height: 25px;
  }

`;

const ToggleTrackCheck = styled.div`
  position: absolute;
  color: white;
  width: 1rem;
  line-height: 1.5rem;
  font-size: 0.8rem;
  left: 0.5rem;
  opacity: 0;

  [dir="rtl"] & {
    left: 0.8rem;
  }

  ${({ animations }) => animations && `
    transition: opacity 0.25s ease;
  `}

  ${({ checked }) => checked && `
    opacity: 1;
    transition: opacity calc(var(--enableAnimation) * 0.25s) ease;
  `}
`;

const ToggleTrackX = styled.div`
  position: absolute;
  color: white;
  width: 1rem;
  line-height: 1.5rem;
  font-size: 0.8rem;
  left: 1.7rem;
  opacity: 1;

  [dir="rtl"] & {
    left: 2.2rem;
  }

  ${({ animations }) => animations && `
    transition: opacity 0.25s ease;
  `}

  ${({ checked }) => checked && `
    opacity: 0;
  `}
`;

const ToggleThumb = styled.div`
  position: absolute;
  //top: 2px;
  left: ${({ isRTL }) => (isRTL ? '1.6rem' : '2px')};
  //width: 1.2rem;
  //height: 1.2rem;
  //border-radius: 6px;
  //background-color: #FAFAFA;
  box-sizing: border-box;
  //box-shadow: 2px 0px 10px -1px rgba(0,0,0,0.4);

  top: 2px;
  width: 16px;
  height: 16px;
  background: #ffffff;
  box-shadow:
    0px 0px 2px -1px rgba(0, 0, 0, 0.35),
    inset 0px -1px 1px rgba(0, 0, 0, 0.03);
  border-radius: 5px;

  ${({ animations }) => animations
    && `
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  `}

  ${({ checked }) => checked
    && css`
      left: ${({ isRTL }) => (isRTL ? '2px' : 'calc(100% - 16px - 2px)')};
      //box-shadow: -2px 0px 10px -1px rgba(0,0,0,0.4);
      box-shadow:
        0px 1px 2px rgba(240, 65, 87, 0.35),
        inset 0px -2px 1px rgba(0, 0, 0, 0.1);
    `}

  ${({ hasFocus }) => hasFocus
    && `
    // box-shadow: 0px 0px 2px 3px #0F70D7;
  `}

  ${({ disabled }) => !disabled
    && `
    &:active{
      // box-shadow: 0px 0px 5px 5px #0F70D7;
    }
  `}

  @media ${phoneOnly} {
    width: 20px;
    height: 20px;
    ${({ checked }) => checked
      && css`
        left: ${({ isRTL }) => (isRTL ? '2px' : 'calc(100% - 16px - 6px)')};
      `}
  }
`;

const ScreenreaderInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export default {
  Switch,
  ToggleTrack,
  ToggleTrackCheck,
  ToggleTrackX,
  ToggleThumb,
  ScreenreaderInput,
};
