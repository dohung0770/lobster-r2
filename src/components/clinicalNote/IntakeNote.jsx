import React, { useEffect, useRef } from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import { IntakeNoteItem } from './IntakeNoteItem'

const { TabPane } = Tabs


const IntakeNoteTab = ({ data, activeId, completed, setActiveId }) => {
  return (
    <>
      {data.map(note =>
        <IntakeNoteItem
          intakeNote={note}
          key={note.id}
          checked={!!completed[note.id]}
          active={activeId === note.id}
          setActiveId={setActiveId}
        />)}
    </>
  )
}

export const IntakeNote = ({ container, intakeNotes, activeId, completed, setActiveId }) => {
  const currRef = useRef(null)

  const setTabPaneHeight = _.debounce(() => {
    const bounder = container?.current?.getBoundingClientRect() || {}
    const antTabContentHolder = currRef?.current?.querySelector('.ant-tabs-content-holder')
    if (antTabContentHolder) {
      const currRect = antTabContentHolder.getBoundingClientRect()
      antTabContentHolder.style.height = bounder.height - currRect.y - 10 + 'px'
    }
  }, 500)

  useEffect(() => {
    setTabPaneHeight()

    // @TODO
    window.addEventListener('resize', () => setTabPaneHeight)

    return () => window.removeEventListener('resize', function () { })
  }, [])

  const completedSet = intakeNotes.filter(note => completed[note.id])
  const incompleteSet = intakeNotes.filter(note => !completed[note.id])

  const tabs = [
    { key: '1', title: `All (${intakeNotes.length})`, data: intakeNotes },
    { key: '2', title: `Completed (${completedSet.length})`, data: completedSet },
    { key: '3', title: `Incomplete (${incompleteSet.length})`, data: incompleteSet },
  ]

  return (
    <div ref={currRef}>
      <Tabs defaultActiveKey={tabs[0].key} size='small'>
        {tabs.map(tab => (
          <TabPane tab={tab.title} key={tab.key}>
            <IntakeNoteTab
              data={tab.data}
              activeId={activeId}
              completed={completed}
              setActiveId={setActiveId} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

IntakeNote.propTypes = {}
