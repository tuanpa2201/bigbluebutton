import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import styled from 'styled-components';

import {
  fontSizeBase,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  colorWhite,
  colorBackground,
} from '/imports/ui/stylesheets/styled-components/palette';

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
  width: 600px;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: var(--Text-Primary, #313131);
  text-align: center;

  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

const Text = styled.div`
  color: var(--Text-Primary, #313131);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MeetingEndedButton = styled.button`
  border: none;
  overflow: visible;
  border-radius: 2px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  height: 3rem;
  display: flex !important;
  align-items: center;
  box-align: center;
  flex-align: center;
  box-pack: center;
  justify-content: center;
  flex-pack: center;
  color: var(--btn-primary-color, var(--color-white, #FFF));
  background-color: var(--btn-primary-bg, var(--color-primary, #0F70D7));
  border: 3px solid transparent;
  padding: calc(1.25rem / 2);
  @media ${smallOnly} {
    font-size: ${fontSizeBase};
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
