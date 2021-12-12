import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import styled from 'styled-components'
/*import AddBoard from '../Editable/AddBoard'*/
import AddCard from '../Editable/AddCard'

import Card from '../Card/Card'
import Dropdown from '../Dropdown/Dropdown'

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <BoardColor>
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
                class="p-10 w-10"
                onClose={() => setShowDropdown(false)}
              >
                <p
                  className="border-solid b-2 border-blue-500 cursor-pointer "
                  onClick={() => props.removeBoard()}
                >
                  Delete Board
                </p>
              </Dropdown>
            )}
          </BoardHeaderTitleMore>
        </BoardHeader>
        <AddCard
          className=""
          text="+"
          placeholder="Enter Card Title"
          displayClass=""
          editClass=""
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
        <BoardCards className=" custom-scroll">
          {props.board?.cards?.map((item) => (
            <TaskItem key={item.id}>
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
    </BoardColor>
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
  background-color: ${(props) => props.theme.BoardHeaderTitleColor};
`

const BoardHeaderAmount = styled.div`
  font-weight: bold;
  font-size: 1rem;
  background-color: ${(props) => props.theme.BoardHeaderAmountBackground};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.BoardHeaderAmountColor};
`

const BoardHeaderTitleMore = styled.div`
  background-color: ${(props) => props.theme.boardButtonToDeleteBackground};
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
`

const TaskItem = styled.div`
  padding: 10px;
`

const BoardCards = styled.div`
  background-color: ${(props) => props.theme.boardCardsBackground};
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`
const BoardColor = styled.div`
  background-color: ${(props) => props.theme.boardBackground};
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
`
