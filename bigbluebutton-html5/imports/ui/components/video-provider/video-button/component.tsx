import React, { memo, useEffect, useState } from 'react';
import { FetchResult } from '@apollo/client';
import { IntlShape, defineMessages, injectIntl } from 'react-intl';
import deviceInfo from '/imports/utils/deviceInfo';
import { debounce } from '/imports/utils/debounce';
import Button from '/imports/ui/components/common/button/component';
import VideoPreviewContainer from '/imports/ui/components/video-preview/container';
import PreviewService from '/imports/ui/components/video-preview/service';
import { getSettingsSingletonInstance } from '/imports/ui/services/settings';
import { CameraSettingsDropdownInterface } from 'bigbluebutton-html-plugin-sdk';
import VideoService from '../service';
import Styled from './styles';

const intlMessages = defineMessages({
  videoSettings: {
    id: 'app.video.videoSettings',
    description: 'Open video settings',
  },
  visualEffects: {
    id: 'app.video.visualEffects',
    description: 'Visual effects label',
  },
  joinVideo: {
    id: 'app.video.joinVideo',
    description: 'Join video button label',
  },
  leaveVideo: {
    id: 'app.video.leaveVideo',
    description: 'Leave video button label',
  },
  advancedVideo: {
    id: 'app.video.advancedVideo',
    description: 'Open advanced video label',
  },
  videoLocked: {
    id: 'app.video.videoLocked',
    description: 'video disabled label',
  },
  videoConnecting: {
    id: 'app.video.connecting',
    description: 'video connecting label',
  },
  camCapReached: {
    id: 'app.video.meetingCamCapReached',
    description: 'meeting camera cap label',
  },
  disconnected: {
    id: 'app.video.clientDisconnected',
    description: 'Client disconnected label',
  },
});

const JOIN_VIDEO_DELAY_MILLISECONDS = 500;

interface JoinVideoButtonProps {
  // eslint-disable-next-line react/no-unused-prop-types
  cameraSettingsDropdownItems?: CameraSettingsDropdownInterface[];
  hasVideoStream: boolean;
  updateSettings: (
    obj: object,
    msgDescriptor: object | null,
    mutation: (settings: Record<string, unknown>) => void,
  ) => void;
  disableReason: string | undefined;
  status: string;
  setLocalSettings: (settings: Record<string, unknown>) => Promise<FetchResult<object>>;
  exitVideo: () => void;
  stopVideo: (cameraId?: string | undefined) => void;
  intl: IntlShape;
  videoConnecting: boolean;
}

const JoinVideoButton: React.FC<JoinVideoButtonProps> = ({
  intl,
  hasVideoStream,
  status,
  disableReason,
  updateSettings,
  setLocalSettings,
  exitVideo: exit,
  stopVideo,
  videoConnecting,
}) => {
  const { isMobile } = deviceInfo;
  const isMobileSharingCamera = hasVideoStream && isMobile;
  const isDesktopSharingCamera = hasVideoStream && !isMobile;
  const ENABLE_WEBCAM_SELECTOR_BUTTON = window.meetingClientSettings.public.app.enableWebcamSelectorButton;

  const shouldEnableWebcamSelectorButton = ENABLE_WEBCAM_SELECTOR_BUTTON
    && isDesktopSharingCamera;
  const exitVideo = () => isDesktopSharingCamera && (!VideoService.isMultipleCamerasEnabled()
    || shouldEnableWebcamSelectorButton);

  const [propsToPassModal, setPropsToPassModal] = useState<{ isVisualEffects?: boolean }>({});
  const [forceOpen, setForceOpen] = useState(false);
  const [isVideoPreviewModalOpen, setVideoPreviewModalIsOpen] = useState(false);
  const [wasSelfViewDisabled, setWasSelfViewDisabled] = useState(false);

  useEffect(() => {
    const Settings = getSettingsSingletonInstance();
    const isSelfViewDisabled = Settings.application.selfViewDisable;

    if (isVideoPreviewModalOpen && isSelfViewDisabled) {
      setWasSelfViewDisabled(true);
      const obj = {
        application:
          { ...Settings.application, selfViewDisable: false },
      };
      updateSettings(obj, null, setLocalSettings);
    }
  }, [isVideoPreviewModalOpen]);

  const handleOnClick = debounce(() => {
    switch (status) {
      case 'videoConnecting':
        stopVideo();
        break;
      case 'connected':
      default:
        if (exitVideo()) {
          PreviewService.clearStreams();
          exit();
        } else {
          setForceOpen(isMobileSharingCamera);
          setVideoPreviewModalIsOpen(true);
          // VideoService.joinVideo(webcamDeviceId, isCamLocked);
        }
    }
  }, JOIN_VIDEO_DELAY_MILLISECONDS);

  const getMessageFromStatus = () => {
    let statusMessage = status;
    if (status !== 'videoConnecting') {
      statusMessage = exitVideo() ? 'leaveVideo' : 'joinVideo';
    }
    return statusMessage;
  };

  const label = disableReason
    ? intl.formatMessage(intlMessages[disableReason as keyof typeof intlMessages])
    : intl.formatMessage(intlMessages[getMessageFromStatus() as keyof typeof intlMessages]);

  return (
    <>
      <Styled.OffsetBottom>
        <Button
          label={label}
          data-test={hasVideoStream ? 'leaveVideo' : 'joinVideo'}
          onClick={handleOnClick}
          hideLabel
          color={hasVideoStream ? 'primary' : 'default'}
          svgIcon={hasVideoStream ? 'video' : 'video_off'}
          size="lg"
          circle
          disabled={!!disableReason}
          loading={videoConnecting}
        />
        {/* {renderUserActions()} */}
      </Styled.OffsetBottom>
      {isVideoPreviewModalOpen ? (
        <VideoPreviewContainer
          {...{
            callbackToClose: () => {
              if (wasSelfViewDisabled) {
                setTimeout(() => {
                  const obj = {
                    application: {
                      // @ts-expect-error -> Untyped object.
                      ...Settings.application,
                      selfViewDisable: true,
                    },
                  };
                  updateSettings(obj, null, setLocalSettings);
                  setWasSelfViewDisabled(false);
                }, 100);
              }
              setPropsToPassModal({});
              setForceOpen(false);
            },
            forceOpen,
            priority: 'low',
            setIsOpen: setVideoPreviewModalIsOpen,
            isOpen: isVideoPreviewModalOpen,
          }}
          isVisualEffects={propsToPassModal.isVisualEffects}
        />
      ) : null}
    </>
  );
};

export default injectIntl(memo(JoinVideoButton));
