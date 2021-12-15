import React, { useEffect, useState } from 'react'
import { Calendar, CheckSquare, List, Tag, Trash, Type, X } from 'react-feather'
import styled from 'styled-components'
import Confetti from 'react-confetti'

import Modal from '../../Modal/Modal'
import Editable from '../../Editable/Editable'
import './CardInfo.css'

function CardInfo(props) {
  const colors = [
    '#F0D8DE',
    '#DEFFFB',
    '#B7EBFD',
    '#DCE8D1',
    '#E0D5F5',
    '#F7C1E0',
    '#E3E1E7',
  ]

  const [selectedColor, setSelectedColor] = useState()
  const [values, setValues] = useState({
    ...props.card,
  })

  const updateTitle = (value) => {
    setValues({ ...values, title: value })
  }

  const updateDesc = (value) => {
    setValues({ ...values, desc: value })
  }

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text)
    if (index > -1) return

    setSelectedColor('')
    setValues({
      ...values,
      labels: [...values.labels, label],
    })
  }

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text)

    setValues({
      ...values,
      labels: tempLabels,
    })
  }

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    }
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    })
  }

  const removeTask = (id) => {
    const tasks = [...values.tasks]

    const tempTasks = tasks.filter((item) => item.id !== id)
    setValues({
      ...values,
      tasks: tempTasks,
    })
  }

  const updateTask = (id, value) => {
    const tasks = [...values.tasks]

    const index = tasks.findIndex((item) => item.id === id)
    if (index < 0) return

    tasks[index].completed = value

    setValues({
      ...values,
      tasks,
    })
  }

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0
    const completed = values.tasks?.filter((item) => item.completed)?.length
    return (completed / values.tasks?.length) * 100
  }

  const updateDate = (date) => {
    if (!date) return

    setValues({
      ...values,
      date,
    })
  }

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <Modal onClose={props.onClose}>
      <CardElement className="">
        <CardInfoBox className="">
          <CardInfoBoxTitle className="">
            <Type className="h-18 w-18 cursor-pointer" />
            <p className="font-bold text-lg">Title</p>
          </CardInfoBoxTitle>
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </CardInfoBox>

        <CardInfoBox className="">
          <CardInfoBoxTitle className="">
            <List className="h-18 w-18 cursor-pointer" />
            <p className="font-bold text-lg">Description</p>
          </CardInfoBoxTitle>
          <Editable
            defaultValue={values.desc}
            text={values.desc || 'Add a Description'}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </CardInfoBox>

        <CardInfoBox className="">
          <CardInfoBoxTitle className="">
            <Calendar className="w-6 cursor-pointer" />
            <p className="font-bold text-lg">Date</p>
          </CardInfoBoxTitle>
          <CardInfoBoxDate
            className="cursor-pointer"
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </CardInfoBox>

        <CardInfoBox className="">
          <CardInfoBoxTitle className="">
            <Tag className="h-18 w-18 cursor-pointer " />
            <p className="font-bold text-lg">Labels</p>
          </CardInfoBoxTitle>
          <CardInfoBoxLabels className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <Label
                key={index}
                style={{ backgroundColor: item.color, color: '#3E5352' }}
              >
                {item.text}
                <X
                  className="cursor-pointer"
                  onClick={() => removeLabel(item)}
                />
              </Label>
            ))}
          </CardInfoBoxLabels>
          <ul className="gap-1 flex space-x-3">
            {colors.map((item, index) => (
              <li
                className="list-none w-18 h-18 p-3 rounded-lg cursor-pointer"
                key={index + item}
                style={{ backgroundColor: item }}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Editable
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </CardInfoBox>

        <CardInfoBox className="">
          <CardInfoBoxTitle className="">
            <CheckSquare className="h-18 w-18 cursor-pointer " />
            <p className="font-bold text-lg">Tasks</p>
          </CardInfoBoxTitle>
          <CardInfoBoxProgressBar className="cardinfo_box_progress-bar">
            <CardInfoBoxProgress
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor: calculatePercent() === 100 ? 'limegreen' : '',
              }}
            ></CardInfoBoxProgress>
          </CardInfoBoxProgressBar>
          <Confetti
            run={calculatePercent() === 100 ? true : false}
            recycle={calculatePercent() === 100 ? false : false}
          />
          <CardInfoBoxTaskList className="cardinfo_box_task_list">
            {values.tasks?.map((item) => (
              <CardInfoBoxTaskCheckbox
                key={item.id}
                className="cardinfo_box_task_checkbox"
              >
                <input
                  className="w-18 cursor-pointer outline-none"
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? 'completed' : ''}>{item.text}</p>
                <Trash
                  className="cursor-pointer"
                  onClick={() => removeTask(item.id)}
                />
              </CardInfoBoxTaskCheckbox>
            ))}
          </CardInfoBoxTaskList>
          <Editable
            text={'Add a Task'}
            placeholder="Enter task"
            onSubmit={addTask}
          />
        </CardInfoBox>
      </CardElement>
    </Modal>
  )
}

export default CardInfo

const CardElement = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: fit-content;
  max-width: 650px;
  height: fit-content;
  @media (min-width: 550px) {
    min-width: 550px;
  }
`
const CardInfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const CardInfoBoxTitle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const CardInfoBoxLabels = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
const Label = styled.div`
  border-radius: 7px;
  background-color: #deffe5;
  color: #fff;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 5px;
`
const CardInfoBoxProgressBar = styled.div`
  width: 100%;
  border-radius: 30px;
  height: 10px;
  border: 1px solid #ccc;
`
const CardInfoBoxProgress = styled.div`
  height: 100%;
  border-radius: 30px;
  background-color: skyblue;
  width: 0;
  transition: 200ms;
`
const CardInfoBoxTaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const CardInfoBoxTaskCheckbox = styled.div`
  display: flex;
  gap: 10px;
`

const CardInfoBoxDate = styled.input`
  width: fit-content;
  border: 2px solid #dde4eb;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  padding: 10px;
`
