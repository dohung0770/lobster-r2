import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const IntakeNoteItem = ({ intakeNote, checked, active, setActiveId }) => {
  return (
    <Link to={intakeNote.path}>
      <div className={'check-item d-flex align-center' + (active ? ' active' : '')}
        onClick={() => setActiveId(intakeNote.id)}
      >
        <div className={'checkbox' + (checked ? ' checked' : '')}></div>
        {intakeNote.text}
      </div>
    </Link>
  )
}

IntakeNoteItem.propsTypes = {
  intakeNote: PropTypes.string,
  checked: PropTypes.bool
}
