import React from 'react';
import joypixels from 'emoji-toolkit';
import Styled from './styles';
import { User, VideoItem } from '/imports/ui/components/video-provider/types';

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
  const muted = voiceUser?.muted;
  const voiceUserJoined = voiceUser?.joined;
  const emoji = data?.reactionEmoji;
  const away = data?.away;
  return (
    <div>
      {away && <span className="user-avatar-icon" dangerouslySetInnerHTML={{ __html: joypixels.toImage('⏰') }} /> }
      {(emoji && emoji !== 'none' && !away) && <span className="user-avatar-icon" dangerouslySetInnerHTML={{ __html: joypixels.toImage(data?.reactionEmoji) }} />}
      {(muted && !listenOnly) && <Styled.Muted iconName="unmute_filled" />}
      {listenOnly && <Styled.Voice iconName="listen" /> }
      {(voiceUserJoined && !muted) && <Styled.Voice iconName="unmute" />}
    </div>
  );
};

export default UserStatus;
