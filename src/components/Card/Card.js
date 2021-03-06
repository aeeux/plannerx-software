import React, { useState } from 'react'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather'
import styled from 'styled-components'

import Dropdown from '../Dropdown/Dropdown'

import CardInfo from './CardInfo/CardInfo'

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { id, title, desc, date, tasks, labels } = props.card

  const formatDate = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (!date) return ''

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Aprl',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    return day + ' ' + month
  }

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <CardItem
        className=""
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <CardTop className="">
          <CardTopLabels className="cursor-pointer">
            {labels?.map((item, index) => (
              <Label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </Label>
            ))}
          </CardTopLabels>
          <CardTopMore
            className=""
            onClick={(event) => {
              event.stopPropagation()
              setShowDropdown(true)
            }}
          >
            <MoreHorizontal className="" />
            {showDropdown && (
              <Dropdown
                class="board_dropdown delete-button-card"
                onClose={() => setShowDropdown(false)}
              >
                <div className="delete-button-card">
                  <p
                    className="p-0 m-2"
                    onClick={() => props.removeCard(props.boardId, id)}
                  >
                    Delete
                  </p>
                </div>
              </Dropdown>
            )}
          </CardTopMore>
        </CardTop>
        <CardTitle className="cursor-pointer">{title}</CardTitle>
        <CardTitle className="description-text-edit cursor-pointer">
          {desc}
        </CardTitle>
        <CardFooter className="">
          {date && (
            <CardFooterItem className="cursor-pointer">
              <Clock className="" />
              {formatDate(date)}
            </CardFooterItem>
          )}
          {tasks && tasks?.length > 0 && (
            <CardFooterItem className="cursor-pointer">
              <CheckSquare className="h-13 w-13" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </CardFooterItem>
          )}
        </CardFooter>
      </CardItem>
    </>
  )
}

export default Card

const CardItem = styled.div`
  padding: 10px;
  display: flex;
  cursor: move;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 3.5px 10px 0px;
  gap: 10px;
  background-color: ${(props) => props.theme.cardItemBackground};
  border-radius: 10px;
  &hover {
    opacity: 1;
  }
`
const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
`
const CardTopLabels = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 14px;
  line-height: 21px;
`

const Label = styled.li`
  display: flex;
  list-style-type: disc;
  border-radius: 8px;
  padding: 4px 12px;
  background-color: ${(props) => props.theme.labelBackground};
  color: ${(props) => props.theme.labelColor};
  width: fit-content;
`
const CardTopMore = styled.div`
  width: 30px;
  height: 20px;
  transform: translateX(15px);
  flex: 1;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s ease;
`
const CardTitle = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.875rem;
`
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CardFooterItem = styled.div`
  border-radius: 40px;
  padding: 4px 12px;
  color: ${(props) => props.theme.cardDateAndTask};
  width: fit-content;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: #f7f7f7;
`
