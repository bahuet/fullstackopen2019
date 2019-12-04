import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => { setVisible(!visible) }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}> Cancel </button>
      </div>

    </>
  )

}

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggable