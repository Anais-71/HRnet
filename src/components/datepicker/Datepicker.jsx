import React, { useState, useRef } from 'react'
import './Datepicker.css'
import PropTypes from 'prop-types'

const Datepicker = ({ idPrefix, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const inputRef = useRef(null)
  const monthSelectRef = useRef(null)
  const yearSelectRef = useRef(null)

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  const handleDayClick = (day) => {
    const formattedDate = `${day}/${currentMonth + 1}/${currentYear}`
    setSelectedDate(formattedDate)
    if (onChange) onChange(formattedDate)
    setIsOpen(false)
  }

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter') {
      action()
    }
  }

  const renderCalendar = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth, currentYear)
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="datepicker__grid--day empty"></div>,
      )
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <div
          key={day}
          className="datepicker__grid--day"
          role="gridcell"
          aria-selected={
            selectedDate === `${day}/${currentMonth + 1}/${currentYear}`
          }
          onClick={() => handleDayClick(day)}
          onKeyDown={(e) => handleKeyPress(e, () => handleDayClick(day))}
          tabIndex={0}
        >
          {day}
        </div>,
      )
    }

    return (
      <div className="datepicker__grid" role="grid" aria-live="polite">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
          (weekday, index) => (
            <div
              key={index}
              className="datepicker__grid--weekday"
              role="columnheader"
            >
              {weekday}
            </div>
          ),
        )}
        {days}
      </div>
    )
  }

  const toggleCalendar = () => setIsOpen(!isOpen)

  return (
    <div className="datepicker">
      <input
        ref={inputRef}
        type="text"
        id={idPrefix}
        value={selectedDate}
        readOnly
        onClick={toggleCalendar}
        onKeyDown={(e) => handleKeyPress(e, toggleCalendar)}
        placeholder="Please select a date"
        aria-haspopup="grid"
        aria-expanded={isOpen}
        autoComplete="off"
        className="datepicker__input"
        tabIndex={0}
      />
      {isOpen && (
        <div
          className="datepicker__calendar"
          data-testid="calendar"
          style={{ position: 'absolute', top: '100%', left: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="datepicker__controls">
            <label htmlFor={`${idPrefix}-month-select`}>Month:</label>
            <select
              id={`${idPrefix}-month-select`}
              ref={monthSelectRef}
              data-testid="month-select"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              aria-label="Select month"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  monthSelectRef.current.size = 12
                } else if (e.key === 'Escape') {
                  monthSelectRef.current.size = 0
                }
              }}
              onBlur={() => (monthSelectRef.current.size = 0)}
            >
              {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ].map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <label htmlFor={`${idPrefix}-year-select`}>Year:</label>
            <select
              id={`${idPrefix}-year-select`}
              ref={yearSelectRef}
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              data-testid="year-select"
              aria-label="Select year"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  yearSelectRef.current.size = 5
                } else if (e.key === 'Escape') {
                  yearSelectRef.current.size = 0
                }
              }}
              onBlur={() => (yearSelectRef.current.size = 0)}
            >
              {Array.from({ length: 76 }, (_, index) => 1950 + index).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ),
              )}
            </select>
          </div>
          {renderCalendar()}
        </div>
      )}
    </div>
  )
}

Datepicker.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Datepicker
