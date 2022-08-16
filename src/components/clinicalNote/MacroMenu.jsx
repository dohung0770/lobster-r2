import React from 'react'
import { CheckOutlined } from '@ant-design/icons'

export const MacroMenu = ({ macros, selectedMacros, onSelectMacro }) => {
  return (
    <div className='macro-menu'>
      {macros.map(macro =>
        <p className='d-flex space-between'
          onClick={() => onSelectMacro(macro, !selectedMacros[macro.id])}
          key={macro.id}>
          {macro.text}
          {!!selectedMacros[macro.id] && <CheckOutlined style={{ color: 'green' }} />}
        </p>
      )}
    </div>
  )
}
