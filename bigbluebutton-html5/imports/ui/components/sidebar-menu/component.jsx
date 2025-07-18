import React from 'react';
import styled from 'styled-components';

// Styled sidebar container
const Sidebar = styled.div`
  width: 60px;
  background: #f5f6fa;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  box-sizing: border-box;
`;

// Styled icon button
const IconButton = styled.button`
  background: none;
  border: none;
  margin: 12px 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover, &.active {
    background: #e6e9f0;
  }
`;

const icons = [
  { key: 'users', label: 'Users', icon: '👤' },
  { key: 'chat', label: 'Chat', icon: '💬' },
  { key: 'presentation', label: 'Slides', icon: '📄' },
  { key: 'poll', label: 'Poll', icon: '📊' },
  { key: 'timer', label: 'Timer', icon: '⏲️' },
  { key: 'breakout', label: 'Breakout', icon: '🧑‍🤝‍🧑' },
];

const SidebarMenuContainer = () => (
  <Sidebar>
    {icons.map((item) => (
      <IconButton key={item.key} title={item.label}>
        <span style={{ fontSize: 24 }}>{item.icon}</span>
      </IconButton>
    ))}
  </Sidebar>
);

export default SidebarMenuContainer;