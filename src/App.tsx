import React from 'react'
import Button from './components/Button/button'

function App() {
  return (
    <div>
      <Button>Hello</Button>
      <Button btnType="primary" size="lg">
        Hello
      </Button>
      <Button btnType="danger">Hello</Button>
      <Button btnType="link" href="https://www.baidu.com" target="_blank">
        Hello
      </Button>
      <Button btnType="link" href="https://www.baidu.com" disabled>
        disabled
      </Button>
      <Button disabled>Hello</Button>
    </div>
  )
}

export default App
