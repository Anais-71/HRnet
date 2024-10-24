import React, { useState } from 'react'
import './Datepicker.css'

const Datepicker = ({ idPrefix }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const months = [
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
  ]

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  const handleDayClick = (day) => {
    const formattedDate = `${day}/${currentMonth + 1}/${currentYear}`
    setSelectedDate(formattedDate)
    setIsOpen(false)
  }

  const renderCalendar = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth, currentYear)
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()

    // Render empty slots before first day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="datepicker__grid--day empty"></div>,
      )
    }

    // Render days of the month
    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <div
          key={day}
          className="datepicker__grid--day"
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>,
      )
    }

    return (
      <div className="datepicker__grid">
        {weekdays.map((weekday, index) => (
          <div key={index} className="datepicker__grid--weekday">
            {weekday}
          </div>
        ))}
        {days}
      </div>
    )
  }

  return (
    <div className="datepicker">
      <label htmlFor={idPrefix}>Select a date:</label>{' '}
      <input
        type="text"
        id={idPrefix}
        value={selectedDate}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        placeholder="Please select a date"
        aria-haspopup="true"
        aria-expanded={isOpen}
        autoComplete="off"
      />
      {isOpen && (
        <div className="datepicker__calendar" role="dialog" aria-modal="true">
          <div className="datepicker__controls">
            <label htmlFor={`${idPrefix}-month`}>Month:</label>{' '}
            <select
              id={`${idPrefix}-month`}
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <label htmlFor={`${idPrefix}-year`}>Year:</label>{' '}
            <select
              id={`${idPrefix}-year`}
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
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

export default Datepicker
