import React from 'react';
import Base from './base';
import Styled from './styles';

export default class Checkbox extends Base {
  render() {
    const {
      ariaLabel, ariaDesc, ariaDescribedBy, ariaLabelledBy, checked, disabled, label,
    } = this.props;
      const icon =
          <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1.33337 7.73301C1.33337 5.4928 1.33337 4.37269 1.76935 3.51705C2.15284 2.7644 2.76476 2.15248 3.51741 1.76898C4.37306 1.33301 5.49316 1.33301 7.73337 1.33301H8.26671C10.5069 1.33301 11.627 1.33301 12.4827 1.76898C13.2353 2.15248 13.8472 2.7644 14.2307 3.51705C14.6667 4.37269 14.6667 5.4928 14.6667 7.73301V8.26634C14.6667 10.5066 14.6667 11.6267 14.2307 12.4823C13.8472 13.235 13.2353 13.8469 12.4827 14.2304C11.627 14.6663 10.5069 14.6663 8.26671 14.6663H7.73337C5.49316 14.6663 4.37306 14.6663 3.51741 14.2304C2.76476 13.8469 2.15284 13.235 1.76935 12.4823C1.33337 11.6267 1.33337 10.5066 1.33337 8.26634V7.73301Z"
                      stroke="#BBBBBB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </>
      const checkedIcon =
          <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_168_23437)">
                      <path
                          d="M1.3335 7.73337C1.3335 5.49316 1.3335 4.37306 1.76947 3.51741C2.15296 2.76476 2.76489 2.15284 3.51753 1.76935C4.37318 1.33337 5.49329 1.33337 7.7335 1.33337H8.26683C10.507 1.33337 11.6271 1.33337 12.4828 1.76935C13.2354 2.15284 13.8474 2.76476 14.2309 3.51741C14.6668 4.37306 14.6668 5.49316 14.6668 7.73337V8.26671C14.6668 10.5069 14.6668 11.627 14.2309 12.4827C13.8474 13.2353 13.2354 13.8472 12.4828 14.2307C11.6271 14.6667 10.507 14.6667 8.26683 14.6667H7.73349C5.49329 14.6667 4.37318 14.6667 3.51753 14.2307C2.76489 13.8472 2.15296 13.2353 1.76947 12.4827C1.3335 11.627 1.3335 10.5069 1.3335 8.26671V7.73337Z"
                          fill="#EB5366" stroke="#EB5366" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round"/>
                      <path d="M5.16992 8.33333L6.83659 10L10.8366 6" stroke="white" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                      <clipPath id="clip0_168_23437">
                          <rect width="16" height="16" fill="white"/>
                      </clipPath>
                  </defs>
              </svg>
          </>
    const checkbox = (
      <Styled.Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        checked={checked}
        disabled={disabled}
        focusRipple={true}
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
            label={label}
            control={checkbox}
          />
        ) : checkbox}
        <div id={ariaDescribedBy} hidden>{ariaDesc}</div>
      </>
    );
  }
}
