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
    props.theme === 'light' ? <HiMoon size={28} /> : <CgSun size={28} />

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
  padding-left: 4px;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.addButtonsbackground};
  color: #fff;
  &:focus {
    outline: none;
  }
  transition: all 0.3s ease;
  margin-bottom: 6px;
`

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  transition: all 0.3s ease;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
`
