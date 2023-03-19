import React, { useState } from 'react'
import { Icon } from './components/Icon'
import { Tabs, TabItem } from './components/Tabs'
import { Menu, MenuItme, SubMenu } from './components/Menu'
import { Button } from './components/Button'
import { Transition } from './components/Transition'

function App() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <Icon icon="arrow-down" theme="primary" size="10x" />
      <Menu>
        <MenuItme>星</MenuItme>
        <SubMenu title="xing">
          <MenuItme>drop1</MenuItme>
          <MenuItme>drop2</MenuItme>
        </SubMenu>
      </Menu>
      <Button
        size="lg"
        onClick={() => {
          setShow(!show)
        }}
      >
        {' '}
        Toggle{' '}
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-left">
        <Tabs defaultIndex={0} onSelect={() => {}} type="card">
          <TabItem label="card1">this is card one</TabItem>
          <TabItem label="card2">this is card one1</TabItem>
          <TabItem label="card3">this is card one2</TabItem>
          <TabItem label="disabled" disabled>
            this is card one2
          </TabItem>
        </Tabs>
      </Transition>
      <Transition in={show} timeout={300} animation="zoom-in-bottom">
        <div>
          <Button>btoo</Button>
        </div>
      </Transition>
    </div>
  )
}

export default App
