import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import './index.css'
import Board from './components/Board/Board'
import AddBoard from './components/Editable/AddBoard'
import './App.css'
import ToggleSwitch from './ToggleSwitch.js'

const LightTheme = {
  pageBackground: '#F7F9FB',
  titleColor: '#171A1E',
  subTitleColor: '#a5a5a5',
  addButtonsbackground: '#2E3848',
  addButtonstext: '#FFFFFF',
  cardsAmount: '#2E3848',
  modalButtonsBackground: '#2E3848',
  modalButtonsText: '#FFFFFF',
  modalBackground: '#F7F9FB',
  modalText: '#181717',
  modalInput: '#181717',
  cardDateAndTask: '#000',
  labelColor: '#3E5352',
  labelBackground: '#DEFFE5',
  cardItemBackground: '#FFF',
  boardBackground: '#dce4ec',
  boardCardsBackground: '#f8f8f8',
  boardButtonToDeleteBackground: '',
  BoardHeaderAmountBackground: '#2e3848',
  BoardHeaderAmountColor: '#dde4eb',
  BoardHeaderTitleColor: '#000',
}

const DarkTheme = {
  pageBackground: '#0E1726',
  titleColor: '#8279C6',
  subTitleColor: '#D1CACA',
  addButtonsbackground: '#949FB0',
  addButtonstext: '#FFF',
  cardsAmount: '#2E3848',
  modalButtonsBackground: '#2E3848',
  modalButtonsText: '#FEFEFE',
  modalBackground: '#2E3848',
  modalText: '#FFFFFF',
  modalInput: '#181717',
  cardDateAndTask: '#000',
  labelColor: '#3E5352',
  labelBackground: '#DEFFE5',
  cardItemBackground: '#fbfbfb',
  boardBackground: 'linear-gradient(#C19A9E, #6A639C);',
  boardCardsBackground: '',
  boardButtonToDeleteBackground: '',
  BoardHeaderAmountBackground: '#2e3848',
  BoardHeaderAmountColor: '#dde4eb',
  BoardHeaderTitleColor: '#fff',
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
      <GlobalStyle />
      <AppBoardsContainer className="mx-auto ">
        <div className="app_nav">
          <BoardTitle>
            <BoardTitleh1 className="headerh1 text-3xl font-semibold">
              Kanban Board
            </BoardTitleh1>
          </BoardTitle>
          <BoardUnderTitleh3>Created with 💜 by PlannerX</BoardUnderTitleh3>
        </div>

        <AppBoardsAddCard className="mb-16 justify-between ">
          <div className="flex space-x-5">
            <a
              href="https://planner-x.netlify.app/"
              className="website-back-to my-auto hidden lg:block"
            >
              About PlannerX
            </a>
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
        <div className="grid gap-12 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
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

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.pageBackground};
    transition: all .3s ease;
  }
`

const BoardTitle = styled.div`
  text-align: center;
  margin-top: 0.2em;
  transition: all 0.3s ease;
`

const BoardTitleh1 = styled.h1`
  font-size: 3em;
  font-weight: bold;
  color: ${(props) => props.theme.titleColor};
  margin-bottom: 20px;
  padding-bottom: 0;
  transition: all 0.3s ease;
`

const BoardUnderTitleh3 = styled.h3`
  font-size: 1.3em;
  font-weight: light;
  color: ${(props) => props.theme.subTitleColor};
  text-align: center;
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 6.6rem;
  transition: all 0.3s ease;
`

const AppBoardsContainer = styled.div`
  max-width: 1600px;
  padding: 50px;
  transition: all 0.3s ease;
`
const AppBoardsAddCard = styled.div`
  display: flex;
  transition: all 0.3s ease;
`
