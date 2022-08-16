import React, { useEffect, useState } from 'react'
import { Input, Checkbox } from 'antd'
import seed from '../seeds/seed'

const { TextArea } = Input

export const SystemTypes = ({ systemId, onInsertOrRemoveSubType }) => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    setTypes(
      seed.findSystemTypesById(systemId)
    )
  }, [])

  return (
    <div className='sys-types'>
      <div className='cols-3'>
        {types.map(type =>
          <Checkbox
            onChange={e => onInsertOrRemoveSubType(systemId, type, e.target.checked)}
            key={type.id}>{type.text}</Checkbox>)}

      </div>

      <b>Other</b>
      <TextArea rows='3' placeholder='Other'
        onChange={e => onInsertOrRemoveSubType(systemId, { id: 0, text: e.target.value }, !!e.target.value.length)} />
    </div>
  )
}
