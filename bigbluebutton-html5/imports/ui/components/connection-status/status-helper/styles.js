import styled from 'styled-components';
import {
  colorPrimary,
  colorWarning,
  colorDanger,
} from '/imports/ui/stylesheets/styled-components/palette';

const StatusIconWrapper = styled.div`
  border-radius: 50%;
  padding: 1.7857rem;

  ${({ color }) => {
    let bgColor = '#83BF6E';
    bgColor = color === 'warning' ? colorWarning : bgColor;
    bgColor = color === 'danger' ? colorDanger : bgColor;
    return `background-color: ${bgColor}!important;`;
  }}
`;

const IconWrapper = styled.div`
  width: 2.857rem;
  height: 2.857rem;
`;

const Label = styled.div`
  font-weight: 600;
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
