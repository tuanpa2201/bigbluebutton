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
  .tl-container .tl-image {
        background-color: white !important;
    }
  .tlui-slider__thumb {
    background-color: var(--darkreader-text--color-text-1) !important;
  }
  .tlui-button[data-state="hinted"]::after {
    background-color: var(--darkreader-selection-background) !important;
  }
  div.tlui-toolbar__inner > div.tlui-toolbar__tools.fade-in {
<!--    background: var(&#45;&#45;darkreader-border&#45;&#45;color-selected) !important;-->
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

  [data-darkreader-scheme="dark"] #Navbar {
      background-color: var(--meet-bg, #2b2e32);
  }

  [data-darkreader-scheme="dark"] .sidebar-menu-container {
      background-color: var(--bg-01-dark, #303338);
  }

  [data-darkreader-scheme="dark"] .presentationContainer {
      background-color: var(--meet-bg, #2b2e32);
  }

  [data-darkreader-scheme="dark"] .presentationContainer .presentation {
      background-color: var(--meet-bg, #2b2e32);
  }
  
  [data-darkreader-scheme="dark"] #presentationToolbarWrapper {
    background-color: #303338;
    button {
        background-color: #303338;
    }
    span {
        background-color: #303338;
    }
    select {
        background-color: #303338; 
        & > option {
            background-color: #303338;
        }
    }
  } 
  
  [data-darkreader-scheme="dark"] #video-modal-input-label {
    color: var(--text-primary-dark, #fcfcfd) !important;
  }
  
  [data-darkreader-scheme="dark"] #video-modal-input {
    color: var(--text-secondary-dark, #C5C9CD) !important;
  }
  [data-darkreader-scheme="dark"] #video-modal-input::placeholder {
    color: var(--text-secondary-dark, #C5C9CD) !important;
  }
  [data-darkreader-scheme="dark"] #external-video-note {
    color: var(--text-secondary-dark, #C5C9CD) !important;
  }
  [data-darkreader-scheme="dark"] #footer-model-custom-mobile-dark {
    background: transparent !important;
    border-top: 1px solid #4E5358;
  }
  
  
  

  [data-darkreader-scheme="dark"] .presentationContainer i,
  [data-darkreader-scheme="dark"] .presentationContainer button[aria-describedby="resetZoomDescription"],
  [data-darkreader-scheme="dark"] .presentationContainer button[data-test="whiteboardOptionsButton"],
  [data-darkreader-scheme="dark"] .presentationContainer select,
  [data-darkreader-scheme="dark"] .presentationContainer option {
      color: var(--text-primary-dark, #fcfcfd) !important;
  }
  [data-darkreader-scheme="dark"] .dropzoneIcon {
    color: #CECFD2 !important;
  }
  
  [data-darkreader-scheme="dark"] #radio_checked {
    background-color: white !important;
  }
  
  [data-darkreader-scheme="dark"] #radio_unchecked {
    background-color: transparent !important;
  }
  
  [data-darkreader-scheme="dark"] #dm-dark-reader {
    border-color: #4E5358 !important;
    i::before {
        color: #CECFD2;
    }
  }

  [data-darkreader-scheme="dark"] #presentationToolbarWrapper {
<!--      background-color: var(&#45;&#45;bg-01-dark, #303338);-->
  }

  [data-darkreader-scheme="dark"] .pollingContainer {
      background: var(--bg-00-dark, #3b3f43) !important;
      /* shadow-600 */
  }

  [data-darkreader-scheme="dark"] .pollingContainer .pollingQuestionTitle {
      color: var(--text-primary-dark, #fcfcfd);
      /* Semibold/L */
      /* 133.333% */
  }

  [data-darkreader-scheme="dark"] .pollingContainer .pollingQuestionText {
      color: var(--text-primary-dark, #fcfcfd);
      /* Medium/S */
      /* 142.857% */
  }

  [data-darkreader-scheme="dark"] .pollingContainer .pollingAnswers .pollingButtonWrapper .pollingButton {
      color: var(--text-primary-dark, #fcfcfd);
      background: var(--bg-00-dark, #3b3f43) !important;
      border: 0.66px solid var(--border-01-dark, #9a9a9a) !important;
  }

  [data-darkreader-scheme="dark"] .pollingContainer .pollingResponseInputWrapper textarea {
      color: var(--text-primary-dark, #fcfcfd);
      background: var(--bg-00-dark, #3b3f43);
      border: 1px solid var(--border-00-dark, #4e5358) !important;
      /* Disable horizontal resize */
  }

  [data-darkreader-scheme="dark"] .pollingContainer .pollingSecretHint {
      color: var(--text-secondary-dark, #c5c9cd);
      /* Regular/S */
      /* 142.857% */
  }

  [data-darkreader-scheme="dark"] .notes {
      background: var(--bg-00-dark, #3b3f43) !important;
  }

  [data-darkreader-scheme="dark"] .notes .notes-header-container .notes-header {
      color: var(--text-primary-dark, #fcfcfd);
      /* Semibold/XL */
      /* 160% */
  }

  [data-darkreader-scheme="dark"] .notes .notes-header-container .buttonWrapper span {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .notes .notes-header-container i::before {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .notes .unpinNotes .unpinNotes_tooltip {
      color: var(--text-primary-dark, #fcfcfd);
      background: var(--bg-00-dark, #3b3f43) !important;
      /* Regular/S */
      /* 142.857% */
  }

  [data-darkreader-scheme="dark"] #pollPanel {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] #pollPanel .header-title,
  [data-darkreader-scheme="dark"] #pollPanel .header-icon,
  [data-darkreader-scheme="dark"] #pollPanel .custom-input-heading,
  [data-darkreader-scheme="dark"] #pollPanel .custom-input-instructions,
  [data-darkreader-scheme="dark"] #pollPanel .response-types .response-types-heading,
  [data-darkreader-scheme="dark"] #pollPanel .anonymous-heading,
  [data-darkreader-scheme="dark"] #pollPanel .poll-paragraph {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #pollPanel textarea {
      border: 0.66px solid var(--border-01-dark, #9a9a9a);
      color: var(--text-primary-dark, #fcfcfd);
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] #pollPanel textarea::placeholder {
      color: var(--text-secondary-dark, #c5c9cd) !important;
      opacity: 1;
      /* For Microsoft Edge */
  }

  [data-darkreader-scheme="dark"] #pollPanel textarea::-ms-input-placeholder {
      color: var(--text-secondary-dark, #c5c9cd) !important;
  }

  [data-darkreader-scheme="dark"] #pollPanel .poll-config-button {
      background: var(--bg-01-dark, #f7f8f9);
  }

  [data-darkreader-scheme="dark"] #pollPanel .poll-config-button span {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #pollPanel .poll-config-button:focus,
  [data-darkreader-scheme="dark"] #pollPanel .poll-config-button:active,
  [data-darkreader-scheme="dark"] #pollPanel .poll-config-button:hover,
  [data-darkreader-scheme="dark"] #pollPanel .poll-config-button.selected {
      background: var(--highlight-lightred-dark, #e4727f) !important;
  }

  [data-darkreader-scheme="dark"] #pollPanel .response-choices .section-heading {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #pollPanel .response-choices .delete_poll_option span {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] #pollPanel .poll-checkbox span {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #notes-options-dropdown .css-nmz4cj-MuiPaper-root-MuiPopover-paper-MuiMenu-paper .MuiMenu-list .MuiMenuItem-root {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .timer-sidebar-content {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .timer-sidebar-content .header-title,
  [data-darkreader-scheme="dark"] .timer-sidebar-content .header-icon {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .timer-sidebar-content .timer-type .timer-switch-button span {
      color: var(--text-primary-dark, #fcfcfd) !important;
  }

  [data-darkreader-scheme="dark"] .timer-sidebar-content .timer-type .timer-switch-button.active {
      background: var(--bg-04-hover-dark, #333335);
  }

  [data-darkreader-scheme="dark"] .timer-sidebar-content .timer-current {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .timer-sidebar-content .timer-seconds,
  [data-darkreader-scheme="dark"] .timer-sidebar-content .timer-minutes,
  [data-darkreader-scheme="dark"] .timer-sidebar-content .timer-hours {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .chat-container {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-header-container .chat-header {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-header-container .buttonWrapper span {
      color: #F2F2F2;
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-header-container i::before {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list {
      background-image: linear-gradient(#3b3f43 30%, rgba(59, 63, 67, 0)),
          linear-gradient(rgba(59, 63, 67, 0), #3b3f43 70%),
          radial-gradient(farthest-side at 50% 0px,
              rgba(13, 13, 13, 0.2),
              rgba(13, 13, 13, 0)),
          radial-gradient(farthest-side at 50% 100%,
              rgba(13, 13, 13, 0.2),
              rgba(13, 13, 13, 0));
      background-color: transparent;
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-header span,
  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-header-name span {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-header .poll-title {
      color: var(--highlight-lightred-dark, #e4727f);
      /* Semibold/S */
      /* 142.857% */
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-header .chat-poll-question {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-header .recharts-responsive-container tspan {
      color: var(--text-secondary-dark, #c5c9cd) !important;
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-header .recharts-responsive-container text {
      fill: var(--text-secondary-dark, #c5c9cd) !important;
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-avatar-presentation {
      background-color: var(--highlight-lightred-dark, #e4727f) !important;
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content-poll::before,
  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content-with-header::before {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M0.226314 2.32696C4.74121 6.44725 6 14 6 14L20 0H0.871664C0.164109 0 -0.29632 1.85001 0.226314 2.32696Z" fill="%23303338"/></svg>');
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content,
  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content-poll {
      background: var(--bg-01-dark, #303338);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content .chat-message-content-wrapper p,
  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content-poll .chat-message-content-wrapper p {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content .chat-time,
  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-content-poll .chat-time {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper.chat-message-is-current .chat-message-content {
      background-color: var(--bg-red-dark, #5f4047);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper.chat-message-is-current .chat-message-content span {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-toolbar {
      background-color: var(--bg-00-dark, #3b3f43);
      border: 1px solid var(--border-00-dark, #4e5358);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-toolbar button {
      color: var(--icon-primary-dark, #f2f2f2);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-toolbar button:hover {
      background: var(--bg-04-hover-dark, #333335);
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-presentation-download-container {
      background: var(--bg-01-dark, #303338);
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-presentation-download-container .chat-presentation-title {
      color: var(--highlight-lightred-dark, #e4727f) !important;
      /* Semibold/S */
      /* 142.857% */
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-presentation-download-container .chat-presentation-download-link {
      border-left: 2px solid var(--icon-link-dark, #56d6ff);
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-presentation-download-container .chat-presentation-download-link span {
      color: var(--text-primary-dark, #fcfcfd);
      /* Regular/XS */
      /* 133.333% */
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-presentation-download-container .chat-presentation-download-link .btn-link {
      color: var(--icon-link-dark, #56d6ff);
      /* Medium/S */
      /* 142.857% */
  }

  [data-darkreader-scheme="dark"] .chat-container .chat-presentation-download-container .chat-time {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .chat-container #chat-input {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .userListContainer {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .userListContainer .menuUserTitle {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .userListContainer .menuUserTitle h2 {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .userListContainer .menuUserTitle h2 span {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .userListContainer .menuUserTitle span {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .userListContainer .menuUserTitle span .icon-bbb-more:before {
      color: #F2F2F2 !important;
  }

  [data-darkreader-scheme="dark"] .userListContainer .menuUserTitle .manage_users span:first-child {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .userListContainer .menuUserTitle .manage_users span:first-child i::before {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .userListContainer .user-list-participants .user-list-item {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .userListContainer .user-list-participants .user-list-item span {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #app-settings-dropdown-menu ul {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #ActionsBar {
      background-color: var(--meet-bg, #2b2e32);
  }

  [data-darkreader-scheme="dark"] .reactions-dropdown-container .reactions-dropdown-menu {
      background-color: var(--bg-00-dark, #3b3f43);
      /* [L] Popover shadow */
  }

  [data-darkreader-scheme="dark"] .reactions-dropdown-container .reactions-dropdown-menu .reactions-dropdown-item {
      background-color: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] .reactions-dropdown-container .reactions-dropdown-menu .reactions-dropdown-item:hover {
      background-color: var(--bg-04-hover-dark, #333335);
  }

  [data-darkreader-scheme="dark"] button[data-test="whiteboardOptionsButton"],
  [data-darkreader-scheme="dark"] .tlui-toolbar__tools {
      background-color: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] #upload-modal {
      background: var(--bg-00-dark, #3b3f43);
  }

  [data-darkreader-scheme="dark"] #upload-modal .title {
      color: var(--text-primary-dark, #fcfcfd);
      /* Semibold/XL */
      /* 160% */
  }

  [data-darkreader-scheme="dark"] #upload-modal .dismiss {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #upload-modal .hint {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #upload-modal .dropzone .dropzoneIcon {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #upload-modal .dropzone .dropzoneMessage {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] #upload-modal .dropzone .dropzoneLink {
      color: var(--text-link-dark, #56d6ff);
  }

  [data-darkreader-scheme="dark"] #upload-modal .presentation_item .file_icon {
      color: var(--icon-secondary-dark, #cecfd2);
  }

  [data-darkreader-scheme="dark"] #upload-modal .presentation_item .table_item_name {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] #upload-modal .presentation_item .current_label {
      color: var(--color-05-dark, #2d88e4);
      background: var(--secondary-05-dark, #2c5060);
  }

  [data-darkreader-scheme="dark"] #upload-modal .presentation_item .actions_item .presentation_options_download span:first-child i::before {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] #upload-modal .presentation_item .actions_item .remove_presentation {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] #upload-modal .export_hint {
      color: var(--text-secondary-dark, #c5c9cd);
  }
  
  [data-darkreader-scheme="dark"] .toast-header #upload-icon {
    background-color: #56D6FF !important;
  }
  
  [data-darkreader-scheme="dark"] .presentation-upload-icon {
    svg,
     rect {
        fill: #56D6FF !important;
    }
  }
  
  [data-darkreader-scheme="dark"] #upload-status-label-override,
  [data-darkreader-scheme="dark"] #status-info-span-override {
      color: var(--text-secondary-dark, #c5c9cd) !important;
  }
  
  [data-darkreader-scheme="dark"] #dark-reader-override {
      color: var(--text-primary-dark, #FCFCFD) !important;
  }
  
  [data-darkreader-scheme="dark"] #user-list-tab {
      background-color: #3b3f43 !important;
  }
  
  [data-darkreader-scheme="dark"] .toast-file-line .toast-info-span {
      color: var(--text-secondary-dark, #c5c9cd) !important;
  }

  [data-darkreader-scheme="dark"] .toast-file-line .toast-file-name,
  [data-darkreader-scheme="dark"] .toast-file-line .toast-info-span {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .text-lobby-message {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .remember-choice-label {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .theme-switch-title {
      color: var(--text-secondary-dark, #c5c9cd);
  }

  [data-darkreader-scheme="dark"] .toggle-thumb {
      background: var(--neutral-00-dark, #fff);
  }

  [data-darkreader-scheme="dark"] .connecting-status-green {
      background-color: var(--color-02-dark, #83bf6e) !important;
  }

  [data-darkreader-scheme="dark"] .connecting-status-warning {
      background-color: var(--color-04-dark, #f77e44) !important;
  }

  [data-darkreader-scheme="dark"] .connecting-status-error {
      background-color: var(--color-01-dark, #ee0033) !important;
  }

  [data-darkreader-scheme="dark"] .MuiList-root.MuiList-padding.MuiMenu-list li div {
      color: var(--text-primary-dark, #fcfcfd);
  }

  [data-darkreader-scheme="dark"] .tlui-layout__mobile .tlui-button__tool {
      color: var(--text-primary-dark, #fcfcfd) !important;
  }

  [data-darkreader-scheme="dark"] .layout-btn {
      background-color: var(--bg-00-dark, #3b3f43) !important;
  }

  [data-darkreader-scheme="dark"] .radio-label span {
      color: var(--text-primary-dark, #fcfcfd) !important;
  }

  [data-darkreader-scheme="dark"] .rightIconNomal .talking {
      background-color: var(--color-02-dark, #83bf6e) !important;
  }

  [data-darkreader-scheme="dark"] .react-draggable .bottom-bar .iconUnmute {
      color: var(--color-02-dark, #83bf6e);
  }

  [data-darkreader-scheme="dark"] .tlui-popover__content>div>button>div {
      color: var(--text-primary-dark, #fcfcfd) !important;
  }

    [data-darkreader-scheme="dark"] .btn.btn-default {
        background: #282829 !important;
        box-shadow:
            0 -1px 0 0 #b5b5b5 inset,
            -1px 0 0 0 #e3e3e3 inset,
            1px 0 0 0 #e3e3e3 inset,
            0 1px 0 0 #e3e3e3 inset !important;
        color: var(--text-primary-dark, #fcfcfd) !important;
    }

    [data-darkreader-scheme="dark"] .btn.btn-default:hover {
        background: rgba(40, 40, 41, 0.85) !important;
        box-shadow:
            0 -1px 0 0 #b5b5b5 inset,
            -1px 0 0 0 #e3e3e3 inset,
            1px 0 0 0 #e3e3e3 inset,
            0 1px 0 0 #e3e3e3 inset !important;
    }

    [data-darkreader-scheme="dark"] .btn.btn-default[aria-disabled="true"],
    [data-darkreader-scheme="dark"] .btn.btn-default:disabled {
        color: var(--text-disable-dark, #848484) !important;
        background: var(--bg-05-disable-dark, #5d5f62) !important;
    }

    [data-darkreader-scheme="dark"] input:not([type]):focus,
    [data-darkreader-scheme="dark"] input[type="text"]:focus,
    [data-darkreader-scheme="dark"] textarea:focus,
    [data-darkreader-scheme="dark"] input:not([type]):active,
    [data-darkreader-scheme="dark"] input[type="text"]:active,
    [data-darkreader-scheme="dark"] textarea:active {
        background: var(--bg-01-dark, #303338);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.ReactModal__Content--after-open .modal-header {
        background: var(--bg-01-dark, #303338);
        border-bottom: 1px solid var(--border-00-dark, #4e5358);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.ReactModal__Content--after-open .modal-header button i {
        color: var(--icon-secondary-dark, #CECFD2);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.ReactModal__Content--after-open .simple-modal-content {
        background: var(--bg-00-dark, #3b3f43);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content .connecting .connecting-label {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.audio_modal .modal-header {
        border-bottom: none !important;
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.audio_modal .audio-modal-content button {
        background: var(--bg-00-dark, #3b3f43);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.audio_modal .audio-modal-content button i {
        background: var(--bg-01-dark, #3b3f43);
        color: var(--icon-primary-dark, #f2f2f2);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.audio-settings-modal .audio-settings-modal-content .audio-settings-note .subtitle {
        color: var(--text-secondary-dark, #c5c9cd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.audio-settings-modal .audio-settings-modal-content .audio-settings-form label {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.video-preview-modal .video-preview-container .webcam-tab-list .webcam-tab-item span {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.video-preview-modal .video-preview-container .webcam-tab-list .webcam-tab-item.is-selected {
        background: #333335 !important;
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.video-preview-modal .video-preview-container .brightness-input label,
    [data-darkreader-scheme="dark"] .ReactModal__Content.video-preview-modal .video-preview-container .device-selectors label {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.video-preview-modal .video-preview-container .virtual-background-label {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.video-preview-modal .video-preview-container .whole-image-checkbox .MuiFormControlLabel-label {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.video-preview-modal .video-preview-container i {
        color: var(--text-primary-dark, #fcfcfd) !important;
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.modal-about .modal-header {
        background: var(--bg-00-dark, #3b3f43) !important;
        border-bottom: none !important;
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.modal-about span,
    [data-darkreader-scheme="dark"] .ReactModal__Content.modal-about div {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs ul li {
        color: var(--text-primary-dark, #fcfcfd) !important;
    }

    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs ul li.is-selected {
        background: var(--bg-04-hover-dark, #3b3f43);
    }

    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .transcription-menu .title,
    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .data-saving-menu .title,
    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .notification-menu .title,
    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .application-menu .title {
        color: var(--text-primary-dark, #fcfcfd);
        /* Semibold/L */
        /* 133.333% */
    }

    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .transcription-menu .sub-title,
    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .data-saving-menu .sub-title,
    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .notification-menu .sub-title,
    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .application-menu .sub-title {
        color: var(--text-primary-dark, #fcfcfd);
        /* Regular/S */
        /* 142.857% */
    }

    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .form .row .col span {
        color: var(--text-primary-dark, #fcfcfd) !important;
        /* Regular/S */
        /* 142.857% */
    }

    [data-darkreader-scheme="dark"] .settings-modal .settings-modal-content .settings-tabs .setting-tab-panel .form .custom-input {
        color: var(--text-primary-dark, #fcfcfd);
    }

    /* SESSION DETAIL */
    [data-darkreader-scheme="dark"] .modal-session-details .modal-header {
        background: var(--bg-00-dark, #3b3f43) !important;
        border-bottom: none !important;
    }

    [data-darkreader-scheme="dark"] .modal-session-details .session-details-content b,
    [data-darkreader-scheme="dark"] .modal-session-details .session-details-content p,
    [data-darkreader-scheme="dark"] .modal-session-details .session-details-content div {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .modal-session-details .session-details-content .join-container {
        background: var(--bg-01-dark, #303338);
    }

    [data-darkreader-scheme="dark"] .modal-session-details .session-details-content .join-container .copy-join-url {
        color: var(--icon-secondary-dark, #cecfd2);
    }

    /* CONNECTION STATUS MODAL */
    [data-darkreader-scheme="dark"] .modal-connection-status {
        background: var(--bg-00-dark, #3b3f43) !important;
    }

    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content span,
    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content p,
    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content div {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content li.is-selected {
        background: var(--bg-04-hover-dark, #333335);
    }

    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content .network-data-container {
        background-image: none;
        background: var(--bg-00-dark, #3b3f43);
    }

    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content .network-data-container .helper {
        border-radius: 8px;
        background: var(--bg-01-dark, #303338);
    }

    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content .copy-container {
        background: var(--bg-00-dark, #3b3f43);
    }

    /* MODAL END MEETING */
    [data-darkreader-scheme="dark"] .modal-dialog-centered {
        background: var(--bg-00-dark, #3b3f43);
    }

    [data-darkreader-scheme="dark"] .modal-dialog-centered div {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .modal-dialog-centered .meeting-ended-button {
        color: var(--text-link-dark, #56d6ff);
    }

    /* SHORT_CUT HELP */
    [data-darkreader-scheme="dark"] .shortcut-help .simple-modal-content .shortcut-help-tabs li,
    [data-darkreader-scheme="dark"] .shortcut-help .simple-modal-content .shortcut-help-tabs span {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .shortcut-help .simple-modal-content .shortcut-help-tabs .is-selected {
        background: var(--bg-04-hover-dark, #333335);
    }

    [data-darkreader-scheme="dark"] .shortcut-help .simple-modal-content .shortcut-help-tabs .shortcut-help-general div:first-child {
        background-image: none;
        background: var(--bg-00-dark, #3b3f43);
    }

    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content .copy-container .copyStats {
        color: var(--text-link-dark, #56d6ff);
    }

    [data-darkreader-scheme="dark"] .modal-connection-status .simple-modal-content .list-connections {
        background: var(--bg-00-dark, #3b3f43);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.remove-user-modal .modal-header {
        border-bottom: 1px solid var(--border-00-dark, #4e5358);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.remove-user-modal .remove-user-content .remove-user-desc {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.remove-user-modal .remove-user-content .remove-user-checkbox {
        color: var(--text-secondary-dark, #c5c9cd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.remove-user-modal .remove-user-footer {
        border-top: 1px solid var(--border-00-dark, #4e5358);
    }

    [data-darkreader-scheme="dark"] .meetingEndedModal {
        background-color: var(--bg-00-dark, #3b3f43);
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .meetingEndedModal .meetingEndedModal-content .meetingEndedModal-title {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .meetingEndedModal .meetingEndedModal-content .meetingEndedModal-messageEnded {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.lock-viewer-modal .modal-header {
        border-bottom: 1px solid var(--border-00-dark, #4e5358);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.lock-viewer-modal .modal-content .lock-viewer-content .lock-viewer-desc {
        color: var(--text-secondary-dark, #c5c9cd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.lock-viewer-modal .modal-content .lock-viewer-content .lock-viewer-form .lock-viewer-tbl-header {
        color: var(--text-secondary-dark, #c5c9cd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.lock-viewer-modal .modal-content .lock-viewer-content .lock-viewer-form .lock-viewer-left-label {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.lock-viewer-modal .modal-content .lock-viewer-footer {
        border-top: 1px solid var(--border-00-dark, #4e5358);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.policy-modal .modal-header {
        border-bottom: 1px solid var(--border-00-dark, #4e5358);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.policy-modal .modal-content .policy-container .policy-desc {
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.policy-modal .modal-content .policy-container .policy-radio-group .policy-radio-label {
        border: 1px solid var(--border-00-dark, #4e5358);
        background-color: var(--bg-00-dark, #3b3f43);
        color: var(--text-primary-dark, #fcfcfd);
    }

    [data-darkreader-scheme="dark"] .ReactModal__Content.policy-modal .modal-content .policy-footer {
        border-top: 1px solid var(--border-00-dark, #4e5358);
    }
    [data-darkreader-scheme="dark"] .MuiMenu-root#app-leave-meeting-menu .MuiList-root .MuiMenuItem-root {
        color: var(--text-primary-dark, #fcfcfd) !important;
    }
    [data-darkreader-scheme="dark"] .custom-dropdown__list {
        background: var(--bg-00-dark, #3b3f43);
    }
    [data-darkreader-scheme="dark"] .custom-dropdown__option {
        color: var(--text-primary-dark, #fcfcfd);
    }
    [data-darkreader-scheme="dark"] #langSelector {
        background: var(--bg-00-dark, #3b3f43);
        border-color: var(--border-01-dark, #4e5358) !important;
        color: var(--text-primary-dark, #fcfcfd) !important;
    }
    [data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-header,[data-darkreader-scheme="dark"] .chat-container #chat-list .chat-message-wrapper .chat-message-header-name {
        color: #e4727F !important;
    }

    [data-darkreader-scheme="dark"] [data-test="audioModalOptions"] span {
        color: #fcfcfd !important;
    }
    [data-darkreader-scheme="dark"] .tippy-box[data-theme~='bbbtip'] {
        background: #FFF;
        color: #313131;
    }
    [data-darkreader-scheme="dark"] .tippy-box[data-theme~='bbbtip']>.tippy-svg-arrow{
        fill: #FFF;
    }
    [data-darkreader-scheme="dark"] div[id="cameraDock"] {
        background-color: #2B2E32 !important;
    }
    [data-darkreader-scheme="dark"] [data-level="critical"] > div {
        background-color: #EE0033;
    }
    [data-darkreader-scheme="dark"] [data-level="danger"] > div {
        background-color: #F26724;
    }
    [data-darkreader-scheme="dark"] [data-level="warning"] > div {
        background-color: #9207FF;
    }
    [data-darkreader-scheme="dark"] header #connectionBars > div {
        background-color: #FFF !important;
    }
        
    [data-darkreader-scheme="dark"] .last-theme-button {
        box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.25), 0 -1px 1px 0 rgba(0, 0, 0, 0.49) inset, 0 2px 1px 0 rgba(255, 255, 255, 0.06) inset !important;
    }
    [data-darkreader-scheme="dark"]  .btn.btn-primary {
        color: #fff !important;
    }
    [data-darkreader-scheme="dark"] .local-echo-button {
        color: #0F70D7 !important;
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
