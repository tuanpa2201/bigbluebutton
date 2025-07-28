import styled from 'styled-components';
import BaseIcon from '/imports/ui/components/common/icon/component';
import { $3xlPadding, smPadding } from '/imports/ui/stylesheets/styled-components/general';

export const Root = styled.div`
  color: #313131;
  padding: 0 ${$3xlPadding};
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  

  svg {
    width: 16px;
    height: 16px;
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
`;

export default {
  Root,
  Icon,
  Typography,
};
