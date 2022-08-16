import React, { useEffect, useState } from 'react'
import { Button, Input, Tabs, Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import seed from '../seeds/seed'
import { SystemTypes } from './SystemTypes'
import { MacroMenu } from './MacroMenu'

const { TabPane } = Tabs
const { TextArea } = Input

export const ReviewOfSystems = () => {
  const [systems, setSystems] = useState([])
  const [macros, setMacros] = useState([])

  const [macroMenuVisible, setMacroMenuVisible] = useState(false)

  const [selectedSubTypes, setSelectedSubTypes] = useState({})
  const [selectedMacros, setSelectedMacros] = useState({})

  const [narrative, setNarrative] = useState('')


  const insertOrRemoveSubType = (systemId, subType, insert = true) => {
    const oldSubTypes = { ...selectedSubTypes }

    if (!insert) {
      delete oldSubTypes[systemId][subType.id]

      if (!Object.keys(oldSubTypes[systemId]).length)
        delete oldSubTypes[systemId]

      setSelectedSubTypes(oldSubTypes)
      return
    }

    if (!oldSubTypes[systemId]) {
      oldSubTypes[systemId] = []
    }

    oldSubTypes[systemId][subType.id] = subType
    setSelectedSubTypes(oldSubTypes)
  }

  const insertOrRemoveMacro = (macro, insert = true) => {
    const oldMacro = { ...selectedMacros}

    if (!insert) {
      delete oldMacro[macro.id]
    } else {
      oldMacro[macro.id] = macro
    }

    setSelectedMacros(oldMacro)
    setMacroMenuVisible(false)

    generateMacro(oldMacro)
  }

  useEffect(() => {
    setSystems(seed.reviewOfSystems)

    setMacros(seed.macros)
  }, [])

  const generateMacro = (macro) => {
    const systemMapper = systems.reduce((acc, sys) => {
      acc[sys.id] = sys
      return acc
    }, {})

    let text = ''

    for (const systemId in selectedSubTypes) {
      text += `${systemMapper[systemId].text}\n`

      for (const subTypeId in selectedSubTypes[systemId]) {
        text += ` - ${selectedSubTypes[systemId][subTypeId].text}\n`
      }

      text += '\n'
    }

    if (Object.keys(macro).length) {
      text += 'Macro\n'

      for (const macroId in macro) {
        text += ` - ${macro[macroId].text}\n`
      }
    }

    setNarrative(text)
  }

  return (
    <>
      <h2>Review of System</h2>

      <div className='desc'>
        Please look at the list of physical symtoms below and check off any that
        you have expericenced in the last serveral days. If you have NOT experienced
        any symptoms in an area, be sure to check "None of the above" for that area.
        If you are filling this out on behalf of the patient, please answer from the patient's perspective.
      </div>

      <Tabs defaultActiveKey="1" size='small'
        moreIcon={<div style={{ width: 56 }} className='d-flex align-center space-between tabs-more'>More <DownOutlined /></div>}>
        {systems.map((sys, i) =>
          <TabPane tab={sys.text} key={i}>
            <SystemTypes systemId={sys.id} onInsertOrRemoveSubType={insertOrRemoveSubType} />
          </TabPane>)}
      </Tabs>

      <div className='narrative'>
        <div className='d-flex space-between align-center'>
          <b>Narritive</b>

          <div>
            <Popover content={
              <MacroMenu
                macros={macros}
                onSelectMacro={insertOrRemoveMacro}
                selectedMacros={selectedMacros} />
            } visible={macroMenuVisible}>
              <Button
                onClick={() => setMacroMenuVisible(!macroMenuVisible)}
                size='small'>Insert macro <DownOutlined /></Button>
            </Popover>
            <Button type='primary' size='small'
              onClick={() => generateMacro(selectedMacros)}>Generate</Button>
          </div>
        </div>

        <TextArea rows='7'
          value={narrative}
          onChange={e => setNarrative(e.target.value)} />
      </div>
    </>
  )
}
