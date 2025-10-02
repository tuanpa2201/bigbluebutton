import React from 'react';
import Base from '../checkbox/base';
import Styled from './styles';
import AppService from '/imports/ui/components/app/service';

export default class Radio extends Base {
  render() {
    const {
      ariaLabel, ariaDesc, ariaDescribedBy, ariaLabelledBy, checked, disabled, label,
    } = this.props;

    const isDarkTheme = AppService.isDarkThemeEnabled();
    const radio = (
      <Styled.Radio
        checked={checked}
        checkedIcon={<Styled.RadioIconChecked iconName="check" />}
        icon={<Styled.RadioIcon iconName={isDarkTheme ? 'circleDark' : 'circle'} />}
        disabled={disabled}
        inputProps={{
          'aria-label': ariaLabel,
          'aria-describedby': ariaDescribedBy,
          'aria-labelledby': ariaLabelledBy,
        }}
        onChange={this.handleChange}
        ref={this.element}
      />
    );

    return (
      <>
        {label ? (
          <Styled.Label
            className="radio-label"
            label={label}
            control={radio}
          />
        ) : radio}
        <div id={ariaDescribedBy} hidden>{ariaDesc}</div>
      </>
    );
  }
}
