import styled from 'styled-components';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import {
  colorGrayDark,
  colorGrayLightest,
  colorPrimary,
  colorDanger,
} from '/imports/ui/stylesheets/styled-components/palette';
import {
  lgPaddingY,
  titlePositionLeft,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  fontSizeXL,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  hasPhoneWidth,
  smallOnly,
  phoneOnly,
  tabletOnly,
} from '/imports/ui/stylesheets/styled-components/breakpoints';
import {
  ScrollboxVertical,
} from '/imports/ui/stylesheets/styled-components/scrollable';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

const Item = styled.li`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${colorGrayLightest};
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  ${({ last }) => last && `
    border: none;
  `}

  @media ${phoneOnly} {
    width: max-content;
    min-width: 100%;
  }
`;

const Left = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  max-width: calc(100vw - 6em);
  @media ${phoneOnly} {
    max-width: unset;
  }
`;

const Name = styled.div`
  display: flex;
  width: 43.5%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;

  @media ${phoneOnly} {
    width: 180px;
    flex-shrink: 0;
  }
`;

const FullName = styled(Name)`
  width: 100%;
`;

const ClientNotRespondingText = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  color: ${colorDanger};

  @media ${phoneOnly} {
    width: 200px;
    justify-content: center;
  }
`;

const Text = styled.div`
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #313131;
  font-weight: 500;

  ${({ offline }) => offline && `
    font-style: italic;
  `}

  [dir="rtl"] & {
    padding: 0;
    padding-right: 10px;
  }
`;

const Text2 = styled.div`
  margin-top: 12px;
  color: #313131;
  font-weight: 400;

  ${({ offline }) => offline && `
    font-style: italic;
  `}

  [dir="rtl"] & {
    padding: 0;
    padding-right: 10px;
  }

  @media ${phoneOnly} {
    font-size: 14px;
    line-height: 20px;
    margin-top: 8px;
  }
`;

const Avatar = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
`;

const Right = styled.div`
  display: flex;
  width: 5rem;
  height: 100%;
  gap: 12px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  white-space: pre;
  >time {
    color: #6F767E !important;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const TimeActive = styled.time`
  color: ${colorPrimary} !important;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

const NetworkDataContainer = styled(ScrollboxVertical)`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  scroll-snap-type: x mandatory;
  gap: 24px;
  padding-bottom: 16px;

  &:focus {
    outline: none;

    &::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,.5);
    }
  }

  @media ${phoneOnly} {
    justify-content: space-between;
  }
`;

const NetworkData = styled.div`
  font-size: 14px;

  ${({ invisible }) => invisible && `
    visibility: hidden;
  `}

  & :first-child {
    font-weight: 600;
    color: #313131;
  }
  & :last-child {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--Text-Primary, #313131);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  }
`;

const CopyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border: none;
  border-top: 1px solid #EFEFEF;
  padding: 12px 0 0 0;
`;

const ConnectionStatusModal = styled(ModalSimple)`
  padding: 0px;
  min-height: 300px;
`;

const Container = styled.div`
`;

const Header = styled.div`
  margin: 0;
  padding: 0;
  border: none;
  line-height: ${titlePositionLeft};
  margin-bottom: ${lgPaddingY};
`;

const Title = styled.h2`
  color: ${colorGrayDark};
  font-weight: 500;
  font-size: ${fontSizeXL};
  text-align: left;
  margin: 0;

  [dir="rtl"] & {
    text-align: right;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const Wrapper = styled.div`
  display: block;
  width: 100%;
  max-height: 16rem;
`;

const Status = styled.div`
  display: flex;
  width: 6rem;
  height: 100%;
  justify-content: center;
  align-items: center;

  @media ${phoneOnly} {
    width: 200px;
  }
`;

const Copy = styled.span`
  cursor: pointer;
  color: #1087FF;
  padding: 6px 12px;
  display: block;

  &:hover {
    text-decoration: underline;
  }

  ${({ disabled }) => disabled && `
    cursor: not-allowed !important;
  `}

  @media ${tabletOnly} {
    font-size: 16px;
  }
`;

const HelperWrapper = styled.div`
  min-width: 12.5rem;
  height: 100%;

  @media ${phoneOnly} {
    flex: none;
    width: 100%;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
  }
`;

const Helper = styled.div`
  width: 212px;
  height: 212px;
  border-radius: 8px;
  background-color: #F7F8F9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: .5rem;

  @media ${phoneOnly} {
    width: 160px;
    height: 160px;
  }
`;

const NetworkDataContent = styled.div`
  margin: 0;
  display: flex;
  gap: 0px 48px;
  flex-grow: 1;

  @media ${phoneOnly} {
    flex: none;
    width: 100%;
    scroll-snap-align: start;
  }
`;

const DataColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${hasPhoneWidth} {
    flex-grow: 1;
  }
  @media (max-width: 767px) {
    width: 100%
  }
`;

const ConnectionTabs = styled(Tabs)`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  @media ${smallOnly} {
    width: 100%;
    flex-flow: column;
  }
`;

const ConnectionTabList = styled(TabList)`
  display: flex;
  flex-flow: row;
  margin: 0;
  margin-bottom: 8px;
  border: none;
  padding: 0;
  gap: 12px;


  @media ${phoneOnly} {
    width: 100%;
    justify-content: start;
    margin-bottom: 24px;
    gap: 12px;
    overflow-x: auto;
  }
`;

const ConnectionTabPanel = styled(TabPanel)`
  display: none;
  margin-top: 12px;
  [dir="rtl"] & {
    margin: 0 1rem 0 0;
  }

  &.is-selected {
    display: flex;
    flex-flow: column;
  }

  & ul {
    padding: 0;
    margin: 0;
  }

  @media ${phoneOnly} {
    width: 100%;
    margin: 0;
    min-height: 457px;
    overflow: auto;
    // min-width: 500px;
  }
`;

const ConnectionTabSelector = styled(Tab)`
  display: flex;
  flex-flow: row;
  font-size: 0.9rem;
  flex: 0 0 auto;
  justify-content: flex-start;
  border: none !important;
  padding: 6px 12px;

  border-radius: .2rem;
  cursor: pointer;
  align-items: center;
  flex-grow: 0;
  min-width: 0;

  & > span {
    min-width: 0;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media ${tabletOnly} {
    max-width: 100%;
    gap: 12px !important;
    & > i {
      display: none;
    }

    [dir="rtl"] & {
       margin: 0 0 0 12px;
    }
    padding: 6px 12px;
    font-size: 16px;
    height: 40px;

  }

  @media ${phoneOnly} {
    max-width: 100%;
    gap: 12px !important;
    & > i {
      display: none;
    }

    [dir="rtl"] & {
       margin: 0 0 0 12px;
    }
    padding: 6px 12px;
    font-size: 14px;
    height: 40px;

  }

  color: #313131 !important;
  font-size: 12px;
  &.is-selected {
    border: none;
    font-weight: 600;
    background-color: #EFEFEF;
    border-radius: 8px;
  }
`;

export default {
  Item,
  Left,
  Name,
  Text,
  Text2,
  Avatar,
  Icon,
  Right,
  Time,
  TimeActive,
  NetworkDataContainer,
  NetworkData,
  CopyContainer,
  ConnectionStatusModal,
  ClientNotRespondingText,
  Container,
  Header,
  Title,
  Content,
  Wrapper,
  Status,
  Copy,
  Helper,
  NetworkDataContent,
  FullName,
  DataColumn,
  HelperWrapper,
  ConnectionTabs,
  ConnectionTabList,
  ConnectionTabSelector,
  ConnectionTabPanel,
};
