import styled from 'styled-components';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import {
  colorGrayDark,
  colorGrayLightest,
  colorPrimary,
  colorDanger,
} from '/imports/ui/stylesheets/styled-components/palette';
import {
  smPaddingX,
  lgPaddingY,
  titlePositionLeft,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  fontSizeBase,
  fontSizeXL,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  hasPhoneDimentions,
  mediumDown,
  hasPhoneWidth,
  smallOnly,
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
`;

const Left = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Name = styled.div`
  display: flex;
  width: 43.5%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;

  @media ${hasPhoneDimentions} {
    width: 100%;
  }
`;

const FullName = styled(Name)`
  width: 100%;
`;

const ClientNotRespondingText = styled.div`
  display: flex;
  width: 27.5%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  color: ${colorDanger};

  @media ${hasPhoneDimentions} {
    width: 100%;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #313131;
  font-weight: 400;

  ${({ offline }) => offline && `
    font-style: italic;
  `}

  [dir="rtl"] & {
    padding: 0;
    padding-right: 10px;
  }
`;

const Avatar = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 1.437rem;
  height: 1.437rem;
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
  padding-bottom: 16px;

  &:focus {
    outline: none;

    &::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,.5);
    }
  }

  @media ${mediumDown} {
    justify-content: space-between;
  }
`;

const NetworkData = styled.div`
  font-size: ${fontSizeBase};

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
  min-height: 404px;
  border-radius: 12px !important;
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
`;

const HelperWrapper = styled.div`
  min-width: 12.5rem;
  height: 100%;

  @media ${mediumDown} {
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
`;

const NetworkDataContent = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-around;
  flex-grow: 1;

  @media ${mediumDown} {
    flex: none;
    width: 100%;
    scroll-snap-align: start;
  }
`;

const DataColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${hasPhoneWidth} {
    flex-grow: 1;
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
  margin-bottom: .5rem;
  border: none;
  padding: 0;
  width: calc(100% / 3);

  @media ${smallOnly} {
    width: 100%;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ConnectionTabPanel = styled(TabPanel)`
  display: none;
  margin-top: 8px;
  [dir="rtl"] & {
    margin: 0 1rem 0 0;
  }

  &.is-selected {
    display: flex;
    flex-flow: column;
  }

  & ul {
    padding: 0;
    margin: 4px 0px;
  }

  @media ${smallOnly} {
    width: 100%;
    margin: 0;
    padding-left: 1rem;
    padding-right: 1rem;
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

  @media ${smallOnly} {
    max-width: 100%;
    margin: 0 ${smPaddingX} 0 0;
    & > i {
      display: none;
    }

    [dir="rtl"] & {
       margin: 0 0 0 ${smPaddingX};
    }
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
