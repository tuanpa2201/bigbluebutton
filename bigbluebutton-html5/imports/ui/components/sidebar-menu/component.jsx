import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PANELS, ACTIONS } from '/imports/ui/components/layout/enums';
import useDeduplicatedSubscription from '/imports/ui/core/hooks/useDeduplicatedSubscription';
import { PINNED_PAD_SUBSCRIPTION } from '/imports/ui/components/notes/queries';
import { useMutation } from '@apollo/client';
import { TIMER_ACTIVATE } from '/imports/ui/components/timer/mutations';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';
import useCurrentUser from '/imports/ui/core/hooks/useCurrentUser';
import { updateSettings } from '/imports/ui/components/settings/service';
import useUserChangedLocalSettings from '/imports/ui/services/settings/hooks/useUserChangedLocalSettings';
import { getSettingsSingletonInstance } from '/imports/ui/services/settings';
import AppService from '/imports/ui/components/app/service';
import useChat from '/imports/ui/core/hooks/useChat';

// Styled sidebar container
const Sidebar = styled.div`
  width: 72px;
  background: #F7F8F9;
  //border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  box-sizing: border-box;
`;

// Styled icon button
const IconButton = styled.button`
  background: #FFFFFF;
  border: none;
  margin: 12px 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 40px;
  height: 40px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover, &.active {
    background: #E03;
  }
  &:hover svg, &.active svg {
    color: #FFFFFF;
  }
`;

const ThemeSwitch = styled.div`
  width: 40px;
  padding: 4px;
  border-radius: 32px;
  background: #efefef;
  [data-darkreader-scheme="dark"] & {
    background: #333335;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

const ThemeButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 4px;
  border-radius: 32px;
  color: #2F384C;
  background: ${({ active }) => (active ? '#F7F8F9' : 'transparent')};
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.25), 0 -1px 1px 0 rgba(0, 0, 0, 0.04) inset, 0 2px 0 0 rgba(255, 255, 255, 0.25) inset;
  box-shadow: ${({ active }) => (active ? '0 4px 8px -4px rgba(0, 0, 0, 0.25), 0 -1px 1px 0 rgba(0, 0, 0, 0.04) inset, 0 2px 0 0 rgba(255, 255, 255, 0.25) inset' : 'unset')};;
  [data-darkreader-scheme="dark"] & {
    color: #F2F2F2;
    background: ${({ active }) => (active ? '#303338' : 'transparent')};
  }
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: #ffffff;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const icons = [
  { key: 'userlist', label: 'Users', file: 'users' },
  { key: 'chat', label: 'Chat', file: 'chat' },
  {
    key: 'upload', label: 'Upload', file: 'document', isPresenter: true,
  },
  { key: 'shared_notes', label: 'Slides', file: 'shareNote' },
  {
    key: 'poll', label: 'Poll', file: 'poll', isPresenter: true,
  },
  {
    key: 'timer', label: 'Timer', file: 'timer', isModerator: true,
  },
];

const SidebarMenuContainer = ({ contextDispatch, currentPanel }) => {
  const { data: pinnedPadData } = useDeduplicatedSubscription(
    PINNED_PAD_SUBSCRIPTION,
  );
  const setLocalSettings = useUserChangedLocalSettings();
  const Settings = getSettingsSingletonInstance();

  const { data: currentUser } = useCurrentUser((user) => ({
    away: user.away,
    isModerator: user.isModerator,
    presenter: user.presenter,
  }));
  const isModerator = currentUser?.isModerator;
  const isPresenter = currentUser?.presenter;
  const isDarkTheme = AppService.isDarkThemeEnabled();

  const NOTES_CONFIG = window.meetingClientSettings.public.notes;
  const [timerActivate] = useMutation(TIMER_ACTIVATE);
  const isPinned = !!pinnedPadData && pinnedPadData?.sharedNotes[0]?.sharedNotesExtId === NOTES_CONFIG.id;
  const BASE_NAME = window.meetingClientSettings.public.app.basename;
  const handleClick = (key) => {
    const panelKey = PANELS[key.toUpperCase()];
    if (currentPanel === panelKey) {
      contextDispatch({
        type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
        value: PANELS.NONE,
      });
      contextDispatch({
        type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
        value: false,
      });
    } else {
      if (panelKey === PANELS.SHARED_NOTES && isPinned) return;
      contextDispatch({
        type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
        value: panelKey,
      });
      contextDispatch({
        type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
        value: true,
      });
    }
  };

  const switchDarkTheme = (theme) => {
    updateSettings({
      application: {
        ...Settings.application,
        darkTheme: theme,
      },
    }, null, setLocalSettings);
  };

  const [theme, setTheme] = useState('light');

  const activateTimer = () => {
    const TIMER_CONFIG = window.meetingClientSettings.public.timer;
    const MILLI_IN_MINUTE = 60000;
    const stopwatch = true;
    const running = false;
    const time = TIMER_CONFIG.time * MILLI_IN_MINUTE;
    timerActivate({ variables: { stopwatch, running, time } });
  };

  useEffect(() => {
    activateTimer();
  }, []);

  const { data: chats } = useChat((chat) => ({
    totalUnread: chat.totalUnread,
  }));

  const totalUnreadMessages = chats && chats.reduce((acc, chat) => acc + chat?.totalUnread, 0);

  return (
    <Sidebar className="sidebar-menu-container">
      {icons.map((item) => (
        <>
          {(!item.isModerator || (isModerator && item.isModerator)) && (!item.isPresenter || (isPresenter && item.isPresenter))
                && (
                <IconButton
                  key={item.key}
                  title={item.label}
                  onClick={() => handleClick(item.key)}
                  className={[`sidebar_${PANELS[item.key.toUpperCase()]}`, currentPanel === PANELS[item.key.toUpperCase()] ? 'active' : ''].join(' ')}
                >
                  <SvgIcon iconName={item.file} />
                  {PANELS[item.key.toUpperCase()] === PANELS.CHAT && totalUnreadMessages > 0 && (
                  <span className="unreadNumber">{totalUnreadMessages}</span>
                  )}
                </IconButton>
                )}
        </>
      ))}
      <ThemeSwitch>
        <ThemeButton
          onClick={() => switchDarkTheme(false)}
          active={!isDarkTheme}
          title="Light theme"
        >
          <SvgIcon iconName="sun" />
        </ThemeButton>
        <ThemeButton
          onClick={() => switchDarkTheme(true)}
          active={isDarkTheme}
          title="Dark theme"
        >
          <SvgIcon iconName="moon" />
        </ThemeButton>
      </ThemeSwitch>
    </Sidebar>
  );
};

export default SidebarMenuContainer;
