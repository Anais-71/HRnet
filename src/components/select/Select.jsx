import React, { useRef } from 'react'
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
  const selectRef = useRef(null)

  const handleFocus = () => {
    // L'élément <select> s'ouvre automatiquement lorsqu'il reçoit le focus, donc pas besoin de logique ici.
  }

  const handleBlur = () => {
    // L'élément <select> se ferme automatiquement lorsqu'il perd le focus, donc pas besoin de logique ici non plus.
  }

  return (
    <div className="select-container">
      <label htmlFor={name} id={`${name}-label`}>
        {label}
      </label>
      <select
        ref={selectRef}
        className="select"
        id={name}
        value={value}
        onChange={onChange}
        name={name}
        onFocus={handleFocus} // Ouvre le menu lorsque l'élément reçoit le focus (comportement natif)
        onBlur={handleBlur} // Ferme le menu lorsque l'élément perd le focus (comportement natif)
        aria-labelledby={`${name}-label`}
        aria-expanded="false" // Attribut ARIA pour signaler que l'état du dropdown est fermé
        aria-controls={`${name}-options`} // Lier les options au select
      >
        <option
          value=""
          className="select__placeholder"
          aria-placeholder="true"
        >
          Select an option
        </option>
        {options.map((option) => (
          <option
            className="select__option"
            key={option[valueField]}
            value={option[valueField]}
            aria-selected={option[valueField] === value} // Attribut ARIA pour signaler l'option sélectionnée
          >
            {option[labelField]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
