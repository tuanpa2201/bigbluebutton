import styled from 'styled-components';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import Button from '/imports/ui/components/common/button/component';

const LeaveButton = styled(Button)`
  padding: 0px;
  background-color: transparent;

  ${({ state }) => state === 'open'
    && `
    @media ${smallOnly} {
      display: none;
    }
  `}

  ${({ state }) => state === 'closed'
    && `
  @media ${smallOnly} {
    margin-left: 0;
    margin-right: 0;
  }
`}

  ${({ state }) => state === 'closed'
    && `
    border-radius: 1.1rem;
    font-size: 1rem;
    line-height: 1.1rem;
    font-weight: 400;
    z-index: 3;
  `}

  @media (min-width: 768px) and (max-width: 1024px) {
    svg {
      width: 54px;
      height: 54px;
    }
  }
`;

export default {
  LeaveButton,
};
