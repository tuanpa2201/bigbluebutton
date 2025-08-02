import styled from 'styled-components';
import { colorText, colorPrimary, colorGrayDark } from '/imports/ui/stylesheets/styled-components/palette';
import {
  ChatTime as ChatTimeBase,
} from '/imports/ui/components/chat/chat-graphql/chat-message-list/page/chat-message/message-header/styles';

export const ChatDowloadContainer = styled.div`
  display: flex;
  flex-flow: column;
  color: ${colorText};
  word-break: break-word;
`;

export const ChatLink = styled.a`
  color: ${colorPrimary};
`;

export const ChatTime = styled(ChatTimeBase)`
  font-style: italic;
  color: ${colorGrayDark};

  .chat-message-container:focus &,
  .chat-message-container-keyboard-focused &,
  .chat-message-content:hover & {
    display: flex;
  }
`;

export default {
  ChatDowloadContainer,
  ChatLink,
  ChatTime,
};
