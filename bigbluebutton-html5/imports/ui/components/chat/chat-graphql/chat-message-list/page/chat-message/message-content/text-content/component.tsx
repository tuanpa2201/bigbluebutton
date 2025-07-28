import React from 'react';
import joypixels from 'emoji-toolkit';
import Styled from './styles';
import { textToMarkdown } from '/imports/ui/components/chat/chat-graphql/service';

interface ChatMessageTextContentProps {
  text: string;
  dataTest?: string | null;
}
const ChatMessageTextContent: React.FC<ChatMessageTextContentProps> = ({
  text,
  dataTest = 'messageContent',
}) => {
  // const { allowedElements } = window.meetingClientSettings.public.chat;

  // Convert text to markdown format
  const markdownText = <span dangerouslySetInnerHTML={{ __html: joypixels.toImage(textToMarkdown(text)) }} />;
  return (
    <Styled.ChatMessage data-test={dataTest}>
      {markdownText}
    </Styled.ChatMessage>
  );
};
export default ChatMessageTextContent;
