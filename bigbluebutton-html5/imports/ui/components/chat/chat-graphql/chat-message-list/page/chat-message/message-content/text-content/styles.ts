import styled from 'styled-components';
import { colorText } from '/imports/ui/stylesheets/styled-components/palette';

interface ChatMessageProps {
  systemMsg?: boolean;
}

export const ChatMessage = styled.div<ChatMessageProps>`
  flex: 1;
  display: flex;
  flex-flow: row;
  flex-direction: column;
  color: ${colorText};
  word-break: break-word;

  & img {
    width: 100%;
    height: 100%;
    max-width: 24px;
    max-height: 24px;
  }

  & p {
    margin: 0;
    white-space: pre-wrap;
  }

  & code {
    white-space: pre-wrap;
  }
  & h1 {
    font-size: 1.5em;
    margin: 0;
  }
  & h2 {
    font-size: 1.3em;
    margin: 0;
  }
  & h3 {
    font-size: 1.1em;
    margin: 0;
  }
  & h4 {
    margin: 0;
  }
  & h5 {
    margin: 0;
  }
  & h6 {
    margin: 0;
  }
  
  & span {
    display: inline-flex;
    align-items: center;
    color: var(--Text-Primary, #313131);

    /* Regular/M */
    font-family: "FS PF BeauSans Pro", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

export default {
  ChatMessage,
};
