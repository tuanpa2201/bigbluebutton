import styled from 'styled-components';

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

const ButtonWrapper = styled.div`
  ${({ isMobile }) => isMobile && `
    margin: 0 0 0 .2rem;
  `}
  margin: 0 .5rem;
`;

export default {
  IconWrapper,
  ButtonWrapper,
};
