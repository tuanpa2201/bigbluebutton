import styled from 'styled-components';
import { colorGrayLightest, colorOffWhite, colorGrayLighter } from '/imports/ui/stylesheets/styled-components/palette';

const EmojiWrapper = styled.button<{ highlighted: boolean }>`
  background: none;
  border-radius: 8px;
  padding: 4px;
  line-height: 1;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid ${colorGrayLightest};
  cursor: pointer;

  ${({ highlighted }) => highlighted && `
    background-color: ${colorOffWhite};
  `}

  em-emoji {
    [dir='ltr'] & {
      margin-right: 0.25rem;
    }

    [dir='rtl'] & {
      margin-left: 0.25rem;
    }
  }

  &:hover {
    border: 1px solid ${colorGrayLighter};
  }
`;

export default {
  EmojiWrapper,
};
