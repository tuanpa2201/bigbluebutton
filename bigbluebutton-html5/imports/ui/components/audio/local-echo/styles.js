import styled from 'styled-components';
import Button from '/imports/ui/components/common/button/component';
import {
  colorPrimary,
  btnMutedBg,
} from '/imports/ui/stylesheets/styled-components/palette';

const LocalEchoTestButton = styled(Button)`
  height: 2rem;
  width: 100%;

  &:hover {
    background-color: ${btnMutedBg} !important
  }

  i {
    margin-right: 4px;
    ${({ animations }) => animations && `
      transition: all .2s ease-in-out;
    `}
  }

  background-color: transparent !important;
  color: ${colorPrimary} !important;

  font-size: 14px;

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px !important;
    line-height: 24px;
  }
  white-space: break-spaces;
`;

export default {
  LocalEchoTestButton,
};
