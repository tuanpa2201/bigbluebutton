import styled from 'styled-components';
import BaseIcon from '/imports/ui/components/common/icon/component';
import { smPadding } from '/imports/ui/stylesheets/styled-components/general';

export const Root = styled.div`
  color: #313131;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;


  [data-darkreader-scheme="dark"] & {
    color: var(--text-primary-dark, #FCFCFD);
  }
  
  & svg {
    width: 16px;
    height: 16px;
  }
  
  & p {
    text-align: left;
    color: var(--Text-Secondary, #6F767E);

    /* Regular/M */
    font-size: 16px!important;
    font-style: normal;
    font-weight: 400!important;
    line-height: 24px; /* 150% */

    [data-darkreader-scheme="dark"] & {
      color: var(--text-primary-dark, #FCFCFD);
    }
  }
`;

export const Icon = styled(BaseIcon)`
  vertical-align: baseline;

  [dir='ltr'] & {
    margin-right: ${smPadding};
  }

  [dir='rtl'] & {
    margin-left: ${smPadding};
  }
`;

export const Typography = styled.p`
  display: inline;
  margin: 0;
  vertical-align: baseline;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  [data-darkreader-scheme="dark"] & {
    color: var(--text-primary-dark, #FCFCFD);
  }
`;

export default {
  Root,
  Icon,
  Typography,
};
