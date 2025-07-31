import styled, { css, keyframes } from 'styled-components';
import Icon from '/imports/ui/components/common/icon/component';
import Dropzone from 'react-dropzone';
import Button from '/imports/ui/components/common/button/component';
import {
  fileLineWidth,
  iconPaddingMd,
  borderSizeLarge,
  lgPaddingX,
  statusIconSize,
  toastMdMargin,
  uploadListHeight,
  smPaddingX,
  smPaddingY,
  borderSize,
  borderRadius,
  lgPaddingY,
  mdPaddingY,
  modalInnerWidth,
  statusInfoHeight,
  itemActionsWidth,
  uploadIconSize,
  iconLineHeight,
  mdPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  headingsFontWeight,
  fontSizeLarge,
  fontSizeLarger,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  colorGrayLight,
  colorGrayDark,
  colorPrimary,
  colorWhite,
  colorDanger,
  colorGray,
  colorGrayLighter,
  colorLink,
  colorSuccess,
  colorGrayLightest,
  colorText,
  colorOffWhite,
} from '/imports/ui/stylesheets/styled-components/palette';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import { ScrollboxVertical } from '/imports/ui/stylesheets/styled-components/scrollable';

const barStripes = keyframes`
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
`;
const rotate = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`;

const UploadRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: ${iconPaddingMd};
  width: ${fileLineWidth};
`;

const ToastFileName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 1.25rem !important;
  margin-left: ${mdPaddingY};
  width: auto;
  text-align: left;
  font-weight: ${headingsFontWeight};

  [dir="rtl"] & {
    margin-right: ${mdPaddingY};
    margin-left: 0;
    text-align: right;
  }
`;

const StatusIcon = styled.span`
  & > i {
    height: ${statusIconSize};
    width: ${statusIconSize};
  }
`;

const StatusInfo = styled.div`
  padding: 0;
  bottom: ${toastMdMargin};
  position: relative;
  left: ${borderSizeLarge};
  
  [dir="rtl"] & {
    right: ${borderSizeLarge};
    left: 0;
  }
`;

const FileList = styled(ScrollboxVertical)`
  // height: 100%;
  // max-height: ${uploadListHeight};
  // padding: 1px;
  margin-bottom: 16px;
  // overflow-x: hidden;
`;

const Table = styled.table`
  position: relative;
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 24px;
  & > tbody {
    text-align: left;
    gap: 12px;
    display:grid;
    [dir="rtl"] & {
      text-align: right;
    }

    > tr {
      border-bottom: 1px solid ${colorGrayLight};

      &:last-child {
        border-bottom: 0;
      }

      &:hover,
      &:focus {
        background-color: transparentize(#8B9AA8, .85);
      }

      th,
      td {
        padding: calc(${smPaddingY} * 2) calc(${smPaddingX} / 2);
        white-space: nowrap;
      }

      th {
        font-weight: bold;
        color: ${colorGrayDark};
      }
    }
  }
`;

const VisuallyHidden = styled.th`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px; width: 1px;
  margin: -1px; padding: 0; border: 0;
`;

const ToastWrapper = styled.div`
  max-height: 50%;
  width: ${fileLineWidth};
`;

const UploadToastHeader = styled.div`
  position: relative;
  margin-bottom: ${toastMdMargin};
  padding-bottom: ${smPaddingX};
  display: flex;
  align-items: center; 
  gap: 12px;
`;

const UploadIcon = styled(Icon)`
  background-color: ${colorPrimary};
  color: ${colorWhite};
  height: ${uploadIconSize};
  width: ${uploadIconSize};
  border-radius: 50%;
  font-size: 135%;
  line-height: ${iconLineHeight};
  margin-right: ${smPaddingX};

  [dir="rtl"] & {
    margin-left: ${smPaddingX};
    margin-right: 0;
  }
`;

const UploadToastTitle = styled.span`
  // position: fixed;
  overflow: hidden;
  color: var(--Text-Primary, #313131);
  text-overflow: ellipsis;

  /* Medium/S */
  font-family: "FS PF BeauSans Pro", sans-serif;
  font-size: 14px!important;
  font-style: normal;
  font-weight: 500!important;
  line-height: 20px; /* 142.857% */
  margin-top: ${toastMdMargin};
`;

const InnerToast = styled(ScrollboxVertical)`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: ${uploadListHeight};
  overflow-y: auto;
  padding-right: 1.5rem;
  box-sizing: content-box;
  background: none;

  [dir="rtl"] & {
    padding-right: 0;
    padding-left: 1.5rem;
  }
`;

const TableItemIcon = styled.td`
  width: 1%;

  & > i {
  font-size: 1.35rem;
  }
`;

const TableItemCurrent = styled.th`
  width: 1%;

  padding-left: 0;
  padding-right: inherit;

  [dir="rtl"] & {
    padding-left: inherit;
    padding-right: 0;
  }
`;

const CurrentLabel = styled.span`
  display: inline;
  padding: .25em .5em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #0A84FF;
  background: #CFE9F5;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 8px;
  text-transform: uppercase;
`;

const TableItemName = styled.span`
  // height: 1rem;
  // width: auto;
  // position: relative;

  // &:before {
  //   content: "\\00a0";
  //   visibility: hidden;
  // }

  // & > span {
  //   min-width: 0;
  //   display: inline-block;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;

  //   position: absolute;
  //   left: 0;
  //   right: 0;

  //   [dir="rtl"] & {
  //     right: 1rem;
  //   }
  // }
  font-weight: 400;
  font-size: 14px;
  color: #313131;
  min-width: 110px;
  max-width:110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableItemStatus = styled.td`
  width: 1%;
  display: none;
  text-align: right;

  [dir="rtl"] & {
    text-align: left;
  }
`;

const ItemAction = styled.div`
  margin-left: ${smPaddingX};
  &, & i {
    margin-top: .25rem;
    display: inline-block;
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 1.35rem;
    color: ${colorGrayLight};
    padding: 0;
    ${({ animations }) => animations && `
      transition: all .25s;
    `}
    :hover, :focus {
      padding: unset !important;
    }
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
  padding: 0 4px;
`;

const UploaderDropzone = styled(Dropzone)`
  flex: auto;
  border: 1px dashed #C8C8C8;
  color: ${colorGray};
  border-radius: ${borderRadius};
  padding: 12px;
  text-align: center;
  font-size: ${fontSizeLarge};
  cursor: pointer;
  display: flex;
  background: #F7F8F9;
  align-items: center;
  & .dropzoneActive {
    background-color: ${colorGrayLighter};
  }
`;

const DropzoneIcon = styled(Icon)`
  height: 16px;
  width: 16px;
  margin-right:8px
`;

const DropzoneMessage = styled.p`
  margin: ${mdPaddingY} 0;
  font-size: 14px;
  display: flex;
  color: #6F767E;
`;

const DropzoneLink = styled.span`
  color: #1087FF;
  text-decoration: underline;
  font-size: 14px;
  display: block;
`;

const UploaderModal = styled.div`
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  padding: 0 16px 16px 16px;
  width: 100%;
  min-width: 360px;
  z-index: 100;
`;

const ModalInner = styled.div`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  width: ${modalInnerWidth};
  width: 100%;
  height: 100%;
  padding-bottom: .75rem;
  overflow-y: auto;
  align-items: space-between;
  @media ${smallOnly} {
    padding-left: ${statusInfoHeight};
    padding-right: ${statusInfoHeight};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 16px 0;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.25rem;
`;

const DismissButton = styled.div`

`;

const ConfirmButton = styled(Button)`
  background-color: #EE0033;
  color: white;
  border: none;
  border-radius: 8px;
  min-width: 296px;
  height: 32px;
  margin-top: auto;
  margin-bottom: 12px;
  margin-left: 16px;
  margin-right: 16px;
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

const ModalHint = styled.div`
  margin-bottom: 16px;
  color: #313131;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

const ToastItemIcon = styled(Icon)`
  position: relative;
  width: ${statusIconSize};
  height: ${statusIconSize};
  font-size: 117%;
  left: ${statusInfoHeight};

  [dir="rtl"] & {
    left: unset;
    right: ${statusInfoHeight};
  }

  ${({ done }) => done && `
    color: ${colorSuccess};
  `}

  ${({ error }) => error && `
    color: ${colorDanger};
  `}

  ${({ loading }) => loading && css`
    color: ${colorGrayLightest};
    border: 1px solid;
    border-radius: 50%;
    border-right-color: ${({ color }) => color || colorGray};
    animation: ${rotate} 1s linear infinite;
  `}
`;

const StatusInfoSpan = styled.span`
  font-size: 70%;

  ${({ styles }) => styles === 'error' && `
    display: inline-block;
    color: ${colorDanger};
  `}
`;

const PresentationItem = styled.div`
  ${({ isNew }) => isNew && `
    background-color: rgba(0, 128, 129, 0.05);
  `}

  ${({ uploading }) => uploading && `
    background-color: rgba(0, 128, 129, 0.25);
  `}

  ${({ uploadInProgress }) => uploadInProgress && `
    background-color: rgba(0, 128, 129, 0.25);
  `}

  ${({ error }) => error && `
    background-color: rgba(223, 39, 33, 0.25);
  `}
  display: flex;
  align-items: center;
  background: #FFFFFF; 
  border: 1px solid #EFEFEF;
  border-radius: 8px;
  height: 52px;
  width: 100%;
  padding: 12px;
`;

const TableItemActions = styled.div`
  text-align: left;
  align-items: center;
  display: flex;
  margin-left: auto;
  [dir="rtl"] & {
    text-align: right;
  }

  ${({ notDownloadable }) => notDownloadable && `
    min-width: 48px;
  `}
`;

const ExtraHint = styled.div`
  margin-top: 1rem;
  font-weight: bold;
`;

const ExternalUpload = styled.div`
  background-color: ${colorOffWhite};
  border-radius: ${borderRadius};
  margin-top: 2rem;
  padding: ${lgPaddingX};
  color: ${colorText};
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  & p {
    margin: 0;
  }
`;

const ExternalUploadTitle = styled.h4`
  font-size: 0.9rem;
  margin: 0;
`;

const ExternalUploadButton = styled(Button)`
  height: 2rem;
  align-self: center;
  margin-left: 2rem;
`;

const ExportHint = styled(ModalHint)`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #6F767E;
`;

const SetCurrentAction = styled.td`
  width: 0;

  &, & i {
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 1.35rem;

    [dir="ltr"] & {
      padding-left: 0 !important;
    }

    [dir="rtl"] & {
      padding-right: 0 !important;
    }

    ${({ animations }) => animations && `
      transition: all .25s;
    `}
  }
`;

const RadioCircle = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: ${({ checked }) => checked ? '4px solid #EE0033' : '1.5px solid #C8C8C8'};
  border-radius: 20px;
  position: relative;
  background: #fff;
  box-sizing: border-box;
  margin-right: 12px;
`;

const FileIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const Head = styled.tr`
  color: ${colorText};

  th {
    padding: calc(${smPaddingY} * 2) calc(${smPaddingX} / 2);
    white-space: nowrap;
    text-align: left;

    [dir="rtl"] & {
      text-align: right;
    }

    &:first-child {
      [dir="ltr"] & {
        padding-left: 0;
      }

      [dir="rtl"] & {
        padding-right: 0;
      }
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // font-size: ${fontSizeLarger};
  font-size: 20px;
  // font-weight: ${headingsFontWeight};
  font-weight: 600;
  color: #313131;
`;

export default {
  UploadRow,
  FileLine,
  ToastFileName,
  StatusIcon,
  StatusInfo,
  FileList,
  Table,
  VisuallyHidden,
  ToastWrapper,
  UploadToastHeader,
  UploadIcon,
  UploadToastTitle,
  InnerToast,
  TableItemIcon,
  TableItemCurrent,
  CurrentLabel,
  TableItemName,
  TableItemStatus,
  ItemAction,
  RemoveButton,
  UploaderDropzone,
  DropzoneIcon,
  DropzoneMessage,
  DropzoneLink,
  UploaderModal,
  ModalInner,
  ModalHeader,
  ActionWrapper,
  DismissButton,
  ConfirmButton,
  ModalHint,
  ToastItemIcon,
  StatusInfoSpan,
  PresentationItem,
  TableItemActions,
  ExtraHint,
  ExternalUpload,
  ExternalUploadTitle,
  ExternalUploadButton,
  ExportHint,
  SetCurrentAction,
  Head,
  Title,
  RadioCircle,
  FileIcon,
};
