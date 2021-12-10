import React, { useState } from 'react'
import styled from 'styled-components'

import { X } from 'react-feather'

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
    <EditableItem className="">
      {isEditable ? (
        <EditableEdit
          className={`${(<EditableEdit />)} ${
            props.displayClass ? props.displayClass : ''
          }`}
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
        </EditableEdit>
      ) : (
        <EditableCardDisplay
          className={`${(<EditableCardDisplay />)} ${
            props.displayClass ? props.displayClass : ''
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </EditableCardDisplay>
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
  color: #B33F40;
`

const EditableCardDisplay = styled.div`
  padding: 6px 12px;
  border-radius: 90px;
  background-color: ${(props) => props.theme.modalButtonsBackground};
  color: ${(props) => props.theme.modalButtonsText};
  cursor: pointer;
  width: 100%;
  transition: 300ms ease-in-out;
  text-align: center;
  font-weight: bold;
  &:hover {
    background-color: rgb(19, 16, 16);
    color: #eee;
    transition: 300ms ease-in-out;
  }
`

const EditableEdit = styled.form`
  display: flex;
  color: ${(props) => props.theme.addButtonsbackground};
  flex-direction: column;
  gap: 10px;
`
