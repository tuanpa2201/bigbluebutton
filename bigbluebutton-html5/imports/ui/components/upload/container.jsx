import React, {useCallback, useEffect, useState} from "react";
import styled from 'styled-components';
import { colorWhite, colorPrimary } from '/imports/ui/stylesheets/styled-components/palette';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import { smPaddingX } from '/imports/ui/stylesheets/styled-components/general';
import { layoutDispatch } from '/imports/ui/components/layout/context';
import { PANELS, ACTIONS } from '/imports/ui/components/layout/enums';

const UploadStyled = styled.div`
  background-color: ${colorWhite};
  padding: 0 16px 16px 16px;
  display: grid;
  justify-content: space-around;
  overflow: hidden;
  height: 100%;
  width: 360px;
  min-width: 360px;
  user-select: none;
  z-index: 100;
  align-content: space-between;

  ${({ isRTL }) => isRTL && `
    padding-left: 16px;
  `}
  ${({ isRTL }) => !isRTL && `
    padding-right: 16px;
  `}
  a {
    color: ${colorPrimary};
    text-decoration: none;
    &:focus {
      color: ${colorPrimary};
      text-decoration: underline;
    }
    &:hover {
      filter: brightness(90%);
      text-decoration: underline;
    }
    &:active {
      filter: brightness(85%);
      text-decoration: underline;
    }
    &:hover:focus {
      filter: brightness(90%);
      text-decoration: underline;
    }
    &:focus:active {
      filter: brightness(85%);
      text-decoration: underline;
    }
  }
  u {
    text-decoration-line: none;
  }
  ${({ isChrome }) => isChrome && `
    transform: translateZ(0);
  `}
  @media ${smallOnly} {
    transform: none !important;
  }
`;

const DropZone = styled.label`
  display: flex;
  padding: 12px;
  gap: 12px;
  align-items: center;
  justify-content: center;
  border: 1px dashed #C8C8C8;
  border-radius: 8px;
  background: #F7F8F9;
  height: 52px;
  width: 328px;
  margin: 16px 0;
  cursor: pointer;
  width: 100%;
  transition: border-color 0.2s;
  &:hover {
    border-color: #1087FF;
    background: #f0f2f5;
  }
`;

const BrowseLink = styled.span`
  color: #1087FF;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileCard = styled.div`
  display: flex;
  align-items: center;
  background: #FFFFFF;         // BG/00
  border: 1px solid #EFEFEF;   // Border/00
  border-radius: 8px;
  height: 52px;
  width: 100%;
  padding: 12px;
  gap: 12px;
`;

const FileIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const FileName = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #313131;
  min-width: 110px;
`;

const FileStatus = styled.span`
  background: #CFE9F5;
  color: #0A84FF;
  font-size: 12px;
  border-radius: 8px;
  padding: 2px 8px;
`;

const FileActions = styled.div`
  margin-left: auto;
  display: flex;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
  padding: 0 4px;
`;

const RadioCircle = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: ${({ selected }) => selected ? '4px solid #EE0033' : '1.5px solid #C8C8C8'};
  border-radius: 20px;
  position: relative;
  background: #fff;
  box-sizing: border-box;
`;

const ConfirmButton = styled.button`
  background-color: #EE0033;
  color: white;
  border: none;
  border-radius: 8px;
  min-width: 296px;
  height: 32px;
  margin: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d4002e;
  }

  &:active {
    background-color: #b30026;
  }

  &:disabled {
    background-color: #f5a5b5;
    cursor: not-allowed;
  }
`;

// const files = [
//   { name: 'Default.pdf', current: true },
//   { name: 'File test 2.pdf', current: false },
// ];

const UploadContainer = ({ isChrome = false, isRTL = false }) => {
  const layoutContextDispatch = layoutDispatch();
  const [selectedFile, setSelectedFile] = useState('Default.pdf');
  const [files, setFiles] = useState([]);

  const closePanel = useCallback(() => {
    layoutContextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
      value: false,
    });
    layoutContextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
      value: PANELS.NONE,
    });
  }, [layoutContextDispatch]);

  const handleBrowseClick = (e) => {
    e.preventDefault();
    document.getElementById('upload-input').click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const mappedFiles = selectedFiles.map(file => ({
        name: file.name,
        file: file,
        current: false,
    }));
    setFiles(mappedFiles);
    setSelectedFile(mappedFiles[0]?.name);
   };

  const BASE_NAME = window.meetingClientSettings.public.app.basename;
  //   const WebcamSettingsImg = `${BASE_NAME}/resources/images/webcam_settings.svg`;

  // useEffect(() => {
  //   if (!active) {
  //     closePanel();
  //   }
  // }, [active, closePanel]);

  return (
    <UploadStyled isChrome={isChrome} isRTL={isRTL}>
        <div style={{ display: 'grid' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', width: '328px', padding: '16px 0' }}>
                <span style={{ fontWeight: '600', fontSize: '20px', lineHeight: '32px' }}>Upload/ Manage Presentations</span>
                <div onClick={closePanel}>
                    <img
                        src={`${BASE_NAME}/resources/icon-bbb/close.png`}
                        alt="Close"
                    />
                </div>
            </div>
            <div style={{ gap: '16px' }}>
                <div style={{ fontSize: '14px', color: '#6F767E', fontWeight: '400', lineHeight: '20px' }}>
                    <p>As a presenter you have the ability to upload any Office document or PDF file. We recommend PDF file for best results.</p>
                </div>
                <DropZone htmlFor="upload-input">
                    <img
                        src={`${BASE_NAME}/resources/icon-bbb/cloud-upload.png`}
                        alt="Cloud Upload"
                        style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    <span style={{ display: 'flex' }}>
                        <div style={{ fontSize: '14px', color: '#313131', fontWeight: '400', lineHeight: '20px' }}>
                            Drag files here to upload or
                        </div>
                        <BrowseLink onClick={handleBrowseClick}>browse for files</BrowseLink>
                    </span>
                    <HiddenInput id="upload-input" type="file" multiple onChange={handleFileChange} />
                </DropZone>
            </div>
            <div style={{ gap: '16px' }}>
                <div style={{ gap: '12px', display: 'grid' }}>
                    {files.map(file => (
                        <FileCard key={file.name} onClick={() => setSelectedFile(file.name)}>
                            <RadioCircle selected={selectedFile === file.name} />
                            <FileIcon>
                                <img
                                    src={`${BASE_NAME}/resources/icon-bbb/file-text-2.png`}
                                    alt="File Text"
                                />
                            </FileIcon>
                            <FileName>{file.name}</FileName>
                            {file.current && <FileStatus>Current</FileStatus>}
                            <FileActions>
                                <ActionButton title="options">
                                    <img
                                        src={`${BASE_NAME}/resources/icon-bbb/more-options.png`}
                                        alt="More Options"
                                    />
                                </ActionButton>
                                <ActionButton title="Delete">
                                    <img
                                        src={`${BASE_NAME}/resources/icon-bbb/trash.png`}
                                        alt="Trash"
                                    />
                                </ActionButton>
                            </FileActions>
                        </FileCard>
                    ))}
                </div>
                <div style={{ fontSize: '12px', color: '#6F767E', fontWeight: '400', lineHeight: '16px' }}>
                    <p>Note: In the "Export options" menu you have the option to enable download of the original presentation and to provide users with a downloadable link with annotations in public chat.</p>
                </div>
            </div>
        </div>
        
        <ConfirmButton>Confirm</ConfirmButton>
    </UploadStyled>
  );
};

export default UploadContainer;