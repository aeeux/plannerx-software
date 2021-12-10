import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

function Dropdown(props) {
  const dropdownRef = useRef()

  const handleClick = (event) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose()
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return (
    <DropownItem
      ref={dropdownRef}
      className={`custom-scroll ${props.class ? props.class : ''}`}
    >
      {props.children}
    </DropownItem>
  )
}

export default Dropdown

const DropownItem = styled.div`
  position: absolute;
  right: 30%;
  top: 100%;
  background-color: #fff;
  min-height: 40px;
  min-width: 50px;
  width: fit-content;
  height: fit-content;
  max-width: 250px;
  max-height: 390px;
  overflow-y: auto;
  z-index: 5;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
