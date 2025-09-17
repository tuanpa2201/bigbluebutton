import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { ChatEvents } from '/imports/ui/core/enums/chat';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

import {
  Container, Left, Root,
} from './styles';

const intlMessages = defineMessages({
  editing: {
    id: 'app.chat.toolbar.edit.editing',
    description: '',
  },
  cancel: {
    id: 'app.chat.toolbar.edit.cancel',
    description: '',
  },
});

const ChatEditingWarning = () => {
  const [show, setShow] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    const handleEditingMessage = (e: Event) => {
      if (e instanceof CustomEvent) {
        setShow(true);
      }
    };

    const handleCancelEditingMessage = (e: Event) => {
      if (e instanceof CustomEvent) {
        setShow(false);
      }
    };
    window.addEventListener(ChatEvents.CHAT_EDIT_REQUEST, handleEditingMessage);
    window.addEventListener(ChatEvents.CHAT_CANCEL_EDIT_REQUEST, handleCancelEditingMessage);

    return () => {
      window.removeEventListener(ChatEvents.CHAT_EDIT_REQUEST, handleEditingMessage);
      window.removeEventListener(ChatEvents.CHAT_CANCEL_EDIT_REQUEST, handleCancelEditingMessage);
    };
  }, []);

  if (!show) return null;

  const editingMessage = intl.formatMessage(intlMessages.editing);

  return (
    <Root role="note" aria-describedby="cancel-editing-msg">
      <Container>
        <Left>
          <SvgIcon iconName="edit" />
          {editingMessage}
        </Left>
      </Container>
    </Root>
  );
};

export default ChatEditingWarning;
