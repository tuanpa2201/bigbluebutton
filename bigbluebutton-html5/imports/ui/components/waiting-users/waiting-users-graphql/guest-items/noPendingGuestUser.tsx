import React from 'react';
import Styled from '../styles';

const renderNoUserWaitingItem = (message: string) => (
  <Styled.PendingUsers>
    <Styled.NoPendingUsers className="no-pending-users">
      {message}
    </Styled.NoPendingUsers>
  </Styled.PendingUsers>
);

export default renderNoUserWaitingItem;
