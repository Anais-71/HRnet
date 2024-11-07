import React, { useState, useRef } from 'react'
import './Datepicker.css'

const Datepicker = ({ idPrefix, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const inputRef = useRef(null)
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  // Ajout de vérifications de fonctionnement avec des logs
  const handleDayClick = (day) => {
    const formattedDate = `${day}/${currentMonth + 1}/${currentYear}`
    setSelectedDate(formattedDate)
    if (onChange) onChange(formattedDate) // Envoie au parent
    setIsOpen(false)
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
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>,
      )
    }

    return (
      <div className="datepicker__grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
          (weekday, index) => (
            <div key={index} className="datepicker__grid--weekday">
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
        placeholder="Please select a date"
        aria-haspopup="true"
        aria-expanded={isOpen}
        autoComplete="off"
        className="datepicker__input"
      />
      {isOpen && (
        <div
          className="datepicker__calendar"
          data-testid="calendar"
          style={{ position: 'absolute', top: '100%', left: 0 }}
        >
          <div className="datepicker__controls">
            <label>Month:</label>
            <select
              data-testid="month-select"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
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

            <label>Year:</label>
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              data-testid="year-select"
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
