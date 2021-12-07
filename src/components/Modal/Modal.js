import React from 'react'

function Modal(props) {
  return (
    <div
      className="modal"
      onClick={() => (props.onClose ? props.onClose() : '')}
    >
      <div
        className="modal_content custom-scroll"
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Modal
