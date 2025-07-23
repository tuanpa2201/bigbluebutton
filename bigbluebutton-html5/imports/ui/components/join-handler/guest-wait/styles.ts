import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: var(--BG-Meet-bg, #303338);
`;

const Content = styled.div`
  text-align: center;

  color: var(--Neutral-02, #F2F2F2);

  font-family: "FS PF BeauSans Pro";
  font-size: 18px;
  line-height: 24px;
`;

const Heading = styled.h1`
  color: var(--Neutral-02, #F2F2F2);
  text-align: center;
  text-overflow: ellipsis;
  font-family: "FS PF BeauSans Pro";
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-top: 48px;
`;

const Position = styled.div`
  align-items: center;
  text-align: center;
  color: var(--Neutral-02, #F2F2F2);

  font-family: "FS PF BeauSans Pro";
  font-size: 18px;
  line-height: 24px;
`;

const sk_bouncedelay = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.0);
  }
`;

const Spinner = styled.div`
  margin: 20px auto;
  font-size: 0px;
`;

const Bounce = styled.div`
  width: 18px;
  height: 18px;
  margin: 0 5px;
  background-color: rgb(255, 255, 255);
  display: inline-block;
  border-radius: 100%;
  animation: ${sk_bouncedelay} calc(1.4s) infinite ease-in-out both;
`;

const Bounce1 = styled(Bounce)`
  animation-delay: -0.32s;
`;

const Bounce2 = styled(Bounce)`
  animation-delay: -0.16s;
`;

const IconSvg = styled.img`
  height: 16rem;
`;

export default {
  Container,
  Content,
  Heading,
  Position,
  Bounce,
  Bounce1,
  Bounce2,
  Spinner,
  IconSvg,
};
