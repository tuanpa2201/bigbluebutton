import styled from 'styled-components';
import { colorGrayLight } from '/imports/ui/stylesheets/styled-components/palette';

export const Root = styled.div`
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  color: var(--Text-Secondary, #6F767E);

  /* Semibold/XS */
  font-family: "FS PF BeauSans Pro";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  padding: 16px;
  padding-bottom: 0px;

`;

export const Highlighted = styled.span`
  font-weight: bold;
`;

export const Left = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Cancel = styled.button`
  background: none;
  outline: none;
  border: none;
  color: inherit;
  padding: 0.125rem;
  border-radius: 0.5rem;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: .75;
  }

  &:focus {
    box-shadow: inset 0 0 0.125rem ${colorGrayLight};
  }
`;

export default {
  Container,
  Left,
  Cancel,
  Root,
};
