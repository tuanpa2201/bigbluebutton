import styled from 'styled-components';
import {colorGrayDark, colorText} from '/imports/ui/stylesheets/styled-components/palette';
import {
  ChatTime as ChatTimeBase
} from "/imports/ui/components/chat/chat-graphql/chat-message-list/page/chat-message/message-header/styles";

export const PollText = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${colorText};
  word-break: break-word;
`;

export const PollWrapper = styled.div`
  width: 100%;
`;

export const ChatTime = styled(ChatTimeBase)`
  font-style: italic;
  color: ${colorGrayDark};
  display: none;

  .chat-message-container:focus &,
  .chat-message-container-keyboard-focused &,
  .chat-message-content:hover & {
    display: flex;
  }
`;

export default {
  PollText,
  PollWrapper,
  ChatTime,
};
