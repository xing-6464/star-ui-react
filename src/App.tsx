import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Icon } from './components/Icon'
import { Tabs, TabItem } from './components/Tabs'

library.add(fas)
function App() {
  return (
    <div>
      <Icon icon="arrow-down" theme="danger" size="10x" />
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
