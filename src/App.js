import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import './index.css'
import Board from './components/Board/Board'
import AddBoard from './components/Editable/AddBoard'
import './App.css'
import LogoImg from './components/images/PlannerX_Logo.svg'
import ToggleSwitch from './ToggleSwitch.js'

const LightTheme = {
  pageBackground: '#F7F9FB',
  titleColor: '#dc658b',
  tagLineColor: 'black',
}

const DarkTheme = {
  pageBackground: '#282c36',
  titleColor: 'lightPink',
  tagLineColor: 'lavender',
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}

function App() {
  const [theme, setTheme] = useState('light')

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
    <ThemeProvider theme={themes[theme]}>
      <AppBoardsContainer className="mx-auto">
        <div className="app_nav">
          <BoardTitle>
            <BoardTitleh1 className="headerh1 text-3xl mb-20 font-semibold">
              Kanban Board
            </BoardTitleh1>
          </BoardTitle>
          <BoardUnderTitleh3>Created with 💜 by PlannerX</BoardUnderTitleh3>
        </div>

        <AppBoardsAddCard className="mb-16 justify-between ">
          <div className="flex space-x-5">
            <img src={LogoImg} className="img-logo-header" alt="mockup" />
            <button className="website-back-to">Go back to website</button>
          </div>
          <div className="flex space-x-5">
            <ToggleSwitch theme={theme} setTheme={setTheme} />
            <AddBoard
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </AppBoardsAddCard>
        <div className="grid gap-12 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </AppBoardsContainer>
    </ThemeProvider>
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
  color: #1f262a;
  margin-bottom: 20px;
  padding-bottom: 0;
`

const BoardUnderTitleh3 = styled.h1`
  font-size: 1.3em;
  font-weight: light;
  color: #a5a5a5;
  text-align: center;
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 7rem;
`

const AppBoardsContainer = styled.div`
  max-width: 1600px;
  padding: 50px;
  background-color: ${(props) => props.theme.pageBackground};
`
const AppBoardsAddCard = styled.div`
  display: flex;
`
