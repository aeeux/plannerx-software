import React, { useState } from 'react'
import styled from 'styled-components'

import { X } from 'react-feather'
import './Editable.css'

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false)
  const [inputText, setInputText] = useState(props.defaultValue || '')

  const submission = (e) => {
    e.preventDefault()
    if (inputText && props.onSubmit) {
      setInputText('')
      props.onSubmit(inputText)
    }
    setIsEditable(false)
  }

  return (
    <EditableItem className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ''}`}
          onSubmit={submission}
        >
          <input
            className="b-2 border-solid rounded-lg p-10 border-blue-500 outline-none"
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <EditableFooter className="">
            <button
              className="cursor-pointer border-solid rounded-lg p-3 bg-blue-500 outline-none text-white transition ease-in-out hover:bg-blue-200"
              type="submit"
            >
              {props.buttonText || 'Add'}
            </button>
            <X
              onClick={() => setIsEditable(false)}
              className="w-10 cursor-pointer"
            />
          </EditableFooter>
        </form>
      ) : (
        <p
          className={`editable_display ${
            props.displayClass ? props.displayClass : ''
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </EditableItem>
  )
}

export default Editable

const EditableItem = styled.div`
  width: 100%;
`

const EditableFooter = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
