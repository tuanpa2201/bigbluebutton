import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import BBBMenu from '/imports/ui/components/common/menu/component';
import { convertRemToPixels } from '/imports/utils/dom-utils';
import data from '@emoji-mart/data';
import { init } from 'emoji-mart';
import { SET_REACTION_EMOJI } from '/imports/ui/core/graphql/mutations/userMutations';
import { useMutation } from '@apollo/client';
import joypixels from 'emoji-toolkit';
import Styled from './styles';

const ReactionsButton = (props) => {
  const {
    intl,
    actionsBarRef,
    isMobile,
    currentUserReaction,
    autoCloseReactionsBar,
  } = props;

  const REACTIONS = window.meetingClientSettings.public.userReaction.reactions;
  console.log('Reactions:', REACTIONS);
  // initialize emoji-mart data, need for the new version
  init({ data });

  const [setReactionEmoji] = useMutation(SET_REACTION_EMOJI);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const intlMessages = defineMessages({
    reactionsLabel: {
      id: 'app.actionsBar.reactions.reactionsButtonLabel',
      description: 'reactions Label',
      defaultMessage: 'Share a reaction',
    },
  });

  const handleClose = () => {
    setShowEmojiPicker(false);
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  };

  const handleReactionSelect = (reaction) => {
    setReactionEmoji({ variables: { reactionEmoji: reaction } });
  };

  const customStyles = {
    top: '-1rem',
    borderRadius: '1.7rem',
  };

  const actionCustomStyles = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: isMobile ? '0' : '0.5rem',
    paddingBottom: isMobile ? '0' : '0.5rem',
  };

  const emojiProps = {
    size: convertRemToPixels(1.5),
    padding: '4px',
  };

  const convertEmoji = (native) => {
    const output = joypixels.toImage(native);

    return (
      <span dangerouslySetInnerHTML={{ __html: output }} />
    );
  };

  const actions = [];
  REACTIONS.forEach(({ id, native }) => {
    actions.push({
      // eslint-disable-next-line max-len
      label: <Styled.ButtonWrapper active={currentUserReaction === native}>{convertEmoji(native)}</Styled.ButtonWrapper>,
      key: id,
      onClick: () => handleReactionSelect(native),
      customStyles: actionCustomStyles,
      dataTest: 'reaction',
    });
  });

  const svgIcon = currentUserReaction === 'none' ? 'reactions' : null;
  const currentUserReactionEmoji = REACTIONS.find(({ native }) => native === currentUserReaction);

  let customIcon = null;

  if (!svgIcon) {
    // eslint-disable-next-line max-len
    customIcon = (
      convertEmoji(currentUserReactionEmoji?.native)
    );
  }

  return (
    <div className="reactions-dropdown-container">
      <Styled.ReactionsButton
        data-test="reactionsButton"
        svgIcon={svgIcon}
        customIcon={customIcon}
        label={intl.formatMessage(intlMessages.reactionsLabel)}
        description="Reactions"
        onKeyPress={() => {
        }}
        onClick={() => setShowEmojiPicker(true)}
        color={showEmojiPicker || customIcon ? 'primary' : 'default'}
        hideLabel
        circle
        size="lg"
      />
      {showEmojiPicker && (
      <div className="reactions-dropdown-menu">
        {actions.map((action) => (
          <button className="reactions-dropdown-item" type="button" key={action.key} onClick={action.onClick}>{action.label}</button>
        ))}
      </div>
      )}
    </div>
  );
};

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  sidebarContentPanel: PropTypes.string.isRequired,
  layoutContextDispatch: PropTypes.func.isRequired,
};

ReactionsButton.propTypes = propTypes;

export default ReactionsButton;
