import React, { useRef, useEffect, useState } from 'react'
import { Layout, Button } from 'antd'
import { Routes, Route, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { SearchOutlined, SettingOutlined, EyeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { IntakeNote } from './IntakeNote'
import { withHeader } from '../utils/withHeader'
import { routes } from '../../routes/intakeNoteRoutes'
import seed from '../seeds/seed'

const { Content, Sider } = Layout


const ClinicalNote = ({ container }) => {
  const navigate = useNavigate()
  const contentRef = useRef(null)
  const [intakeNotes, setIntakeNotes] = useState([])
  const [activeId, setActiveId] = useState(0)
  const [completed, setCompleted] = useState({})

  const setTabPaneHeight = _.debounce(() => {
    const bounder = container?.current?.getBoundingClientRect() || {}
    const currRect = contentRef?.current?.getBoundingClientRect()

    contentRef.current.style.paddingRight = '10px'
    contentRef.current.style.height = bounder.height - currRect.y - 10 + 'px'
    contentRef.current.style.overflowY = 'auto'
  }, 500)

  const completeNote = activeId => {
    setCompleted({
      ...completed,
      [activeId]: 1
    })

    const currIdx = intakeNotes.findIndex(note => note.id === activeId)
    if (currIdx !== -1 && currIdx < intakeNotes.length - 1) {
      setActiveId(intakeNotes[currIdx + 1].id)

      navigate(intakeNotes[currIdx + 1].path)
    }

    // @TODO: Pass narrative to somewhere to store
  }

  useEffect(() => {
    setIntakeNotes(seed.intakeNotes)

    setTabPaneHeight()

    // setActiveId(6) // Review of Systems
  }, [])

  return (
    <>
      <Sider width={330}>
        <div className='intake-note d-flex column'>
          <div className='title d-flex space-between align-center'>
            <span>Intake Note</span>

            <div>
              <Button size='small' shape='circle' icon={<SearchOutlined />} />
              <Button size='small' shape='circle' icon={<SettingOutlined />} />
            </div>
          </div>

          <Button type='primary' icon={<EyeOutlined />}>Preview note</Button>

          <IntakeNote
            container={container}
            intakeNotes={intakeNotes}
            activeId={activeId}
            completed={completed}
            setActiveId={setActiveId} />
        </div>
      </Sider>

      <Content>
        <div ref={contentRef}>
          <div className='nav'>
            <LeftOutlined /> Back to Clinical notes list
          </div>

          <Routes>
            <Route path='*' exac element={<>This page potentially left blank</>} />
            {
              routes.map((route, i) =>
                <Route path={route.path} element={route.element} key={i} />)
            }
          </Routes>

          <div className='d-flex space-between nav'>
            <Button icon={<LeftOutlined />}>Previous</Button>
            <Button onClick={() => completeNote(activeId)}>Next <RightOutlined /></Button>
          </div>
        </div>
      </Content>

      <Sider width={300}>
        <div className='d-flex column patient-information'>
          <div className='brief d-flex column align-center'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZDZ2lTXq_hKowK_nXmT3usuqeId0dJueFsg&usqp=CAU' alt='user' />
            <h3>Get Rekted</h3>
            <Button type='primary'>Provider</Button>
          </div>
  
          <div className='details d-flex column'>
            <h3><b>Patient Information</b></h3>

            <ul>
              <li className='d-flex space-between'>
                <span>Patient</span>
                <span>Fluffykins</span>
              </li>
              <li className='d-flex space-between'>
                <span>DOB</span>
                <span>19 Feb 1999</span>
              </li>
              <li className='d-flex space-between'>
                <span>Appoitment Date</span>
                <span>23 June 2022</span>
              </li>
              <li className='d-flex space-between'>
                <span>Appointment Duration</span>
                <span>3 days</span>
              </li>
              <li className='d-flex space-between'>
                <span>Start Time</span>
                <span>8:00 AM</span>
              </li>
              <li className='d-flex space-between'>
                <span>End Time</span>
                <span>8:00 AM</span>
              </li>
            </ul>

            <Button type='default'>History</Button>
          </div>
        </div>
      </Sider>
    </>
  )
}

export default withHeader(ClinicalNote)
