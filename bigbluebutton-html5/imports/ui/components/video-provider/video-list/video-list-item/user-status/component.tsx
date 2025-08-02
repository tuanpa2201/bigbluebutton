import React from 'react';
import Styled from './styles';
import { User, VideoItem } from '/imports/ui/components/video-provider/types';
import JoypixelsEmoji from '/imports/ui/components/common/JoypixelsEmoji';

interface UserStatusProps {
  user: Partial<User>;
  stream: VideoItem;
  voiceUser: {
    muted: boolean;
    listenOnly: boolean;
    joined: boolean;
  };
}

const UserStatus: React.FC<UserStatusProps> = (props) => {
  const { voiceUser, user, stream } = props;
  const data = { ...user, ...stream };

  const listenOnly = voiceUser?.listenOnly;
  const emoji = data?.reactionEmoji;
  const away = data?.away;
  return (
    <div>
      {away && <JoypixelsEmoji native="⏰" size={24} /> }
      {(emoji && emoji !== 'none' && !away) && <JoypixelsEmoji native={emoji} size={24} />}
      {listenOnly && <Styled.Voice iconName="listen" /> }
    </div>
  );
};

export default UserStatus;
