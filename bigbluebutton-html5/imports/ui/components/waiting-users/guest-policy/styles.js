import styled from 'styled-components';
import {colorGray, listItemBgHover} from '/imports/ui/stylesheets/styled-components/palette';
import {
  jumboPaddingY,
  lgPaddingX,
  modalMargin,
  smPadding,
  smPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import ModalSimple from '/imports/ui/components/common/modal/simple/component';
import Button from '/imports/ui/components/common/button/component';

const GuestPolicyModal = styled(ModalSimple)``;

const Container = styled.div`
  margin: 0 ${modalMargin} ${lgPaddingX};
`;

const Description = styled.div`
  text-align: center;
  color: ${colorGray};
  margin-bottom: ${jumboPaddingY};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GuestPolicyButton = styled(Button)`
  width: 200px;
  box-sizing: border-box;
  margin: 5px;

  ${({ disabled }) => disabled && `
    & > span {
      text-decoration: underline;
    }
  `}
`;

const Footer = styled.div`
  display: flex;
  margin: ${smPaddingX} ${smPadding} 0;
`;

const Actions = styled.div`
  margin-left: auto;
  margin-right: 0;
  display: flex;
  [dir="rtl"] & {
    margin-right: auto;
    margin-left: 3px;
  }
`;

const ButtonCancel = styled(Button)`
  margin: 0 0.25rem;
`;

const ButtonApply = styled(Button)`
  margin: 0 0.25rem;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${listItemBgHover};
  }
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const RadioCircle = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: ${({ checked }) => checked ? '4px solid #EE0033' : '1.5px solid #C8C8C8'};
  border-radius: 20px;
  position: relative;
  background: #fff;
  box-sizing: border-box;

  [data-darkreader-scheme="dark"] & {
    box-shadow: 0 0 0 1px #9A9A9A;
    background-color: ${({ checked }) => checked ? 'white' : 'transparent'};
  }
`;

export default {
  GuestPolicyModal,
  Container,
  Description,
  Content,
  GuestPolicyButton,
  Footer,
  Actions,
  ButtonCancel,
  ButtonApply,
  RadioGroup,
  RadioLabel,
  RadioInput,
  RadioCircle,
};
