import styled from 'styled-components';
import {
  colorPrimary,
  colorWarning,
  colorDanger,
} from '/imports/ui/stylesheets/styled-components/palette';

const StatusIconWrapper = styled.div`
  border-radius: 50%;
  padding: 1.78571428571rem;

  ${({ color }) => {
    let bgColor = '#75C044';
    bgColor = color === 'warning' ? colorWarning : bgColor;
    bgColor = color === 'danger' ? colorDanger : bgColor;
    return `background-color: ${bgColor};`;
  }}
`;

const IconWrapper = styled.div`
  width: 2.85714285714rem;
  height: 2.85714285714rem;
`;

const Label = styled.div`
  font-weight: 400;
  margin-top: 12px;
  color: #6F767E;
  font-size: 1rem;
`;

const Settings = styled.span`
  color: ${colorPrimary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default {
  StatusIconWrapper,
  IconWrapper,
  Label,
  Settings,
};
