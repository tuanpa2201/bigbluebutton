import styled, { css, keyframes } from 'styled-components';

import {
  lgPaddingY,
  smPaddingY,
  borderSize,
  smPaddingX,
  userIndicatorsOffset,
  mdPaddingY,
  indicatorPadding,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  listItemBgHover,
  itemFocusBorder,
  colorGray,
  colorGrayDark,
  colorPrimary,
  colorWhite,
  userListBg,
  colorSuccess,
  colorDanger,
  colorOffWhite, colorBlack,
} from '/imports/ui/stylesheets/styled-components/palette';

import Icon from '/imports/ui/components/common/icon/icon-ts/component';

interface AvatarProps {
    moderator?: boolean;
    presenter?: boolean;
    talking?: boolean;
    muted?: boolean;
    listenOnly?: boolean;
    voice?: boolean;
    noVoice?: boolean;
    color?: string;
    whiteboardAccess?: boolean;
    animations?: boolean;
    emoji?: boolean;
    avatar?: string;
    isChrome?: boolean;
    isFirefox?: boolean;
    isEdge?: boolean;
    isSkeleton?: boolean;
}

interface RightIconPresenterProps {
  moderator?: boolean;
  presenter?: boolean;
  whiteboardAccess?: boolean;
  animations?: boolean;
  isChrome?: boolean;
  isFirefox?: boolean;
  isEdge?: boolean;
  isSelected?: boolean;
}

interface RightIconVoiceProps {
  talking?: boolean;
  muted?: boolean;
  listenOnly?: boolean;
  voice?: boolean;
  noVoice?: boolean;
  color?: string;
  animations?: boolean;
  isChrome?: boolean;
  isFirefox?: boolean;
  isEdge?: boolean;
  isSelected?: boolean;
}

interface RightBlockIconsProps {
  moderator?: boolean;
  presenter?: boolean;
  talking?: boolean;
  muted?: boolean;
  listenOnly?: boolean;
  voice?: boolean;
  noVoice?: boolean;
  color?: string;
  whiteboardAccess?: boolean;
  isSelected?: boolean;
  animations?: boolean;
}

interface UserItemContentsProps {
  selected?: boolean;
  isActionsOpen?: boolean;
}

interface RightIconHandProps {
  hand?: boolean;
}

interface RightIconMorePops {
  isSelected?: boolean;
}

// ===== avatar =====

const Avatar = styled.div<AvatarProps>`
  position: relative;
  height: 36px;
  width: 36px;
  min-width: 36px;
  border-radius: 50%;
  text-align: center;
  font-size: .85rem;
  border: 2px solid transparent;
  user-select: none;
  ${
  ({ color }) => css`
    background-color: ${color};
  `}
  }

  ${({ animations }) => animations && `
    transition: .3s ease-in-out;
  `}

  // &:after,
  // &:before {
  //   content: "";
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   padding-top: .5rem;
  //   padding-right: 0;
  //   padding-left: 0;
  //   padding-bottom: 0;
  //   color: inherit;
  //   top: auto;
  //   left: auto;
  //   bottom: ${userIndicatorsOffset};
  //   right: ${userIndicatorsOffset};
  //   border: 1.5px solid ${userListBg};
  //   border-radius: 50%;
  //   background-color: ${colorSuccess};
  //   color: ${colorWhite};
  //   opacity: 0;
  //   font-family: 'bbb-icons';
  //   font-size: .65rem;
  //   line-height: 0;
  //   text-align: center;
  //   vertical-align: middle;
  //   letter-spacing: -.65rem;
  //   z-index: 1;
  //
  //   [dir="rtl"] & {
  //     left: ${userIndicatorsOffset};
  //     right: auto;
  //     padding-right: .65rem;
  //     padding-left: 0;
  //   }
  //
  //   ${({ animations }) => animations && `
  //     transition: .3s ease-in-out;
  //   `}
  // }

  ${({ moderator }) => moderator && `
    border-radius: 5px;
    color: ${colorWhite} !important;
  `}

  ${({ presenter }) => presenter && `
  //   &:before {
  //     content: "\\00a0\\e90b\\00a0";
  //     padding: ${mdPaddingY} !important;
  //     opacity: 1;
  //     top: ${userIndicatorsOffset};
  //     left: ${userIndicatorsOffset};
  //     bottom: auto;
  //     right: auto;
  //     border-radius: 5px;
  //     background-color: ${colorPrimary};
  //
  //     [dir="rtl"] & {
  //       left: auto;
  //       right: ${userIndicatorsOffset};
  //       letter-spacing: -.33rem;
  //     }
  //   }
  `}

  ${({
    presenter, isChrome, isFirefox, isEdge,
  }) => presenter && (isChrome || isFirefox || isEdge) && `
    // &:before {
    //   padding: ${indicatorPadding} !important;
    // }
  `}

  ${({ whiteboardAccess, presenter }) => whiteboardAccess && !presenter && `
    // &:before {
    //   content: "\\00a0\\e925\\00a0";
    //   padding: ${mdPaddingY} !important;
    //   border-radius: 50% !important;
    //   opacity: 1;
    //   top: ${userIndicatorsOffset};
    //   left: ${userIndicatorsOffset};
    //   bottom: auto;
    //   right: auto;
    //   border-radius: 5px;
    //   background-color: ${colorPrimary};
    //
    //   [dir="rtl"] & {
    //     left: auto;
    //     right: ${userIndicatorsOffset};
    //     letter-spacing: -.33rem;
    //     transform: scale(-1, 1);
    //   }
    // }
  `}

  ${({
    whiteboardAccess, isChrome, isFirefox, isEdge,
  }) => whiteboardAccess && (isChrome || isFirefox || isEdge) && `
    // &:before {
    //   padding: ${indicatorPadding};
    // }
  `}

  ${({ voice }) => voice && `
    // &:after {
    //   content: "\\00a0\\e931\\00a0";
    //   background-color: ${colorSuccess};
    //   top: 1.375rem;
    //   left: 1.375rem;
    //   right: auto;
    //
    //   [dir="rtl"] & {
    //     left: auto;
    //     right: 1.375rem;
    //   }
    //   opacity: 1;
    //   width: 1.2rem;
    //   height: 1.2rem;
    // }
  `}

  ${({ muted }) => muted && `
    // &:after {
    //   content: "\\00a0\\e932\\00a0";
    //   background-color: ${colorDanger};
    //   opacity: 1;
    //   width: 1.2rem;
    //   height: 1.2rem;
    // }
  `}

  ${({ listenOnly }) => listenOnly && `
    // &:after {
    //   content: "\\00a0\\e90c\\00a0";
    //   opacity: 1;
    //   width: 1.2rem;
    //   height: 1.2rem;
    //   background-color: ${colorSuccess};
    // }
  `}

  ${({ noVoice }) => noVoice && `
    // &:after {
    //   content: "";
    //   background-color: ${colorOffWhite};
    //   top: 1.375rem;
    //   left: 1.375rem;
    //   right: auto;
    //
    //   [dir="rtl"] & {
    //     left: auto;
    //     right: 1.375rem;
    //   }
    //
    //   opacity: 1;
    //   width: 1.2rem;
    //   height: 1.2rem;
    // }
  `}

  // ================ talking animation ================
  ${({ talking, animations }) => talking && animations && css`
    //animation: ${pulse()} 1s infinite ease-in;
  `}

  ${({ talking, animations }) => talking && !animations && `
    box-shadow: 0 0 0 4px currentColor;
  `}
  // ================ talking animation ================
  // ================ image ================
  ${({ avatar, emoji }) => avatar?.length !== 0 && !emoji && css`
    background-image: url(${avatar});
    background-repeat: no-repeat;
    background-size: contain;
    border: 2px solid ${colorWhite};
  `}
  // ================ image ================

  // ================ content ================
  color: ${colorWhite} !important;
  font-size: 110%;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items:center;  
  // ================ content ================

  & .react-loading-skeleton {    
    height: 36px;
    width: 36px;
  }
`;

const Skeleton = styled.div`
 
`;

const UserAdditionalInformationIcon = styled(Icon)`
  margin-right: ${smPaddingX};
`;

const pulse = () => keyframes`
    0% {
      box-shadow: 0 0 0 0 #ffffff80;
    }
    100% {
      box-shadow: 0 0 0 10px #ffffff00;
    }
  }
`;

// ======================== User Name ========================

const UserNameContainer = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 0;
  flex-grow: 1;
  margin: 0 0 0 ${smPaddingX};
  justify-content: center;
  font-size: 90%;
  // max-width: 70%;

  [dir="rtl"]  & {
    margin: 0 ${smPaddingX} 0 0;
  }
`;

const UserName = styled.span`
  margin: 0;
  font-size: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  color: ${colorGrayDark};
  display: flex;
  flex-direction: row;

  > span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.animationsEnabled {
    transition: all .3s;
  }`;

const UserNameSub = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  font-size: 0.75rem;
  font-weight: 200;
  color: ${colorGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  i {
    line-height: 0;
    font-size: 75%;
  }
`;

// ======================== Icon Right Container ========================

const IconRightContainer = styled.div`
  margin: .25rem;  
`;

const UserListIconContainer = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 5px;
  text-align: center;
  border: 2px solid transparent;
  user-select: none;
  font-size: 110%;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items:center;
  top: 6px;
`;

const RightBlockIconsContainer = styled.div<RightBlockIconsProps>`
  display: flex;
  gap: 5px;
  color: ${colorWhite};
  ${({isSelected}) => isSelected && `
    @media (min-width: 1025px) {
      display: none;
    }
  `}
  ${({voice}) => voice && `
    & .talking {
      display: flex;
      background: var(--Color-02, #75C044);
      color: ${colorWhite};
    }
    & .micSlash {
      display: none;
    }
  `}

  ${({listenOnly, muted, noVoice}) => (listenOnly || muted || noVoice) && `
    & .talking {
      display: none;
    }
    & .micSlash {
      display: flex;
      color: ${colorBlack};
    }
  `}

  ${({ presenter }) => presenter && `
    & .presentationLine {
      display: flex;
      background: var(--Color-05, #0A84FF);
      color: ${colorWhite};
    }
  `}
  ${({ presenter }) => !presenter && `
    & .presentationLine {
      display: none;
    }
  `}

  ${({ whiteboardAccess }) => whiteboardAccess && `
    & .whiteboardAccess {
      display: flex;
      color: ${colorBlack};
    }
  `}
  ${({ whiteboardAccess }) => !whiteboardAccess && `
    & .whiteboardAccess {
      display: none;
    }
  `}
    
  // ================ talking animation ================
  ${({talking, animations}) => talking && animations && css`
    & .talking {
      animation: ${pulse()} 1s infinite ease-in;
    }
  `}

  ${({talking, animations}) => talking && !animations && `
    & .talking {
        box-shadow: 0 0 0 4px currentColor;
    }
  `}
`;

const RightIconVoiceContainer = styled.div<RightIconVoiceProps>`
  position: relative;
  height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 50%;
  text-align: center;
  border: 2px solid transparent;
  user-select: none;
  color: ${colorWhite} !important;
  font-size: 110%;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  
  ${({animations}) => animations && `
    transition: .3s ease-in-out;
  `}
  &:after,
  &:before {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    padding: .5rem 0 0;
    border: 1.5px solid transparent;
    border-radius: 5px;
    background-color: transparent;
    color: ${colorWhite};
    opacity: 1;
    font-family: 'bbb-icons';
    font-size: 0.85rem;
    line-height: 5px;
    text-align: center;
    vertical-align: middle;
    letter-spacing: -0.85rem;
    z-index: 1;
    bottom: 0;
    top: 8px;

    [dir="rtl"] & {
      left: ${userIndicatorsOffset};
      right: auto;
      padding-right: .65rem;
      padding-left: 0;
    }

    ${({animations}) => animations && `
        transition: .3s ease-in-out;
      `}
  }

  ${({voice}) => voice && `
    &:after {
      content: "\\00a0\\e931\\00a0";
      background-color: ${colorSuccess};
    }
  `}

  ${({muted}) => muted && `
    &:after {
      content: "\\00a0\\e932\\00a0";
      color: ${colorBlack};
      background-color: transparent;
      border: None;
    }
  `}

  ${({listenOnly}) => listenOnly && `
    &:after {
      content: "\\00a0\\e90c\\00a0";
      background-color: ${colorSuccess};
    }
  `}

  ${({noVoice}) => noVoice && `
    &:after {
      content: "";
      background-color: transparent;
    }
  `} // ================ talking animation ================
  ${({talking, animations}) => talking && animations && css`
    &:after {
      animation: ${pulse()} 1s infinite ease-in;
    }
  `}

  ${({talking, animations}) => talking && !animations && css`
    &:after {
      box-shadow: 0 0 0 4px currentColor;
    }
  `}
`;

const RightIconPresenterContainer = styled.div<RightIconPresenterProps>`
  position: relative;
  height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 50%;
  text-align: center;
  border: 2px solid transparent;
  user-select: none;
  color: ${colorWhite} !important;
  font-size: 110%;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items:center;
  inset: auto;
  background-color: transparent;

  ${({ animations }) => animations && `
    transition: .3s ease-in-out;
  `}

  &:after,
  &:before {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    border: 1.5px solid transparent;
    border-radius: 5px;
    background-color: transparent;
    color: ${colorWhite};
    opacity: 1;
    font-family: 'bbb-icons';
    font-size: .85rem;
    line-height: 6px;
    text-align: center;
    vertical-align: middle;
    letter-spacing: -.85rem;
    z-index: 1;
    bottom: 0;
    top: 8px;
  
    ${({ animations }) => animations && `
        transition: .3s ease-in-out;
      `}
  }
  ${({ moderator }) => moderator && `
    color: ${colorWhite} !important;
  `}

  ${({ presenter }) => presenter && `
    &:after {
      content: "\\00a0\\e90b\\00a0";
      padding: ${mdPaddingY} !important;
      background-color: ${colorPrimary};
    }
  `}

  ${({
       presenter, isChrome, isFirefox, isEdge,
     }) => presenter && (isChrome || isFirefox || isEdge) && `
    &:after {
      padding: ${indicatorPadding} !important;
    }
  `}

  ${({ whiteboardAccess, presenter }) => whiteboardAccess && !presenter && `
    &:after {
      content: "\\00a0\\e925\\00a0";
      padding: ${mdPaddingY} !important;
      background-color: ${colorPrimary};
    }
  `}

  ${({
       whiteboardAccess, isChrome, isFirefox, isEdge,
     }) => whiteboardAccess && (isChrome || isFirefox || isEdge) && `
    &:after {
      padding: ${indicatorPadding};
    }
  `}
`;

const RightIconHandContainer = styled.div<RightIconHandProps>`
  position: relative;
  height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 50%;
  text-align: center;
  border: 2px solid transparent;
  user-select: none;
  color: ${colorWhite} !important;
  font-size: 110%;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items:center;
  background-color: transparent;
  top: 6px;
`;

const RightIconMoreContainer = styled.div<RightIconMorePops>`
  position: relative;
  height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 50%;
  text-align: center;
  border: 2px solid transparent;
  user-select: none;
  color: ${colorBlack} !important;
  font-size: 110%;
  text-transform: capitalize;
  display: flex;
  @media (min-width: 1025px) {
    display: none;
  }
  justify-content: center;
  align-items:center;
  background-color: transparent;
  transition: de;
  height: 36px;
  ${({isSelected}) => isSelected && `
    display: flex;
  `}
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;


const UserItemContents = styled.div<UserItemContentsProps>`
  position: static;
  padding: .45rem 0 !important;
  border-radius: 5px 0px 0px 5px !important;
  width: 100%;
  border-width: 3px 1px 3px 1px !important;
  border-style: solid !important;
  border-color: transparent !important;
  
  ${({selected}) => selected && `
    background-color: ${listItemBgHover};
    border-top-left-radius: ${smPaddingY};
    border-bottom-left-radius: ${smPaddingY};

    &:focus {
      box-shadow: inset 0 0 0 ${borderSize} ${itemFocusBorder}, inset 1px 0 0 1px ${itemFocusBorder};
    }
  `}

  ${({isActionsOpen}) => !isActionsOpen && `
    display: flex;
    flex-flow: row;
    // border-top-left-radius: 5px;
    // border-bottom-left-radius: 5px;
    // border-top-right-radius: 0;
    // border-bottom-right-radius: 0;
    cursor: pointer;

    [dir="rtl"] & {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &:first-child {
      margin-top: 0;
    }
    &:focus,
    &:hover {
      outline: transparent;
      outline-style: dotted;
      outline-width: ${borderSize};
      background-color: ${listItemBgHover};
    }

    &:active{
      outline: transparent;
      outline-width: ${borderSize};
      outline-style: solid;
      background-color: ${listItemBgHover};
      box-shadow: inset 0 0 0 ${borderSize} ${itemFocusBorder}, inset 1px 0 0 1px ${itemFocusBorder};
    }
    flex-flow: column;
    flex-shrink: 0;

    @media (min-width: 1025px) {
      & .${RightBlockIconsContainer}
      {
        display: flex;
      }
    
      & .${RightIconMoreContainer}
      {
        display: none;
      }
    }
  `}

  ${({isActionsOpen}) => isActionsOpen && `
    outline: transparent;
    outline-width: ${borderSize};
    outline-style: solid;
    background-color: ${listItemBgHover};
    box-shadow: inset 0 0 0 ${borderSize} ${itemFocusBorder}, inset 1px 0 0 1px ${itemFocusBorder};
    border-top-left-radius: ${smPaddingY};
    border-bottom-left-radius: ${smPaddingY};

    &:focus {
      outline-style: solid;
      outline-color: transparent !important;
    }
    @media (min-width: 1025px) {
      & .${RightBlockIconsContainer}
      {
        display: none;
      }
    
      & .${RightIconMoreContainer}
      {
        display: flex;
      }
    }
  `}

  flex-grow: 0;
  display: flex;
  flex-flow: row;
  // border: 2px solid transparent !important;

  [dir="rtl"] & {
    padding: ${lgPaddingY} ${lgPaddingY} ${lgPaddingY} 0;
  }

  @media (min-width: 1025px) {
    &:hover ${RightBlockIconsContainer}
    {
      display: none;
    }

    &:hover ${RightIconMoreContainer}
    {
      display: flex;
    }
  }
`;

export default {
  Avatar,
  Skeleton,
  UserItemContents,
  UserNameContainer,
  UserAdditionalInformationIcon,
  UserNameSub,
  UserName,
  IconRightContainer,
  RightIconVoiceContainer,
  RightIconPresenterContainer,
  RightIconHandContainer,
  RightIconMoreContainer,
  RightBlockIconsContainer,
  UserListIconContainer,
};
