import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Tabs, TabItem } from './components/Tabs'

function App() {
  return (
    <div>
      <FontAwesomeIcon icon={faCoffee} size="10x" />
      <Tabs defaultIndex={0} onSelect={() => {}} type="card">
        <TabItem label="card1">this is card one</TabItem>
        <TabItem label="card2">this is card one1</TabItem>
        <TabItem label="card3">this is card one2</TabItem>
        <TabItem label="disabled" disabled>
          this is card one2
        </TabItem>
      </Tabs>
    </div>
  )
}

export default App
