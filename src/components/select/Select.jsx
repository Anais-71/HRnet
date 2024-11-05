import React from 'react'
import './select.css'

/**
 * Select component for rendering a dropdown menu.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.options - The options to be displayed in the dropdown.
 * @param {string} props.label - The label for the select element.
 * @param {string} props.value - The current value of the select element.
 * @param {function} props.onChange - The function to call when the selected option changes.
 * @param {string} props.name - The name attribute for the select element.
 * @param {string} props.valueField - The field in the options to be used as the value for the select options.
 * @param {string} props.labelField - The field in the options to be used as the label for the select options.
 * @returns {JSX.Element} The rendered Select component.
 */
const Select = ({
  options,
  label,
  value,
  onChange,
  name,
  valueField,
  labelField,
}) => {
  return (
    <div className="select-container">
      <label htmlFor={name}>{label}</label>
      <select
        className="select"
        id={name}
        value={value}
        onChange={onChange}
        name={name}
      >
        <option value="">Please select</option>
        {options.map((option) => (
          <option
            className="select__option"
            key={option[valueField]}
            value={option[valueField]}
          >
            {option[labelField]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
