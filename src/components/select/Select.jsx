import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import './select.css'

/**
 * Select component that renders a dropdown list.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.options - Array of options to display in the dropdown.
 * @param {string} props.label - The label for the select input.
 * @param {string} props.value - The currently selected value in the select input.
 * @param {Function} props.onChange - Callback function when the value changes.
 * @param {string} props.name - The name attribute for the select input.
 * @param {string} props.valueField - The field in each option object to use for the option value.
 * @param {string} props.labelField - The field in each option object to display as the option label.
 *
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
  const selectRef = useRef(null)

  /**
   * Handles focus event on the <select> element.
   * No custom logic needed since the native <select> element automatically opens when focused.
   */
  const handleFocus = () => {
    // L'élément <select> s'ouvre automatiquement lorsqu'il reçoit le focus, donc pas besoin de logique ici.
  }

  /**
   * Handles blur event on the <select> element.
   * No custom logic needed since the native <select> element automatically closes when it loses focus.
   */
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

Select.propTypes = {
  /**
   * Array of options for the select dropdown.
   * Each option is an object that contains at least two fields: one for the label and one for the value.
   * @type {Array<Object>}
   * @required
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      [PropTypes.string]: PropTypes.any, // Clé dynamique pour les champs 'labelField' et 'valueField'
    }),
  ).isRequired,

  /**
   * The label for the select input.
   * This text is displayed as a label above the select dropdown.
   * @type {string}
   * @required
   */
  label: PropTypes.string.isRequired,

  /**
   * The value of the currently selected option.
   * This is used to determine which option is selected in the dropdown.
   * @type {string}
   * @required
   */
  value: PropTypes.string.isRequired,

  /**
   * The callback function to call when the selected option changes.
   * @type {Function}
   * @required
   */
  onChange: PropTypes.func.isRequired,

  /**
   * The name attribute for the select element, used to identify the input in form submissions.
   * @type {string}
   * @required
   */
  name: PropTypes.string.isRequired,

  /**
   * The name of the field in the options array that holds the value for each option.
   * @type {string}
   * @required
   */
  valueField: PropTypes.string.isRequired,

  /**
   * The name of the field in the options array that holds the label for each option.
   * @type {string}
   * @required
   */
  labelField: PropTypes.string.isRequired,
}

export default Select
