import React from 'react';
import Styled from './styles';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

interface ChatMessageNotificationContentProps {
  text: string;
  iconName?: string;
}

const ChatMessageNotificationContent: React.FC<ChatMessageNotificationContentProps> = (props) => {
  const { text, iconName } = props;
  return (
    <Styled.Root data-test="chatMessageNotificationContent">
      {iconName && <SvgIcon iconName={iconName} />}
      <Styled.Typography className="text-secondary-dark">
        {text}
      </Styled.Typography>
    </Styled.Root>
  );
};

export default ChatMessageNotificationContent;
