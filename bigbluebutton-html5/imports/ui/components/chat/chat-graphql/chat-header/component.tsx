import React, { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { defineMessages, useIntl } from 'react-intl';
import styled from 'styled-components';
import { GET_CHAT_DATA, GetChatDataResponse, CLOSE_PRIVATE_CHAT_MUTATION } from './queries';
import closePrivateChat from './services';
import { layoutSelect, layoutDispatch } from '../../../layout/context';
import { Layout } from '../../../layout/layoutTypes';
import { ACTIONS, PANELS } from '../../../layout/enums';
import ChatActions from './chat-actions/component';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

interface ChatHeaderProps {
  chatId: string;
  isPublicChat: boolean;
}

const intlMessages = defineMessages({
  closeChatLabel: {
    id: 'app.chat.closeChatLabel',
    description: 'aria-label for closing chat button',
  },
  hideChatLabel: {
    id: 'app.chat.hideChatLabel',
    description: 'aria-label for hiding chat button',
  },
  titlePublic: {
    id: 'app.chat.titlePublic',
    description: 'Public chat title',
  },
  titlePrivate: {
    id: 'app.chat.titlePrivate',
    description: 'Private chat title',
  },
  titleDiscuss: {
    id: 'app.chat.titleDiscuss',
    description: 'Discuss title',
  },
});

const CloseButtonMobile = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 20px;
  height: 20px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  background: none;

  @media (min-width: 1025px) {
    display: none !important;
  }
`;

const ChatHeader: React.FC<ChatHeaderProps> = ({
  chatId, isPublicChat,
}) => {
  const layoutContextDispatch = layoutDispatch();
  const intl = useIntl();
  const [updateVisible] = useMutation(CLOSE_PRIVATE_CHAT_MUTATION);

  const closePanel = useCallback(() => {
    updateVisible({ variables: { chatId, visible: false } });
    closePrivateChat(chatId);
    layoutContextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
      value: false,
    });
    layoutContextDispatch({
      type: ACTIONS.SET_ID_CHAT_OPEN,
      value: '',
    });
    layoutContextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
      value: PANELS.NONE,
    });
  }, [layoutContextDispatch]);

  return (
    <>
      <h2 className="sr-only chat-header">{intl.formatMessage(intlMessages.titleDiscuss)}</h2>
      <div className="d-flex align-items-center justify-content-between chat-header-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CloseButtonMobile className="header-icon" onClick={closePanel}>
            <SvgIcon iconName="chevronLeft" />
          </CloseButtonMobile>
          <span className="chat-header">{intl.formatMessage(intlMessages.titleDiscuss)}</span>
        </div>
        <div className="d-flex align-items-center">
          {/* eslint-disable-next-line max-len */}
          {isPublicChat ? <ChatActions /> : null}
          <button type="button" onClick={closePanel} style={{ background: 'none', border: 'none' }} className="btnClose">
            <SvgIcon iconName="cross_20" />
          </button>
        </div>
      </div>
    </>
  );
};

const isChatResponse = (data: unknown): data is GetChatDataResponse => {
  return (data as GetChatDataResponse).chat !== undefined;
};

const ChatHeaderContainer: React.FC = () => {
  const idChatOpen = layoutSelect((i: Layout) => i.idChatOpen);

  const {
    data: chatData,
    loading: chatDataLoading,
    error: chatDataError,
  } = useQuery<GetChatDataResponse>(GET_CHAT_DATA, {
    variables: { chatId: idChatOpen },
  });

  if (chatDataLoading) return null;
  if (chatDataError) {
    return (
      <div>
        Error:
        {JSON.stringify(chatDataError)}
      </div>
    );
  }
  if (!isChatResponse(chatData)) {
    return (
      <div>
        Error:
        {JSON.stringify(chatData)}
      </div>
    );
  }
  const isPublicChat = chatData.chat[0]?.public;
  return (
    <>
      <ChatHeader
        chatId={idChatOpen}
        isPublicChat={isPublicChat}
      />
    </>
  );
};

export default ChatHeaderContainer;
