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
import {defineMessages} from "react-intl";
import intlHolder from "/imports/ui/core/singletons/intlHolder";

// Styled sidebar container
const Sidebar = styled.div`
  width: 100%;;
  background: #F7F8F9;
  //border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  box-sizing: border-box;

  .menu-title {
    display: none;
  }

  @media (max-width: 1024px) {
    padding: 8px 16px 20px 8px;
    align-items: flex-start;
    .menu-title {
      font-size: 16px;
      margin-left: 8px;
      display: block;
    }
  }

  @media (max-width: 430px) {
    padding: 8px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    max-height: 56px;
  }
`;

const MenuToggle = styled.div`
  font-size: 16px;
  max-height: 52px;
  display: none;
  align-items: center;
  @media (max-width: 1024px) {
    display: flex;
  }

  .sidebar-closem-button {
    background: transparent;
  }
`;

// Styled icon button
// Base button style
const BaseButton = styled.button`
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
`;

// Regular icon button
const IconButton = styled(BaseButton)`
  background: #FFFFFF;
  &:hover, &.active {
    background: #E03;
  }
  &:hover svg, &.active svg {
    color: #FFFFFF;
  }
`;

// Close button (no hover/active background)
const CloseButton = styled(BaseButton)`
  background: transparent !important;
  &:hover, &.active {
    background: transparent !important;
  }
  &:hover svg, &.active svg {
    color: #FFFFFF;
  }
`;

const ThemeSwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: inherit;
  align-items: center;
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

  @media (max-width: 1024px) {
    width: unset;
    height: 40px;
    flex-direction: row;
    justify-content: center;
  }
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

const BottomSection = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #E0E0E0;
  margin-bottom: 12px;
  [data-darkreader-scheme="dark"] & {
    border-top: 2px solid #ffffff;
  }
`;

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


  const intl = intlHolder.getIntl();

  const messages = defineMessages({
    usersTitle: {
      id: 'app.userList.usersTitle',
      description: 'Title for the Header',
    },
    chatTitlePublic: {
      id: 'app.chat.titlePublic',
      description: 'title for public chat',
    },
    presentationLabel: {
      id: 'app.presentationUploder.title',
      description: 'presentation area element label',
    },
    sharedNotes: {
      id: 'app.notes.title',
      description: 'Title for the shared notes',
    },
    pollPaneTitle: {
      id: 'app.poll.pollPaneTitle',
      description: 'heading label for the poll menu',
    },
    stopwatch: {
      id: 'app.timer.button.stopwatch',
      description: 'Stopwatch switch button',
    },
    timer: {
      id: 'app.timer.button.timer',
      description: 'Timer switch button',
    },
  });

  const icons = [
    {key: 'userlist', label: intl.formatMessage(messages.usersTitle), file: 'users' },
    {key: 'chat', label: intl.formatMessage(messages.chatTitlePublic) , file: 'chat' },
    {key: 'upload', label: intl.formatMessage(messages.presentationLabel), file: 'document', isPresenter: true,},
    {key: 'shared_notes', label: intl.formatMessage(messages.sharedNotes), file: 'shareNote' },
    {key: 'poll', label: intl.formatMessage(messages.pollPaneTitle), file: 'poll', isPresenter: true,},
    {key: 'timer', label: `${intl.formatMessage(messages.timer)}/ ${intl.formatMessage(messages.stopwatch)}`, file: 'timer' , isModerator: true,},
  ];

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

  const handleClose = () => {
    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
      value: false,
    });
    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
      value: PANELS.NONE,
    });
    contextDispatch({
      type: ACTIONS.SET_ID_CHAT_OPEN,
      value: '',
    });
    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_IS_OPEN,
      value: false,
    });
    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_PANEL,
      value: PANELS.NONE,
    });
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
      <MenuToggle>
        <CloseButton
          key="cancel-remove"
          onClick={handleClose}
          className="sidebar-closem-button"
        >
          {/* <SvgIcon iconName="cancel-remove" /> */}
          <SvgIcon iconName="cross_20" />
        </CloseButton>
      </MenuToggle>
      {icons.map((item) => (
        <>
          {(!item.isModerator || (isModerator && item.isModerator)) && (!item.isPresenter || (isPresenter && item.isPresenter))
                && (
                  <MenuItem>
                    <IconButton
                      key={item.key}
                      title={item.label}
                      onClick={() => handleClick(item.key)}
                      className={[`sidebar_${PANELS[item.key.toUpperCase()]}`, currentPanel === PANELS[item.key.toUpperCase()] ? 'active' : ''].join(' ')}
                    >
                      <SvgIcon iconName={item.file} />
                      {PANELS[item.key.toUpperCase()] === PANELS.CHAT
                        && totalUnreadMessages > 0 && (
                        <span className="unreadNumber">{totalUnreadMessages}</span>
                      )}
                    </IconButton>
                    <span className="menu-title">{item.label}</span>
                  </MenuItem>
                )}
        </>
      ))}
      <BottomSection>
        <Line />
        <ThemeSwitchContainer>
          <MenuToggle>
            <BaseButton
              key="theme-switch-placeholder"
              style={{ background: 'transparent' }}
            >
              <SvgIcon iconName="moon" />
            </BaseButton>
            <span>Cài đặt chủ đề</span>
          </MenuToggle>
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
        </ThemeSwitchContainer>
      </BottomSection>
    </Sidebar>
  );
};

export default SidebarMenuContainer;
