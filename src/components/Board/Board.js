import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import styled from 'styled-components'

import './Board.css'

import Card from '../Card/Card'
import Dropdown from '../Dropdown/Dropdown'
import Editable from '../Editable/Editable'

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <BoardCanvas className="">
      <BoardHeader className="flex flex-row">
        <BoardHeaderTitle className="">
          {props.board?.title}
          <BoardHeaderAmount>
            {props.board?.cards?.length || 0}
          </BoardHeaderAmount>
        </BoardHeaderTitle>
        <BoardHeaderTitleMore
          className=""
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p className="" onClick={() => props.removeBoard()}>
                Delete Board
              </p>
            </Dropdown>
          )}
        </BoardHeaderTitleMore>
      </BoardHeader>
      <BoardCards className=" custom-scroll">
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
      </BoardCards>
    </BoardCanvas>
  )
}

export default Board

const BoardCanvas = styled.div`
  min-width: 290px;
  width: 290px;
  max-height: 100%;
  flex-basis: 290px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const BoardHeader = styled.div`
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BoardHeaderTitle = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  gap: 5px;
  align-items: center;
`

const BoardHeaderAmount = styled.div`
  font-weight: bold;
  font-size: 1rem;
  border: 2px solid rgba(184, 184, 184, 0.8);
  padding: 5px;
  border-radius: 5px;
  color: black;
`

const BoardHeaderTitleMore = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
`

const TaskItem = styled.div`
  padding: 10px;
`

const BoardCards = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`
