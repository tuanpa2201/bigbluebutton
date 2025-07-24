import { colorText, colorSuccess } from '/imports/ui/stylesheets/styled-components/palette';
import BaseCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';

const Checkbox = styled(BaseCheckbox)(() => ({
  '&.Mui-checked': {
    color: `${colorSuccess} !important`,
  },
  padding: 0,
  width: '16px',
  height: '16px',
}));

const Label = styled(FormControlLabel)(() => ({
  '& .MuiFormControlLabel-label': {
    fontFamily: 'inherit !important',
    // color: `${colorText} !important`,
    color: 'var(--Text-Primary, #313131)',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '20px',
  },
  '&.Mui-disabled': {
    cursor: 'not-allowed !important',
  },
  margin: 0,
  gap: '12px'
}));

export default {
  Checkbox,
  Label,
};
