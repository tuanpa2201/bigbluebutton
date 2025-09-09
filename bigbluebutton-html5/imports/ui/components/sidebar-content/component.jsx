import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Resizable from 're-resizable';
import styled from 'styled-components';
import { ACTIONS, PANELS } from '../layout/enums';
import ChatContainer from '/imports/ui/components/chat/chat-graphql/component';
import NotesContainer from '/imports/ui/components/notes/component';
import PollContainer from '/imports/ui/components/poll/container';
import BreakoutRoomContainer from '../breakout-room/breakout-room/component';
import TimerContainer from '/imports/ui/components/timer/panel/component';
import GuestUsersManagementPanel from '/imports/ui/components/waiting-users/waiting-users-graphql/component';
import Styled from './styles';
import ErrorBoundary from '/imports/ui/components/common/error-boundary/component';
import FallbackView from '/imports/ui/components/common/fallback-errors/fallback-view/component';
import GenericContentSidekickContainer from '/imports/ui/components/generic-content/generic-sidekick-content/container';
// import UploadContainer from '/imports/ui/components/upload/container';
import PresentationUploaderContainer from '/imports/ui/components/presentation/presentation-uploader/container';
import UserListContainer from '/imports/ui/components/user-list/container';
import InMemory from '/imports/ui/services/storage/in-memory';

const StyledResizable = styled(Resizable)`
  left: ${({ left }) => (left === null ? 'unset' : `${left}px`)};
  width: ${({ width }) => (width ? `${width}px` : '100%')};

  @media (max-width: 1024px) {
    width: 100% !important;
    left: 0 !important;
  }
  //
  //@media (min-width: 1025px) and (max-width: 1366px) {
  //    width: 320px !important;
  //    max-width: 320px !important;
  //    min-width: 320px !important;
  //}  
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

const SidebarContent = (props) => {
  const {
    top,
    left = null,
    right = null,
    zIndex,
    minWidth,
    width,
    maxWidth,
    minHeight,
    height,
    maxHeight,
    isResizable,
    resizableEdge,
    contextDispatch,
    sidebarContentPanel,
    amIPresenter,
    isSharedNotesPinned,
    currentSlideId,
    amIModerator,
  } = props;

  const [resizableWidth, setResizableWidth] = useState(width);
  const [resizableHeight, setResizableHeight] = useState(height);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const [resizeStartHeight, setResizeStartHeight] = useState(0);
  useEffect(() => {
    if (!isResizing) {
      setResizableWidth(width);
      setResizableHeight(height);
    }
  }, [width, height]);

  const setSidebarContentSize = (dWidth, dHeight) => {
    const newWidth = resizeStartWidth + dWidth;
    const newHeight = resizeStartHeight + dHeight;

    setResizableWidth(newWidth);
    setResizableHeight(newHeight);

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_SIZE,
      value: {
        width: newWidth,
        height: newHeight,
        browserWidth: window.innerWidth,
        browserHeight: window.innerHeight,
      },
    });
  };

  const smallSidebar = width < (maxWidth / 2);
  const pollDisplay = sidebarContentPanel === PANELS.POLL ? 'inherit' : 'none';
  InMemory.setItem('showUploadPresentationView', true);
  return (
    <StyledResizable
      minWidth={minWidth}
      // maxWidth={maxWidth}
      minHeight={minHeight}
      maxHeight={maxHeight}
      size={{
        width,
        height: '100%',
      }}
      enable={{
        top: isResizable && resizableEdge.top,
        left: isResizable && resizableEdge.left,
        bottom: isResizable && resizableEdge.bottom,
        right: isResizable && resizableEdge.right,
      }}
      handleWrapperClass="resizeSidebarContentWrapper"
      onResizeStart={() => {
        setIsResizing(true);
        setResizeStartWidth(resizableWidth);
        setResizeStartHeight(resizableHeight);
      }}
      onResize={(...[, , , delta]) => setSidebarContentSize(delta.width, delta.height)}
      onResizeStop={() => {
        setIsResizing(false);
        setResizeStartWidth(0);
        setResizeStartHeight(0);
      }}
      left={left}
      width={width}
      style={{
        position: 'absolute',
        top: 0,
        // left,
        right,
        zIndex,
        // width,
        height: '100%',
      }}
      handleStyles={{
        left: {
          width: '4px',
          height: '100vh',
          left: '-2px',
          cursor: 'ew-resize',
        },
        right: {
          width: '12px',
          height: '100vh',
          right: '-12px',
          cursor: 'ew-resize',
        },
      }}
    >
      {sidebarContentPanel === PANELS.CHAT
        && (
          <ErrorBoundary
            Fallback={FallbackView}
          >
            <ChatContainer width={width} />
          </ErrorBoundary>
        )}
      {!isSharedNotesPinned && sidebarContentPanel === PANELS.SHARED_NOTES && (
        <NotesContainer
          isToSharedNotesBeShow={sidebarContentPanel === PANELS.SHARED_NOTES}
        />
      )}
      {sidebarContentPanel === PANELS.USERLIST && <UserListContainer />}
      {/* {sidebarContentPanel === PANELS.UPLOAD && <UploadContainer />} */}
      {sidebarContentPanel === PANELS.UPLOAD && <PresentationUploaderContainer />}
      {sidebarContentPanel === PANELS.BREAKOUT && <BreakoutRoomContainer />}
      {sidebarContentPanel === PANELS.TIMER && <TimerContainer isModerator={amIModerator} />}
      {sidebarContentPanel === PANELS.WAITING_USERS && <GuestUsersManagementPanel />}
      {sidebarContentPanel === PANELS.POLL && (
        <Styled.Poll
          style={{ minWidth, top: '0', display: pollDisplay }}
          id="pollPanel"
        >
          <PollContainer
            smallSidebar={smallSidebar}
            amIPresenter={amIPresenter}
            currentSlideId={currentSlideId}
          />
        </Styled.Poll>
      )}
      {sidebarContentPanel.includes(PANELS.GENERIC_CONTENT_SIDEKICK) && (
        <GenericContentSidekickContainer
          genericSidekickContentId={sidebarContentPanel}
        />
      )}
    </StyledResizable>
  );
};

SidebarContent.propTypes = propTypes;
export default SidebarContent;
