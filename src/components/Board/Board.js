import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import './Board.css'

import Card from '../Card/Card'
import Dropdown from '../Dropdown/Dropdown'
import Editable from '../Editable/Editable'

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="board">
      <div className="board_header cursor-not-allowed flex flex-row">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="cursor-pointer board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p className="cursor-pointer" onClick={() => props.removeBoard()}>
                Delete Board
              </p>
            </Dropdown>
          )}
        </div>
      </div>
      <Container className="board_cards cursor-pointer custom-scroll">
        <Editable
          text="+"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
        {props.board?.cards?.map((item) => (
          <TaskItem>
            <Card
              key={item.id}
              card={item}
              boardId={props.board.id}
              removeCard={props.removeCard}
              dragEntered={props.dragEntered}
              dragEnded={props.dragEnded}
              updateCard={props.updateCard}
            />
          </TaskItem>
        ))}
      </Container>
    </div>
  )
}

export default Board

const Container = styled.div``

const TaskItem = styled.div`
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 3rem 3rem 4.5rem;
  grid-gap: 1.5rem;
  display: grid;
  justify-content: center;
`
