import styled from 'styled-components';
import Styled from '/imports/ui/components/settings/submenus/styles';

const Title = styled(Styled.Title)`
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px !important;
  }
`;

const SubTitle = styled(Styled.SubTitle)``;

const Form = styled(Styled.Form)``;

const Row = styled(Styled.Row)``;

const Col = styled(Styled.Col)`min-width: 100px;`;

const FormElement = styled(Styled.FormElement)``;

const FormElementRight = styled(Styled.FormElementRight)``;

const FormElementCenter = styled(Styled.FormElementCenter)``;

const Label = styled(Styled.Label)`
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 14px !important;
  }`;

const ColHeading = styled(Styled.Col)`
  display: block;
  text-align: center;
  font-size: 14px;
  margin-bottom: 0.5rem;
  font-weight: bold;
  min-width: 100px;
`;

export default {
  Title,
  SubTitle,
  Form,
  Row,
  Col,
  FormElement,
  FormElementRight,
  FormElementCenter,
  Label,
  ColHeading,
};
