import React from 'react'
import _ from 'lodash'

export const withScrollbar = (WrappedComponent) =>
  (props) => {
    const { container, current } = props

    const setTabPaneHeight = _.debounce(() => {
      const bounder = container?.getBoundingClientRect() || {}
      const currRect = current?.getBoundingClientRect() || {}

      console.log('Hola', current, container)

      if (current.offsetHeight > bounder.height) {
        current.style.paddingRight = '0px'
      } else {
        current.style.paddingRight = '10px'
      }

      current.style.height = bounder.height - currRect.y - 10 + 'px'
      current.style.overflowY = 'auto'
    }, 500)

    return <WrappedComponent {...props} setTabPaneHeight={setTabPaneHeight} />
  }
