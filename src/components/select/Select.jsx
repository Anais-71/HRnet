import React from 'react'
import './select.css'

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
