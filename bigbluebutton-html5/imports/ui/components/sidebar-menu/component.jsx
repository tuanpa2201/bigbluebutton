import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { PANELS, ACTIONS } from '/imports/ui/components/layout/enums';
import useDeduplicatedSubscription from '/imports/ui/core/hooks/useDeduplicatedSubscription';
import { PINNED_PAD_SUBSCRIPTION } from '/imports/ui/components/notes/queries';
import {useMutation} from "@apollo/client";
import {TIMER_ACTIVATE} from "/imports/ui/components/timer/mutations";
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

const ThemeButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#ffffff' : 'transparent')};
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
  { key: 'upload', label: 'Upload', file: 'upload' },
  { key: 'shared_notes', label: 'Slides', file: 'shareNote' },
  { key: 'poll', label: 'Poll', file: 'poll' },
  { key: 'timer', label: 'Timer', file: 'timer' },
];

const SidebarMenuContainer = ({ contextDispatch, currentPanel }) => {
  const { data: pinnedPadData } = useDeduplicatedSubscription(
    PINNED_PAD_SUBSCRIPTION,
  );
  const NOTES_CONFIG = window.meetingClientSettings.public.notes;
  const [timerActivate] = useMutation(TIMER_ACTIVATE);
  const isPinned = !!pinnedPadData && pinnedPadData?.sharedNotes[0]?.sharedNotesExtId === NOTES_CONFIG.id;
  const BASE_NAME = window.meetingClientSettings.public.app.basename;
  const handleClick = (key) => {
    const panelKey = PANELS[key.toUpperCase()];
    if (currentPanel === panelKey) {
      // Nếu đang mở đúng tab, thì ẩn đi
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
      // Nếu chưa mở, thì mở tab đó
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

  return (
    <Sidebar>
      {icons.map((item) => (
        <IconButton
          key={item.key}
          title={item.label}
          onClick={() => handleClick(item.key)}
          className={currentPanel === PANELS[item.key.toUpperCase()] ? 'active' : ''}
        >
          {/*<img*/}
          {/*  src={`${BASE_NAME}/resources/icon-bbb/${item.file}`}*/}
          {/*  alt={item.label}*/}
          {/*  style={{ width: 20, height: 20 }}*/}
          {/*/>*/}
          <SvgIcon iconName={item.file} />
        </IconButton>
      ))}
      <ThemeSwitch>
        <ThemeButton
          active={theme === 'light'}
          title="Light theme"
        >
          <img src={`${BASE_NAME}/resources/icon-bbb/light.png`} alt="Light" />
        </ThemeButton>
        <ThemeButton
          active={theme === 'dark'}
          title="Dark theme"
        >
          <img src={`${BASE_NAME}/resources/icon-bbb/moon.png`} alt="Dark" />
        </ThemeButton>
      </ThemeSwitch>
    </Sidebar>
  );
};

export default SidebarMenuContainer;
