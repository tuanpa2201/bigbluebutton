import styled from 'styled-components';
import { FlexColumn } from '/imports/ui/stylesheets/styled-components/placeholders';

const CaptionsWrapper = styled.div`
  height: auto;
  bottom: 100px;
  left: 20%;
  z-index: 5;
  pointer-events: none;
  user-select:none;
`;

const Layout = styled(FlexColumn)``;

const DtfInvert = `
  body {
    background-color: #2B2E32 !important;
  }
  #layout,
  header[id="Navbar"] {
    background-color: #2B2E32 !important;
  }
  section[id="ActionsBar"] {
    background-color: #2B2E32 !important;
  }
  div[id="app"] {
    background-color: #2B2E32 !important;
  }
  select {
    border: 0.1rem solid #FFFFFF !important;
  }
  select[data-test="skipSlide"] {
    border: unset !important;
  }
  div[data-test="presentationContainer"] {
    background-color: #2B2E32 !important;
  }
  select {
    border-top: unset !important;
    border-right: unset !important;
    border-left: unset !important;
  }
  .tl-container {
    .tl-image {
      background-color: white !important;
    }
  }
  .tlui-slider__thumb {
    background-color: var(--darkreader-text--color-text-1) !important;
  }
  .tlui-button[data-state="hinted"]::after {
    background-color: var(--darkreader-selection-background) !important;
  }
  div.tlui-toolbar__inner > div.tlui-toolbar__tools.fade-in {
    background: var(--darkreader-border--color-selected) !important;
  }
  div[id="cameraDock"] {
    background-color: var(--darkreader-neutral-background) !important;
  }
  .bnjzQC > div span div:hover {
    background-color: var(--darkreader-selection-background) !important;
  }
  .tl-note__scrim,.tl-arrow-label[data-isediting="true"] > .tl-arrow-label__inner {
    background-color: unset !important;
  }
  textarea {
    caret-color: black !important;
  }
  #connectionBars > div {
    background-color: var(--darkreader-neutral-text) !important;
  }
  
  .custom-dropdown__selected {
    border: 0.66px solid #9A9A9A !important;
    color: #FCFCFD !important;
    background-color: #3B3F43 !important;
    
  }
  
  .modal-header {
    background-color: rgb(48, 51, 56) !important;
    & .modal-title {
      color: #FCFCFD !important;
    }
  }
 
  .audio_modal-content {
    & i {
      color: #F2F2F2!important;
      background:#303338 !important;
    }
  }

  .user-list-item,
  .user-list-participants-virtualized-list,
  .user-list-participants {
    background: #3B3F43!important;
  }
  
  .shortcut-help-general,
  .shortcut-help-whiteboard,
  .shortcut-help-gesture,
  .shortcut-help-presentation {
      & table {
          & th {
              color: var(--text-secondary-dark, #C5C9CD) !important;
          }

          & td {
              color: var(--text-primary-dark, #FCFCFD) !important;
          }
      }
  }
`;

const DtfBrandingInvert = `
  ${DtfInvert},
  div[data-test="brandingArea"]
`;

const DtfCss = `
  [id="colorPicker"],
  path,
  svg,
  g,
  line,
  textarea,
  rect,
  circle,
  .tlui-buttons__grid > button,
  .tlui-popover > button,
  .tl-html-container > div.tl-text-shape__wrapper.tl-text-shadow,
  .tl-text,
  .tl-text-input,
  .tl-text-content,
  .tl-text-label__inner,
  .tl-note__container,
  .tl-text.tl-text-content,
  .tl-arrow-label,
  .tl-arrow-label__inner
`;

const DtfImages = `
  svg
`;

export default {
  CaptionsWrapper,
  Layout,
  DtfInvert,
  DtfBrandingInvert,
  DtfCss,
  DtfImages,
};
