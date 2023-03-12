import React from 'react'
import { Menu, MenuItme, SubMenu } from './components/Menu'

function App() {
  return (
    <div>
      <Menu
        defaultIndex={0}
        onSelect={(index) => {
          alert(index)
        }}
      >
        <MenuItme>cool link</MenuItme>
        <SubMenu title="dropdown">
          <MenuItme>dropdown1</MenuItme>
          <MenuItme>dropdown2</MenuItme>
        </SubMenu>
        <MenuItme>cool link 3</MenuItme>
      </Menu>
    </div>
  )
}

export default App
