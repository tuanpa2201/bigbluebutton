import React from 'react';
import joypixels from 'emoji-toolkit';
import sanitizeHtml from 'sanitize-html';
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

  const html = joypixels.toImage(textToMarkdown(text));

  const safeHtml = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'data'],
    allowedSchemesByTag: {
      img: ['http', 'https', 'data'],
    },
  });

  // Convert text to markdown format
  const markdownText = <span className="text-primary-dark" dangerouslySetInnerHTML={{ __html: safeHtml }} />;
  return (
    <Styled.ChatMessage data-test={dataTest}>
      {markdownText}
    </Styled.ChatMessage>
  );
};
export default ChatMessageTextContent;
