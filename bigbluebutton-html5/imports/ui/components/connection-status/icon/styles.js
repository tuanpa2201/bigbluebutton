import styled from 'styled-components';
import {
  colorSecondary,
  colorWhite,
} from '/imports/ui/stylesheets/styled-components/palette';

const SignalBars = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  ${({ grayscale }) => grayscale && `
    & > div {
      background-color: ${colorWhite};
    }
  `}

  ${({ grayscale, level }) => !grayscale && level === 'critical' && `
    & > div {
      background-color: #EE0033;
    }
  `}

  ${({ grayscale, level }) => !grayscale && level === 'danger' && `
    & > div {
      background-color: #F26724;
   }
  `}

  ${({ grayscale, level }) => !grayscale && level === 'warning' && `
    & > div {
      background-color: #9207FF;
    }
  `}

  ${({ grayscale, level }) => !grayscale && level === 'normal' && `
    & > div {
      background-color: ${colorSecondary};
    }
  `}
`;

const Bar = styled.div`
  width: 14%;
  border-radius: .46875em;
`;

const FirstBar = styled(Bar)`
  height: 25%;
`;

const SecondBar = styled(Bar)`
  height: 50%;

  ${({ active }) => !active && `
    background-color: #BEBEBE !important;
  `}
`;

const ThirdBar = styled(Bar)`
  height: 75%;

  ${({ active }) => !active && `
    background-color: #BEBEBE !important;
  `}
`;

const FourthBar = styled(Bar)`
  height: 100%;

  ${({ active }) => !active && `
    background-color: #BEBEBE !important;
  `}
`;

export default {
  SignalBars,
  FirstBar,
  SecondBar,
  ThirdBar,
  FourthBar,
};
