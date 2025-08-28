import styled from 'styled-components';

import { smPaddingX, lgPaddingY } from '/imports/ui/stylesheets/styled-components/general';

import { colorGray } from '/imports/ui/stylesheets/styled-components/palette';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${lgPaddingY};
  margin-top: ${smPaddingX};
  gap: 8px;
`;

export const SmallTitle = styled.h2`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0 ${smPaddingX};
  color: ${colorGray};
  flex: 1;
  margin: 0;
  [data-darkreader-scheme="dark"] & {
    background: var(--bg-00-dark, #3B3F43);
  }
`;

export default {
  Container,
  SmallTitle,
};
