import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { USER_AGGREGATE_COUNT_SUBSCRIPTION } from '/imports/ui/core/graphql/queries/users';
import UserTitleOptionsContainer from './user-options-dropdown/component';
import Styled from './styles';
import useDeduplicatedSubscription from '/imports/ui/core/hooks/useDeduplicatedSubscription';
import { USER_WITH_AUDIO_AGGREGATE_COUNT_SUBSCRIPTION } from './queries';
import useCurrentUser from '/imports/ui/core/hooks/useCurrentUser';
import useMeeting from '/imports/ui/core/hooks/useMeeting';
import { User } from '/imports/ui/Types/user';
import { Meeting } from '/imports/ui/Types/meeting';

import styled from 'styled-components';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';
import { layoutDispatch } from '/imports/ui/components/layout/context';
import { ACTIONS, PANELS } from '/imports/ui/components/layout/enums';

const BaseButton = styled.button`
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

  @media (max-width: 767px) {
    width: 20px;
    height: 20px;
    padding: 0px;
    margin-right: 4px;
  }
`;

interface UserTitleProps {
  count: number;
  countWithAudio: number;
  hideUserList?: boolean;
}

const messages = defineMessages({
  usersTitle: {
    id: 'app.userList.usersTitle',
    description: 'Title for the Header',
  },
  lockedUsersTitle: {
    id: 'app.userList.lockedUsersTitle',
    description: 'Title for the locked users',
  },
});

const UserTitle: React.FC<UserTitleProps> = ({
  count,
  countWithAudio,
  hideUserList,
}) => {
  const intl = useIntl();
  const userListLabel = hideUserList ? messages.lockedUsersTitle : messages.usersTitle;

  const layoutContextDispatch = layoutDispatch();
  const handleClick = () => {
    layoutContextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
      value: PANELS.NONE,
    });
    layoutContextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
      value: false,
    });
  };

  return (
    <Styled.Container className="menuUserTitle">
      <BaseButton
        type="button"
        onClick={handleClick}
        className="btnClose"
      >
        <SvgIcon iconName="chevronLeft" />
      </BaseButton>
      <Styled.SmallTitle>
        <span
          data-test-users-count={count}
          data-test-users-with-audio-count={countWithAudio}
        >
          {intl.formatMessage(userListLabel)}
        </span>
      </Styled.SmallTitle>
      <UserTitleOptionsContainer />
    </Styled.Container>
  );
};

const UserTitleContainer: React.FC = () => {
  const getCountData = () => {
    const { data: countData } = useDeduplicatedSubscription(USER_AGGREGATE_COUNT_SUBSCRIPTION);
    const count = countData?.user_aggregate?.aggregate?.count || 0;
    return count;
  };

  const {
    data: audioUsersCountData,
  } = useDeduplicatedSubscription(USER_WITH_AUDIO_AGGREGATE_COUNT_SUBSCRIPTION);

  const countWithAudio = audioUsersCountData?.user_aggregate?.aggregate?.count || 0;

  const { data: currentUser } = useCurrentUser((u: Partial<User>) => ({
    locked: u?.locked ?? false,
  }));

  const { data: currentMeeting } = useMeeting((m: Partial<Meeting>) => ({
    lockSettings: m.lockSettings,
  }));

  const hideUserList = currentUser?.locked && currentMeeting?.lockSettings?.hideUserList;

  return (
    <UserTitle
      count={getCountData() as number}
      countWithAudio={countWithAudio}
      hideUserList={hideUserList}
    />
  );
};

export default UserTitleContainer;
