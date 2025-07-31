import styled from 'styled-components';
import { smPaddingX } from '/imports/ui/stylesheets/styled-components/general';
import { Tabs } from 'react-tabs';
import { ScrollboxVertical } from '/imports/ui/stylesheets/styled-components/scrollable';
import StyledSettings from '../settings/styles';

import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';

const KeyCell = styled.td`
  text-align: center;
  padding: ${smPaddingX};
  margin: auto;
  width: 8rem;
  min-width: 8rem;
`;

const DescCell = styled.td`
  padding: ${smPaddingX};
  margin: auto;
`;

const ShortcutTable = styled.table`
  border-collapse: collapse;
  margin: 0;
  width: 100%;

  color: var(--Text-Primary, #313131);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  th {
    padding: 0px 10px;
    color: var(--Text-Secondary, #6F767E);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    &:first-child {
      text-align: left;
    }
  }
`;

const SettingsTabs = styled(Tabs)`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;

  @media ${smallOnly} {
    width: 100%;
    flex-flow: column;
  }
`;

const TableWrapper = styled(ScrollboxVertical)`
  height: 50vh;
  width: 100%;
`;

const TabPanel = styled(StyledSettings.SettingsTabPanel)`
  @media ${smallOnly} {
    padding: 0;
  }
`;

export default {
  KeyCell,
  DescCell,
  ShortcutTable,
  SettingsTabs,
  TableWrapper,
  TabPanel,
};
