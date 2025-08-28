import { createGlobalStyle } from 'styled-components';
import { smallOnly, phoneOnly, tabletDown } from '/imports/ui/stylesheets/styled-components/breakpoints';
import {
  smPaddingX,
  borderRadius,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  dropdownBg,
  colorText,
  colorWhite,
  colorGrayLighter,
  colorOverlay,
} from '/imports/ui/stylesheets/styled-components/palette';

const GlobalStyle = createGlobalStyle`
  // BBBMenu
  @media ${phoneOnly} {
    .MuiPopover-root {
      top: 0 !important;
    }
    .MuiPopover-root:has(.MuiPaper-root-mobile) {
      background-color: var(--color-overlay, rgba(6, 23, 42, 0.75));
      .MuiPaper-root-mobile {
        top: unset !important;
        left: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        max-width: none !important;
        padding: 16px !important;
        border-bottom-left-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        font-size: 16px !important;
      }
    }
  }
  @media ${tabletDown} {
    .MuiPopover-root:has(.MuiPaper-root-phone-and-tablet-same-type) {
      top: 0 !important;
      background-color: var(--color-overlay, rgba(6, 23, 42, 0.75));
      .MuiPaper-root-mobile {
        top: unset !important;
        left: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        max-width: none !important;
        padding: 16px !important;
        border-bottom-left-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
      }
    }
  }
  .MuiList-padding {
    padding: 0 !important;
  }
  .MuiPaper-root {
    background-color: ${dropdownBg};
    border-radius: ${borderRadius};
    border: 0;
    z-index: 999;
    max-width: 22rem;
  }

  // modal
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .modalOverlay {
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colorOverlay};
  }

  .fullscreenModalOverlay {
    z-index: 900;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  // toast
  .toastClass {
    position: relative;
    margin-bottom: ${smPaddingX};
    padding: 12px;
    border-radius: 8px;
    background: var(--BG-00, #FFF);
    box-shadow: 0 8px 16px -4px rgba(26, 26, 26, 0.22);
    display: flex;
    justify-content: space-between;
    //color: ${colorText};
    color: var(--Text-Primary, #313131);
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    max-width: 320px !important;
    min-width: 320px !important;
    width: 320px !important;
    cursor: pointer;
    background-color: ${colorWhite};

    &:focus {
      background-color: #EEE;
    }
    
    
    & .Toastify__progress-bar-theme--light,
    & .Toastify__progress-bar-theme--light.Toastify__progress-bar--default {
      background: #6CC17C!important;
    }

    & .Toastify__progress-bar-theme--light.Toastify__progress-bar--info {
      background: #3498db!important;
    }

    & .Toastify__progress-bar-theme--light.Toastify__progress-bar--error {
      background: #FF5565!important;
    }
    
    & .Toastify__progress-bar-theme--light.Toastify__progress-bar--success {
      background: #6CC17C!important;
    }
    
    & .Toastify__progress-bar-theme--light.Toastify__progress-bar--warning {
      background: #EBB94C!important;
    }

    [data-darkreader-scheme="dark"] & {
      color: #F2F2F2;
    }
  }
  
  .Toastify__toast--info {
    & .toastWrapper {
      color: #3498db!important;
    }
  }

  .Toastify__toast--success {
    & .toastWrapper {
      color: #6CC17C!important;
    }
  }

  .Toastify__toast--error {
    & .toastWrapper {
      color: #FF5565!important;
    }
  }

  .Toastify__toast--warning {
    & .toastWrapper {
      color: #EBB94C!important;
    }
  }
  
  .toastBodyClass {
    font-family: 'Source Sans Pro';
    margin: auto auto;
    flex: 1;
    background-color: inherit;
    max-width: 17.75rem !important;
    background-color: ${colorWhite} !important;
  }

  @keyframes track-progress {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }

  .toastProgressClass {
    position: absolute;
    bottom: 0;
    left: 0;
    right: auto;
    width: 0;
    height: 5px;
    z-index: 999;
    animation: track-progress linear 1;
    border-radius: ${borderRadius};

    [dir="rtl"] & {
      left: auto;
      right: 0;
    }
  }

  .actionToast {
    background-color: ${colorWhite};
    display: flex;
    padding: ${smPaddingX};
    border-radius: ${borderRadius};

    i.close {
      left: none !important;
    }
  }

  .raiseHandToast {
    background-color: ${colorWhite};
    padding: 1rem;

    i.close {
      left: none !important;
    }
  }
`;

export default GlobalStyle;
