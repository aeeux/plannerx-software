import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './index.css'
import Board from './components/Board/Board'
import Editable from './components/Editable/Editable'

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem('PlannerX')) || [],
  )

  const [targetCard, setTargetCard] = useState({
    bid: '',
    cid: '',
  })

  const addboardHandler = (name) => {
    const tempBoards = [...boards]
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    })
    setBoards(tempBoards)
  }

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id)
    if (index < 0) return

    const tempBoards = [...boards]
    tempBoards.splice(index, 1)
    setBoards(tempBoards)
  }

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id)
    if (index < 0) return

    const tempBoards = [...boards]
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: '',
      tasks: [],
    })
    setBoards(tempBoards)
  }

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return

    const tempBoards = [...boards]
    const cards = tempBoards[index].cards

    const cardIndex = cards.findIndex((item) => item.id === cid)
    if (cardIndex < 0) return

    cards.splice(cardIndex, 1)
    setBoards(tempBoards)
  }

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex
    s_boardIndex = boards.findIndex((item) => item.id === bid)
    if (s_boardIndex < 0) return

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid,
    )
    if (s_cardIndex < 0) return

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid)
    if (t_boardIndex < 0) return

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid,
    )
    if (t_cardIndex < 0) return

    const tempBoards = [...boards]
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex]
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1)
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard)
    setBoards(tempBoards)

    setTargetCard({
      bid: '',
      cid: '',
    })
  }

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return
    setTargetCard({
      bid,
      cid,
    })
  }

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return

    const tempBoards = [...boards]
    const cards = tempBoards[index].cards

    const cardIndex = cards.findIndex((item) => item.id === cid)
    if (cardIndex < 0) return

    tempBoards[index].cards[cardIndex] = card

    setBoards(tempBoards)
  }

  useEffect(() => {
    localStorage.setItem('PlannerX', JSON.stringify(boards))
  }, [boards])

  return (
    <div className="app">
      <div className="app_nav">
        <BoardTitle>
        <BoardTitleh1 className="headerh1 text-3xl mb-20 font-semibold">
          Planner X- Kanban Board
        </BoardTitleh1>
        </BoardTitle>
        <BoardUnderTitleh3>
        Created with 💜 by PlannerX
        </BoardUnderTitleh3>
      </div>
      <div className="app_boards_container">
        <div className="app_board space-x-10 flex w-1/2">
          <div className="app_boards_last cursor-pointer">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
          <div className="grid grid-cols-3 gap-12">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default App


const BoardTitle = styled.div`
text-align: center;
margin-top: 3em;
`

const BoardTitleh1 = styled.h1`
font-size: 3em;
font-weight: bold;
color: #1F262A;
margin-bottom: 20px;
padding-bottom: 0;
`

const BoardUnderTitleh3 = styled.h1`
font-size: 1.3em;
font-weight: light;
color: #A5A5A5;
text-align: center;
margin-top: 0;
padding-top: 0;
margin-bottom: 7rem;
`