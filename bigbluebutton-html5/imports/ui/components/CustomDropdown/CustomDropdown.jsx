import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import ReactDOM from 'react-dom';

function CustomDropdown({
  options, value, onChange, disabled,
}) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const ref = useRef(null);
  const dropdownListRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside both the trigger and the dropdown list
      if (
        ref.current
        && !ref.current.contains(event.target)
        && dropdownListRef.current
        && !dropdownListRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Calculate dropdown position when open
  useLayoutEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const style = {
        position: 'absolute',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 1000,
      };
      setDropdownStyle(style);
    }
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  // Keyboard accessibility
  function handleKeyDown(e) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((o) => !o);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  // Dropdown list to be rendered in the portal
  const dropdownList = open && !disabled ? (
    ReactDOM.createPortal(
      <ul
        className="custom-dropdown__list"
        style={dropdownStyle}
        ref={dropdownListRef}
      >
        {options.map((opt) => (
          <li
            key={opt.value}
            className={
              `custom-dropdown__option${
                opt.value === value ? ' custom-dropdown__option--selected' : ''}`
            }
            onClick={() => {
              onChange({ target: { value: opt.value } });
              setOpen(false);
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {opt.label}
          </li>
        ))}
      </ul>,
      document.body,
    )
  ) : null;

  return (
    <div className="custom-dropdown" ref={ref}>
      <div
        className="custom-dropdown__selected"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        style={{ pointerEvents: disabled ? 'none' : undefined, opacity: disabled ? 0.6 : 1 }}
      >
        {selected ? selected.label : ''}
        <span style={{ float: 'right', marginTop: '2px' }}>
          <img src={`${window.meetingClientSettings.public.app.basename}/svgs/ic-arrow-down.svg`} alt="arrow down" />
        </span>
      </div>
      {dropdownList}
    </div>
  );
}

export default CustomDropdown;
