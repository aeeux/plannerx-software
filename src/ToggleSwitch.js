import styled from 'styled-components'
import { CgSun } from 'react-icons/cg'
import { HiMoon } from 'react-icons/hi'

function ToggleSwitch(props) {
  function changeTheme() {
    if (props.theme === 'light') {
      props.setTheme('dark')
    } else {
      props.setTheme('light')
    }
  }

  const icon =
    props.theme === 'light' ? <HiMoon size={40} /> : <CgSun size={40} />

  return (
    <Page>
      <Container>
        <Toggle onClick={changeTheme}>{icon}</Toggle>
      </Container>
    </Page>
  )
}

export default ToggleSwitch

const Toggle = styled.button`
  cursor: pointer;
  padding-left: 5px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.addButtonsbackground};
  color: #fff;
  &:focus {
    outline: none;
  }
  transition: all 1.2s ease;
`

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  transition: all 1.2s ease;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
