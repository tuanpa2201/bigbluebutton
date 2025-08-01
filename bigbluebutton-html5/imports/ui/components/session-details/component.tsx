import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import useMeeting from '/imports/ui/core/hooks/useMeeting';
import useCurrentUser from '/imports/ui/core/hooks/useCurrentUser';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import { useQuery } from '@apollo/client';
import { GET_WELCOME_MESSAGE, WelcomeMsgsResponse } from './queries';
import Styled from './styles';
import './styles.css';
import deviceInfo from '/imports/utils/deviceInfo';

const intlMessages = defineMessages({
  title: {
    id: 'app.sessionDetails.title',
    description: 'Session details title',
  },
  dismissLabel: {
    id: 'app.sessionDetails.dismissLabel',
    description: 'Dismiss button label',
  },
  dismissDesc: {
    id: 'app.sessionDetails.dismissDesc',
    description: 'adds descriptive context to dissmissLabel',
  },
  joinByUrlLabel: {
    id: 'app.sessionDetails.joinByUrl',
    description: 'adds descriptive context to dissmissLabel',
  },
  joinByPhoneLabel: {
    id: 'app.sessionDetails.joinByPhone',
    description: 'adds descriptive context to dissmissLabel',
  },
  copyUrlTooltip: {
    id: 'app.sessionDetails.copyUrlTooltip',
    description: 'adds descriptive context to dissmissLabel',
  },
  copyPhoneTooltip: {
    id: 'app.sessionDetails.copyPhoneTooltip',
    description: 'adds descriptive context to dissmissLabel',
  },
  phonePinLabel: {
    id: 'app.sessionDetails.phonePin',
    description: 'adds descriptive context to dissmissLabel',
  },
  copied: {
    id: 'app.sessionDetails.copied',
    description: 'Copied join data',
  },
  audio_help_1: {
    id: 'app.audio_help_1',
    description: 'Audio help',
  },
  audio_help_2: {
    id: 'app.audio_help_2',
    description: 'Audio help',
  },
  serverRunning: {
    id: 'app.serverRunning',
    description: 'Server Running',
  },
});

interface SessionDetailsContainerProps {
  isOpen: boolean,
  onRequestClose: () => void,
  priority: string,
}

interface SessionDetailsProps extends SessionDetailsContainerProps {
  welcomeMessage: string;
  loginUrl: string,
  formattedDialNum: string,
  formattedTelVoice: string,
  anchorElement: HTMLElement | null,
}

const COPY_MESSAGE_TIMEOUT = 3000;

const SessionDetails: React.FC<SessionDetailsProps> = (props) => {
  const {
    welcomeMessage,
    isOpen,
    onRequestClose,
    priority,
    loginUrl,
    formattedDialNum,
    formattedTelVoice,
    anchorElement,
  } = props;
  const intl = useIntl();
  const [copyingJoinUrl, setCopyingJoinUrl] = useState(false);

  const copyData = async (content: string, type: string) => {
    if (type === 'join-url') setCopyingJoinUrl(true);

    await navigator.clipboard.writeText(content);

    setTimeout(() => {
      if (type === 'join-url') setCopyingJoinUrl(false);
    }, COPY_MESSAGE_TIMEOUT);
  };

  const { isMobile } = deviceInfo;

  return (
    <ModalSimple
      title={intl.formatMessage(intlMessages.title)}
      dismiss={{
        label: intl.formatMessage(intlMessages.dismissLabel),
        description: intl.formatMessage(intlMessages.dismissDesc),
      }}
      {...{
        isOpen,
        onRequestClose,
        priority,
        anchorElement,
      }}
      className="modal-session-details"
    >
      <Styled.Chevron />
      <Styled.Container
        isFullWidth={isMobile || !(loginUrl || (formattedDialNum && formattedTelVoice))}
      >
        <Styled.Content className="session-details-content">
          <Styled.WelcomeMessage dangerouslySetInnerHTML={{ __html: welcomeMessage }} />
          {loginUrl && (
            <div>
              <Styled.JoinTitle>
                {intl.formatMessage(intlMessages.joinByUrlLabel)}
              </Styled.JoinTitle>
              <Styled.JoinContainer className="join-container">
                {loginUrl}
                <Styled.CopyButton
                  key="copy-join-url"
                  className="copy-join-url"
                  onClick={() => copyData(loginUrl, 'join-url')}
                  hideLabel
                  color="light"
                  customIcon={(
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7775 5.33398H11.4663C12.5864 5.33398 13.1465 5.33398 13.5743 5.55197C13.9506 5.74372 14.2566 6.04968 14.4484 6.426C14.6663 6.85383 14.6663 7.41388 14.6663 8.53398V11.4673C14.6663 12.5874 14.6663 13.1475 14.4484 13.5753C14.2566 13.9516 13.9506 14.2576 13.5743 14.4493C13.1465 14.6673 12.5864 14.6673 11.4663 14.6673H8.53301C7.4129 14.6673 6.85285 14.6673 6.42503 14.4493C6.0487 14.2576 5.74274 13.9516 5.55099 13.5753C5.33301 13.1475 5.33301 12.5874 5.33301 11.4673V10.7784M4.53301 10.6673H7.46634C8.58645 10.6673 9.1465 10.6673 9.57432 10.4493C9.95065 10.2576 10.2566 9.95162 10.4484 9.5753C10.6663 9.14748 10.6663 8.58742 10.6663 7.46732V4.53398C10.6663 3.41388 10.6663 2.85383 10.4484 2.426C10.2566 2.04968 9.95065 1.74372 9.57432 1.55197C9.1465 1.33398 8.58645 1.33398 7.46634 1.33398H4.53301C3.4129 1.33398 2.85285 1.33398 2.42503 1.55197C2.0487 1.74372 1.74274 2.04968 1.55099 2.426C1.33301 2.85383 1.33301 3.41388 1.33301 4.53398V7.46732C1.33301 8.58742 1.33301 9.14748 1.55099 9.5753C1.74274 9.95162 2.0487 10.2576 2.42503 10.4493C2.85285 10.6673 3.4129 10.6673 4.53301 10.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  size="sm"
                  circle
                  ghost
                  label={copyingJoinUrl
                    ? intl.formatMessage(intlMessages.copied)
                    : intl.formatMessage(intlMessages.copyUrlTooltip)}
                />
              </Styled.JoinContainer>
            </div>
          )}

          <div>
            <span>{intl.formatMessage(intlMessages.audio_help_1)}</span>
            <span> {intl.formatMessage(intlMessages.audio_help_2)}</span>
          </div>

          <div style={{
            borderTop: '1px solid #EFEFEF',
          }}
          />

          <div>
            {intl.formatMessage(intlMessages.serverRunning)}
          </div>
        </Styled.Content>
      </Styled.Container>
    </ModalSimple>
  );
};

const SessionDetailsContainer: React.FC<SessionDetailsContainerProps> = ({
  isOpen,
  onRequestClose,
  priority,
}) => {
  const {
    data: welcomeData,
    loading: welcomeLoading,
    error: welcomeError,
  } = useQuery<WelcomeMsgsResponse>(GET_WELCOME_MESSAGE);

  const { loading, data: currentMeeting } = useMeeting((m) => {
    return {
      name: m.name,
      loginUrl: m.loginUrl,
      voiceSettings: m.voiceSettings,
    };
  });

  const { data: currentUserData } = useCurrentUser((user) => ({
    isModerator: user.isModerator,
  }));

  if (welcomeLoading) return null;
  if (welcomeError) return <div>{JSON.stringify(welcomeError)}</div>;
  if (!welcomeData || loading || !currentMeeting) return null;

  const invalidDialNumbers = ['0', '613-555-1212', '613-555-1234', '0000'];

  let formattedDialNum = '';
  let formattedTelVoice = '';

  if (currentMeeting && currentMeeting.voiceSettings) {
    const { dialNumber, telVoice } = currentMeeting.voiceSettings;
    if (invalidDialNumbers.indexOf(dialNumber) < 0) {
      formattedDialNum = dialNumber;
      formattedTelVoice = telVoice;
    }
  }

  const anchorElement = document.getElementById('presentationTitle') as HTMLElement;

  // login url should only be displayed for moderators
  let loginUrl = currentMeeting.loginUrl ?? '';
  const isModerator = currentUserData?.isModerator;

  if (!isModerator) {
    loginUrl = '';
  }

  return (
    <SessionDetails
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      priority={priority}
      loginUrl={loginUrl}
      welcomeMessage={welcomeData.user_welcomeMsgs[0]?.welcomeMsg ?? ''}
      formattedDialNum={formattedDialNum}
      formattedTelVoice={formattedTelVoice}
      anchorElement={anchorElement}
    />
  );
};

export default SessionDetailsContainer;
