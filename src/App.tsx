import React from 'react'
import { Menu, MenuItme } from './components/Menu'

function App() {
  return (
    <div>
      <Menu
        defaultIndex={0}
        mode="vertical"
        onSelect={(index) => {
          alert(index)
        }}
      >
        <MenuItme index={0}>cool link</MenuItme>
        <MenuItme index={1}>cool link 2</MenuItme>
        <MenuItme index={2}>cool link 3</MenuItme>
      </Menu>
    </div>
  )
}

export default App
