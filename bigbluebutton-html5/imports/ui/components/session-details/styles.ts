import styled from 'styled-components';
import {
  colorPrimary,
} from '/imports/ui/stylesheets/styled-components/palette';
import Button from '/imports/ui/components/common/button/component';
import { smPadding } from '/imports/ui/stylesheets/styled-components/general';

const WelcomeMessage = styled.div`
  font-size: 1.0rem;
`;

const Container = styled.div<{ isFullWidth: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  text-align: left;

  & > div {
    flex: ${({ isFullWidth }) => (isFullWidth ? '1 1 100%' : '1 1 50%')};
    box-sizing: border-box;
    padding: 2px;
    overflow: auto;
    overflow-wrap: break-word;
  }

  & div p {
    margin: 0;
  }

  & a {
    color: ${colorPrimary};
    text-decoration: none;

    &:focus {
      color: ${colorPrimary};
      text-decoration: underline;
    }
    &:hover {
      filter: brightness(90%);
      text-decoration: underline;
    }
    &:active {
      filter: brightness(85%);
      text-decoration: underline;
    }
    &:hover:focus {
      filter: brightness(90%);
      text-decoration: underline;
    }
    &:focus:active {
      filter: brightness(85%);
      text-decoration: underline;
    }
  }
`;

const JoinTitle = styled.p`
  font-size: 1rem;
  color: var(--text-primary-light, #313131);
`;

const JoinContainer = styled.div`
  font-size: 1rem;
  color: var(--text-primary-light, #313131);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F7F8F9;
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 8px;
`;

// @ts-ignore - as button comes from JS, we can't provide its props
export const CopyButton = styled(Button)`
  color: ${colorPrimary};
  
  [dir='ltr'] & {
    margin-left: ${smPadding};
  }

  [dir='rtl'] & {
    margin-right: ${smPadding};
  }
`;

export const Chevron = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Content = styled.div`
  br {
    display: none;
  }
`;

export default {
  WelcomeMessage,
  Container,
  Content,
  JoinTitle,
  JoinContainer,
  CopyButton,
  Chevron,
};
