import styled from 'styled-components';
import {
  smPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  phoneOnly, tabletDown, tabletOnly,
} from '/imports/ui/stylesheets/styled-components/breakpoints';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import SvgIcon from '/imports/ui/components/common/icon-svg/component';

const ToggleLabel = styled.span`
  margin-right: ${smPaddingX};

  [dir="rtl"] & {
    margin: 0 0 0 ${smPaddingX};
  }
`;

const SettingsTabs = styled(Tabs)`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  margin-top: 0px;
  @media ${tabletDown} {
    width: 100%;
    flex-flow: column;
    ul {
      display: flex;
      flex-flow: row;
      overflow-x: auto;
      width: 100% !important;
      justify-content: flex-start;
    }
  }
`;

const SettingsTabList = styled(TabList)`
  display: flex;
  flex-flow: column;
  margin: 0;
  border: none;
  padding: 0;
  width: calc(100% / 3);

  @media ${phoneOnly} {
    width: 100%;
    flex-flow: row;
    justify-content: start;
    overflow-x: auto;
    margin-bottom: 24px;
  }
`;

const SettingsTabSelector = styled(Tab)`
  display: flex;
  flex-flow: row;
  font-size: 12px;
  flex: 0 0 auto;
  justify-content: flex-start;
  border: none !important;
  padding: 6px 12px;
  color: var(--Text-Primary, #313131);
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  align-items: center;
  flex-grow: 0;
  min-width: 0;
  gap: 8px;

  & > span {
    min-width: 0;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media ${phoneOnly} {
    max-width: 100%;
    margin: 0 8px 0 0;
    & > i {
      display: none;
    }

    [dir="rtl"] & {
       margin: 0 0 0 ${smPaddingX};
    }
  }

  &.is-selected {
    background: var(--BG-04---hover, #EFEFEF);
    font-weight: 600;
    span {
      font-weight: 600;
    }
  }
  @media ${tabletOnly} {
    font-size: 16px;
  }
  @media ${phoneOnly} {
    font-size: 14px;
    height: 40px;
  }
`;

const SettingsIcon = styled(SvgIcon)`
  
`;

const SettingsTabPanel = styled(TabPanel)`
  display: none;
  margin: 0 0 0 1rem;
  width: calc(100% / 3 * 2);

  [dir="rtl"] & {
    margin: 0 1rem 0 0;
  }

  &.is-selected {
    display: block;
  }

  @media ${phoneOnly} {
    width: 100%;
    margin: 0;
  }
`;

export default {
  ToggleLabel,
  SettingsTabs,
  SettingsTabList,
  SettingsTabSelector,
  SettingsIcon,
  SettingsTabPanel,
};
