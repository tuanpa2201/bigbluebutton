import styled from 'styled-components';

import {
  colorWhite,
  colorBackground,
} from '/imports/ui/stylesheets/styled-components/palette';
import { tabletOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';

const Parent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorBackground};
`;

const Modal = styled.div`
  display: flex;
  padding: 24px 16px 12px;
  background-color: ${colorWhite};
  flex-direction: column;
  border-radius: 12px;
  max-width: 95vw;
  width: 500px;

  @media ${tabletOnly} {
    padding: 24px 16px 16px;
  }
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.div`
  color: var(--Text-Primary, #313131);
  text-align: center;

  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  @media ${tabletOnly} {
    font-size: 20px;
    line-height: 32px;
  }
`;

const Text = styled.div`
  color: var(--Text-Primary, #313131);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-top: 8px;
  @media ${tabletOnly} {
    font-size: 16px;
    line-height: 24px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MeetingEndedButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: var(--Text-Link, #1087FF);
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;

  @media ${tabletOnly} {
    font-size: 16px;
    line-height: 24px;
  }

`;

const TextArea = styled.textarea`
  resize: none;
  margin: 1rem auto;
  width: 100%;

  &::placeholder {
    text-align: center;
  }
`;

export default {
  Parent,
  Modal,
  Content,
  Title,
  Text,
  MeetingEndedButton,
  TextArea,
  Wrapper,
};
