import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Resizable from 're-resizable';
import styled from 'styled-components';
import { ACTIONS } from '../layout/enums';
// import UserListContainer from '../user-list/container';
import SidebarMenuContainer from '../sidebar-menu/component';
import { layoutSelectInput } from '../layout/context';

const StyledResizable = styled(Resizable)`
  width: 70px; /* Default width */
  @media (max-width: 1024px) {
    width: 100% !important;
  }
`;

const propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number,
  right: PropTypes.number,
  zIndex: PropTypes.number.isRequired,
  minWidth: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isResizable: PropTypes.bool.isRequired,
  resizableEdge: PropTypes.objectOf(PropTypes.bool).isRequired,
  contextDispatch: PropTypes.func.isRequired,
};

const SidebarNavigation = ({
  top,
  left = null,
  right = null,
  zIndex,
  minWidth,
  width,
  maxWidth,
  height,
  isResizable,
  resizableEdge,
  contextDispatch,
}) => {
  const [resizableWidth, setResizableWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const sidebarContentInput = layoutSelectInput((i) => i.sidebarContent);
  const currentPanel = sidebarContentInput.sidebarContentPanel;

  useEffect(() => {
    if (!isResizing) setResizableWidth(width);
  }, [width]);

  const setSidebarNavWidth = (dWidth) => {
    const newWidth = resizeStartWidth + dWidth;

    setResizableWidth(newWidth);

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_SIZE,
      value: {
        width: newWidth,
        browserWidth: window.innerWidth,
        browserHeight: window.innerHeight,
      },
    });
  };

  return (
    <StyledResizable
      minWidth={minWidth}
      // maxWidth={maxWidth}
      size={{
        // width,
        height: '100%',
      }}
      enable={{
        top: isResizable && resizableEdge.top,
        left: isResizable && resizableEdge.left,
        bottom: isResizable && resizableEdge.bottom,
        right: isResizable && resizableEdge.right,
      }}
      handleStyles={{
        right: {
          right: '-8px',
        },
      }}
      handleWrapperClass="resizeSidebarNavWrapper"
      onResizeStart={() => {
        setIsResizing(true);
        setResizeStartWidth(resizableWidth);
      }}
      onResize={(...[, , , delta]) => setSidebarNavWidth(delta.width)}
      onResizeStop={() => {
        setIsResizing(false);
        setResizeStartWidth(0);
      }}
      style={{
        position: 'absolute',
        display: 'flex',
        // top,
        left,
        right,
        zIndex,
        // width,
        height: '100%',
      }}
    >
      <SidebarMenuContainer contextDispatch={contextDispatch} currentPanel={currentPanel} />
      {/* <UserListContainer /> */}
    </StyledResizable>
  );
};

SidebarNavigation.propTypes = propTypes;
export default SidebarNavigation;
