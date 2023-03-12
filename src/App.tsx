import React from 'react'
import { Tabs, TabItem } from './components/Tabs'

function App() {
  return (
    <div>
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
